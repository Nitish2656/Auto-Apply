import re


def score_job(job: dict, p: dict):
    text = f"{job['title']} {job['description']}".lower()
    title = job["title"].lower()
    reasons, score = [], 0
    for ex in p.get("keywords_exclude", []):
        if ex.lower() in title:
            return 0, [f"excluded: {ex}"]
    if job["company"].lower() in [c.lower() for c in p.get("blacklist_companies", [])]:
        return 0, ["blacklisted company"]

    role_hit = [r for r in p.get("target_roles", []) if r.lower() in text]
    if any(r.lower() in title for r in p.get("target_roles", [])):
        score += 35
        reasons.append("title matches target role")
    elif role_hit:
        score += 15
        reasons.append("role mentioned in description")

    skills = p.get("skills", [])
    hits = [s for s in skills if re.search(rf"\b{re.escape(s.lower())}\b", text)]
    if skills:
        score += int(45 * len(hits) / max(len(skills), 1) * 2) if len(hits) else 0
        score = min(score, 80)
        reasons.append(f"skills: {', '.join(hits) or 'none'}")

    loc = (job.get("location") or "").lower() + " " + text[:300]
    if any(l.lower() in loc for l in p.get("locations", [])):
        score += 20
        reasons.append("location ok")
    elif p.get("remote_only") and "remote" not in loc:
        return 0, ["not remote"]
    return min(score, 100), reasons
