"""Ingest LinkedIn job-alert emails from your own inbox via IMAP (no scraping of LinkedIn).
Enable job alerts on LinkedIn, then run `python -m autoapply.cli fetch --linkedin`.
Requires IMAP_HOST/IMAP_USER/IMAP_PASSWORD in .env."""
import email
import imaplib
import os
import re
from bs4 import BeautifulSoup


def linkedin_alerts(limit=50):
    host = os.getenv("IMAP_HOST", "imap.gmail.com")
    user, pw = os.getenv("IMAP_USER"), os.getenv("IMAP_PASSWORD")
    if not (user and pw):
        return
    m = imaplib.IMAP4_SSL(host)
    m.login(user, pw)
    m.select("INBOX")
    _, ids = m.search(None, '(FROM "jobalerts-noreply@linkedin.com" UNSEEN)')
    for i in ids[0].split()[-limit:]:
        _, data = m.fetch(i, "(RFC822)")
        msg = email.message_from_bytes(data[0][1])
        for part in msg.walk():
            if part.get_content_type() != "text/html":
                continue
            soup = BeautifulSoup(part.get_payload(decode=True), "html.parser")
            for a in soup.find_all("a", href=re.compile(r"linkedin\.com/comm/jobs/view")):
                title = a.get_text(" ", strip=True)
                if not title:
                    continue
                parent = a.find_parent("td") or a.parent
                lines = [x for x in parent.get_text("\n", strip=True).split("\n") if x]
                yield dict(title=title, company=lines[1] if len(lines) > 1 else "",
                           location=lines[2] if len(lines) > 2 else "", description=" ".join(lines),
                           url=a["href"].split("?")[0], source="linkedin_alert", posted_at="")
    m.logout()
