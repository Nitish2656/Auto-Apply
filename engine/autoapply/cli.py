"""AutoApply CLI.
Pipeline: fetch -> score -> contacts -> draft -> review (approve) -> send
"""
import argparse
import random
import time
from datetime import datetime, timedelta
from pathlib import Path

import yaml
from dotenv import load_dotenv

from . import db
from .compose import compose
from .contacts import find_contacts
from .scoring import score_job
from .sender import send_email
from .sources.feeds import SOURCES
from .sources.linkedin_alerts import linkedin_alerts

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")


def profile():
    path = ROOT / "config" / "profile.yaml"
    if not path.exists():
        raise SystemExit("Create config/profile.yaml from config/profile.example.yaml")
    return yaml.safe_load(path.read_text())


def cmd_fetch(a):
    c = db.conn()
    sources = dict(SOURCES)
    if a.linkedin:
        sources["linkedin_alert"] = linkedin_alerts
    total = 0
    for name, fn in sources.items():
        n = 0
        try:
            for j in fn():
                if not j["title"] or not j["company"]:
                    continue
                try:
                    c.execute("INSERT INTO jobs(hash,title,company,location,description,url,source,posted_at)"
                              " VALUES(?,?,?,?,?,?,?,?)",
                              (db.job_hash(j["company"], j["title"]), j["title"], j["company"], j["location"],
                               j["description"], j["url"], j["source"], j["posted_at"]))
                    n += 1
                except Exception:
                    pass  # duplicate
        except Exception as e:
            print(f"[{name}] failed: {e}")
        c.commit()
        print(f"[{name}] +{n} new jobs")
        total += n
    print(f"Total new: {total}")


def cmd_score(a):
    p, c = profile(), db.conn()
    rows = c.execute("SELECT * FROM jobs WHERE score IS NULL").fetchall()
    for r in rows:
        s, why = score_job(dict(r), p)
        c.execute("UPDATE jobs SET score=?, reasons=?, status=? WHERE id=?",
                  (s, "; ".join(why), "scored" if s >= p["min_score"] else "low", r["id"]))
    c.commit()
    n = c.execute("SELECT COUNT(*) FROM jobs WHERE status='scored'").fetchone()[0]
    print(f"Scored {len(rows)}; matches: {n}")


def cmd_contacts(a):
    c = db.conn()
    rows = c.execute("SELECT * FROM jobs WHERE status='scored' ORDER BY score DESC LIMIT ?", (a.limit,)).fetchall()
    for r in rows:
        found = find_contacts(dict(r))
        for e, src, conf in found[:2]:
            c.execute("INSERT INTO contacts(job_id,email,source,confidence,verified) VALUES(?,?,?,?,1)",
                      (r["id"], e, src, conf))
        c.execute("UPDATE jobs SET status=? WHERE id=?", ("contact_found" if found else "no_contact", r["id"]))
        c.commit()
        print(f"{r['score']:>3} {r['company'][:30]:30} -> {found[0][0] if found else '-'}")


def cmd_draft(a):
    p, c = profile(), db.conn()
    rows = c.execute("SELECT * FROM jobs WHERE status='contact_found'").fetchall()
    for r in rows:
        ct = c.execute("SELECT * FROM contacts WHERE job_id=? ORDER BY confidence DESC LIMIT 1", (r["id"],)).fetchone()
        sub, body = compose(dict(r), p)
        key = ct["email"].split("@")[1]
        c.execute("INSERT OR IGNORE INTO applications(job_id,contact_id,subject,body,company_key) VALUES(?,?,?,?,?)",
                  (r["id"], ct["id"], sub, body, key))
        c.execute("UPDATE jobs SET status='drafted' WHERE id=?", (r["id"],))
    c.commit()
    print(f"Drafted {len(rows)}. Run `review` to approve.")


def cmd_review(a):
    c = db.conn()
    rows = c.execute("""SELECT a.id, a.subject, a.body, ct.email, j.company, j.score FROM applications a
        JOIN contacts ct ON ct.id=a.contact_id JOIN jobs j ON j.id=a.job_id WHERE a.status='draft'""").fetchall()
    for r in rows:
        print(f"\n=== [{r['id']}] {r['company']} (score {r['score']}) -> {r['email']}\n{r['subject']}\n\n{r['body']}")
        ans = input("approve? [y]es / [n]o skip / [q]uit: ").strip().lower()
        if ans == "q":
            break
        c.execute("UPDATE applications SET status=? WHERE id=?", ("approved" if ans == "y" else "skipped", r["id"]))
        c.commit()


def cmd_send(a):
    p, c = profile(), db.conn()
    since = (datetime.now() - timedelta(days=1)).isoformat()
    sent_today = c.execute("SELECT COUNT(*) FROM applications WHERE status='sent' AND sent_at>?", (since,)).fetchone()[0]
    budget = p["daily_cap"] - sent_today
    rows = c.execute("""SELECT a.*, ct.email FROM applications a JOIN contacts ct ON ct.id=a.contact_id
        WHERE a.status='approved'""").fetchall()[:max(budget, 0)]
    print(f"Sending {len(rows)} (cap left {budget}){' [DRY RUN]' if a.dry_run else ''}")
    month = (datetime.now() - timedelta(days=30)).isoformat()
    for r in rows:
        if c.execute("SELECT 1 FROM applications WHERE company_key=? AND status='sent' AND sent_at>?",
                     (r["company_key"], month)).fetchone():
            print(f"skip {r['email']} (company mailed in last 30d)")
            continue
        if a.dry_run:
            print(f"[dry] would send to {r['email']}: {r['subject']}")
            continue
        try:
            send_email(p, r["email"], r["subject"], r["body"])
            c.execute("UPDATE applications SET status='sent', sent_at=? WHERE id=?", (datetime.now().isoformat(), r["id"]))
            print(f"sent -> {r['email']}")
        except Exception as e:
            c.execute("UPDATE applications SET status='failed' WHERE id=?", (r["id"],))
            print(f"FAILED {r['email']}: {e}")
        c.commit()
        time.sleep(random.randint(p["min_delay_s"], p["max_delay_s"]))


def cmd_stats(a):
    c = db.conn()
    for t, col in (("jobs", "status"), ("applications", "status")):
        print(t, {r[0]: r[1] for r in c.execute(f"SELECT {col}, COUNT(*) FROM {t} GROUP BY {col}")})


def main():
    ap = argparse.ArgumentParser(prog="autoapply")
    sp = ap.add_subparsers(dest="cmd", required=True)
    f = sp.add_parser("fetch"); f.add_argument("--linkedin", action="store_true"); f.set_defaults(fn=cmd_fetch)
    sp.add_parser("score").set_defaults(fn=cmd_score)
    k = sp.add_parser("contacts"); k.add_argument("--limit", type=int, default=50); k.set_defaults(fn=cmd_contacts)
    sp.add_parser("draft").set_defaults(fn=cmd_draft)
    sp.add_parser("review").set_defaults(fn=cmd_review)
    s = sp.add_parser("send"); s.add_argument("--dry-run", action="store_true"); s.set_defaults(fn=cmd_send)
    sp.add_parser("stats").set_defaults(fn=cmd_stats)
    a = ap.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
