# ApplyAgent Engine

This folder contains the **Python-based job automation engine** — the core backend that powers ApplyAgent's auto-apply pipeline.

It is completely isolated from the Next.js frontend and can be developed, updated, and maintained independently.

---

## Architecture

```
engine/
├── autoapply/          # Core Python package
│   ├── cli.py          # Main CLI entrypoint (pipeline orchestrator)
│   ├── db.py           # SQLite database schema + connection
│   ├── scoring.py      # Job match scoring logic (0-100)
│   ├── compose.py      # Email subject + body generator
│   ├── contacts.py     # Recruiter contact email finder
│   ├── sender.py       # SMTP email sender (Gmail)
│   └── sources/
│       ├── feeds.py            # Job scrapers: RemoteOK, Remotive, HackerNews
│       └── linkedin_alerts.py  # LinkedIn job alert email parser (IMAP)
├── config/
│   └── profile.example.yaml   # User profile template (copy → profile.yaml)
├── resumes/            # Store your resume PDF here
├── requirements.txt    # Python dependencies
├── .env.example        # SMTP credentials template
└── README.md           # This file
```

---

## Setup Guide

### 1. Create a Python virtual environment

```bash
cd engine
python -m venv .venv

# Windows
.venv\Scripts\activate

# Mac/Linux
source .venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure your profile

```bash
cp config/profile.example.yaml config/profile.yaml
```

Edit `config/profile.yaml` with your details:
- Your name, email, phone
- Target roles and skills
- Preferred locations
- Resume path
- Daily application cap

### 4. Configure SMTP credentials

```bash
cp .env.example .env
```

Edit `.env` with your Gmail credentials:
- Use a Gmail **App Password** (not your regular password)
- Enable 2FA on Gmail first, then create an App Password at myaccount.google.com

### 5. Add your resume

Place your resume PDF inside the `resumes/` folder:

```
engine/resumes/resume.pdf
```

---

## Running the Pipeline

Each step in the pipeline is a CLI command. Run them in order:

```bash
# Step 1: Fetch new job listings from all sources
python -m autoapply fetch

# Step 1b: Also pull from LinkedIn job-alert emails (optional)
python -m autoapply fetch --linkedin

# Step 2: Score all fetched jobs against your profile
python -m autoapply score

# Step 3: Find recruiter contact emails for top-scored jobs
python -m autoapply contacts --limit 50

# Step 4: Draft personalized emails for each application
python -m autoapply draft

# Step 5: Review drafts before sending (approve / skip)
python -m autoapply review

# Step 6: Send approved applications (respects daily_cap)
python -m autoapply send

# Step 6b: Dry run — preview without sending
python -m autoapply send --dry-run

# Check current stats
python -m autoapply stats
```

---

## Data

All job data is stored in `autoapply.db` (SQLite, created automatically on first run).

**Tables:**
| Table | Contents |
|---|---|
| `jobs` | All fetched job listings with scores and status |
| `contacts` | Recruiter emails found per job |
| `applications` | Drafted/sent email applications |

---

## Future Roadmap (Phase 2)

- [ ] Replace SQLite with PostgreSQL (sync with Next.js Prisma DB)
- [ ] Expose a FastAPI REST API so the Next.js dashboard can trigger the pipeline
- [ ] Dashboard UI: show live job pipeline status, application stats
- [ ] User profile form in dashboard (replaces manual `profile.yaml`)
