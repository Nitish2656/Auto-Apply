"""Free/public job sources. LinkedIn is intentionally NOT scraped (ToS risk);
use linkedin_alerts.py to ingest your own LinkedIn job-alert emails instead."""
import re
import requests
from bs4 import BeautifulSoup

UA = {"User-Agent": "Mozilla/5.0 autoapply-personal"}


def _text(html: str) -> str:
    return BeautifulSoup(html or "", "html.parser").get_text(" ", strip=True)


def remoteok():
    r = requests.get("https://remoteok.com/api", headers=UA, timeout=30)
    for j in r.json()[1:]:
        yield dict(title=j.get("position", ""), company=j.get("company", ""),
                   location=j.get("location") or "Remote", description=_text(j.get("description")),
                   url=j.get("url", ""), source="remoteok", posted_at=j.get("date", ""))


def remotive():
    r = requests.get("https://remotive.com/api/remote-jobs", headers=UA, timeout=30)
    for j in r.json().get("jobs", []):
        yield dict(title=j["title"], company=j["company_name"],
                   location=j.get("candidate_required_location", "Remote"),
                   description=_text(j.get("description")), url=j["url"],
                   source="remotive", posted_at=j.get("publication_date", ""))


def hn_hiring():
    """Latest 'Ask HN: Who is hiring?' comments - frequently include emails."""
    s = requests.get("https://hn.algolia.com/api/v1/search_by_date",
                     params={"query": "Ask HN: Who is hiring?", "tags": "story,author_whoishiring"},
                     timeout=30).json()
    if not s["hits"]:
        return
    sid = s["hits"][0]["objectID"]
    page = 0
    while page < 5:
        d = requests.get("https://hn.algolia.com/api/v1/search",
                         params={"tags": f"comment,story_{sid}", "hitsPerPage": 200, "page": page},
                         timeout=30).json()
        for h in d["hits"]:
            t = _text(h.get("comment_text"))
            if not t:
                continue
            head = t.split("|")
            company = head[0].strip()[:80]
            title = head[1].strip() if len(head) > 1 else "Engineer"
            yield dict(title=title, company=company, location=head[2].strip() if len(head) > 2 else "",
                       description=t, url=f"https://news.ycombinator.com/item?id={h['objectID']}",
                       source="hn", posted_at=h.get("created_at", ""))
        page += 1
        if page >= d.get("nbPages", 0):
            break


SOURCES = {"remoteok": remoteok, "remotive": remotive, "hn": hn_hiring}
