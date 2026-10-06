import hashlib
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "autoapply.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS jobs(
  id INTEGER PRIMARY KEY, hash TEXT UNIQUE, title TEXT, company TEXT,
  location TEXT, description TEXT, url TEXT, source TEXT, posted_at TEXT,
  score INTEGER, reasons TEXT, status TEXT DEFAULT 'new');
CREATE TABLE IF NOT EXISTS contacts(
  id INTEGER PRIMARY KEY, job_id INTEGER, email TEXT, source TEXT,
  confidence INTEGER, verified INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS applications(
  id INTEGER PRIMARY KEY, job_id INTEGER UNIQUE, contact_id INTEGER,
  subject TEXT, body TEXT, status TEXT DEFAULT 'draft', sent_at TEXT,
  company_key TEXT);
"""


def conn():
    c = sqlite3.connect(DB_PATH)
    c.row_factory = sqlite3.Row
    c.executescript(SCHEMA)
    return c


def job_hash(company: str, title: str) -> str:
    return hashlib.sha1(f"{company.lower().strip()}|{title.lower().strip()}".encode()).hexdigest()
