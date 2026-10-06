import re
from urllib.parse import urlparse

import dns.resolver
import requests
from bs4 import BeautifulSoup

UA = {"User-Agent": "Mozilla/5.0 autoapply-personal"}
EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
JUNK = ("example.", "sentry", "wixpress", ".png", ".jpg", "noreply", "no-reply", "@2x")
ROLE_PREFIX = ("jobs", "careers", "career", "hr", "talent", "recruit", "hiring", "people")
CAREER_PATHS = ["", "/careers", "/jobs", "/contact", "/about", "/join-us"]
NON_COMPANY_HOSTS = ("remoteok", "remotive", "ycombinator", "linkedin", "greenhouse", "lever.co")


def clean(emails):
    out = []
    for e in emails:
        e = e.strip(".").lower()
        if not any(j in e for j in JUNK) and e not in out:
            out.append(e)
    return out


def has_mx(domain: str) -> bool:
    try:
        return bool(dns.resolver.resolve(domain, "MX", lifetime=5))
    except Exception:
        return False


def from_text(text: str):
    return [(e, "job_text", 90) for e in clean(EMAIL_RE.findall(text))]


def company_domain(job: dict):
    for m in re.findall(r"https?://([\w.-]+)", job.get("description", "")):
        if not any(h in m for h in NON_COMPANY_HOSTS):
            return m.removeprefix("www.")
    host = urlparse(job.get("url", "")).netloc
    if host and not any(h in host for h in NON_COMPANY_HOSTS):
        return host.removeprefix("www.")
    return None


def from_website(domain: str):
    found = []
    for path in CAREER_PATHS:
        try:
            r = requests.get(f"https://{domain}{path}", headers=UA, timeout=10)
            soup = BeautifulSoup(r.text, "html.parser")
            hrefs = [a["href"][7:].split("?")[0] for a in soup.find_all("a", href=True)
                     if a["href"].startswith("mailto:")]
            for e in clean(hrefs + EMAIL_RE.findall(soup.get_text(" "))):
                if e.endswith(domain.split(".", 1)[-1]) or domain in e:
                    conf = 75 if e.split("@")[0].startswith(ROLE_PREFIX) else 55
                    found.append((e, f"website{path}", conf))
        except Exception:
            continue
    return found


def find_contacts(job: dict):
    results = from_text(job["description"])
    if not results:
        d = company_domain(job)
        if d and has_mx(d):
            results = from_website(d)
    verified = []
    for e, src, conf in results:
        if has_mx(e.split("@")[1]):
            verified.append((e, src, conf))
    return sorted(verified, key=lambda x: -x[2])
