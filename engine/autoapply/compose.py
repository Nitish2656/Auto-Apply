import re


def compose(job: dict, p: dict):
    text = f"{job['title']} {job['description']}".lower()
    matched = [s for s in p.get("skills", []) if re.search(rf"\b{re.escape(s.lower())}\b", text)][:4]
    role = re.sub(r"\s+", " ", job["title"]).strip()[:80] or "the open role"
    company = job["company"] or "your team"
    skills = ", ".join(matched) if matched else "my background"
    hl = "\n".join(f"- {h}" for h in p.get("highlights", [])[:2])
    links = " | ".join(p.get("links", []))
    subject = f"Application: {role} - {p['name']}"
    body = f"""Hi {company} team,

I came across the {role} opening and would love to be considered. {p.get('summary', '')}

My experience lines up on {skills}. A couple of highlights:
{hl}

My resume is attached. {links}

Thanks for your time,
{p['name']}
{p.get('phone', '')}

(If this isn't the right inbox or you'd prefer I not follow up, just reply "stop" and I won't.)
"""
    return subject, body
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=you@gmail.com
# SMTP_PASSWORD=your-gmail-app-password