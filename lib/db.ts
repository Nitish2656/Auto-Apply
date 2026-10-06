import Database from 'better-sqlite3';
import path from 'path';

// Path to the python engine's SQLite database
const DB_PATH = path.join(process.cwd(), 'engine', 'autoapply.db');

export function getDb() {
  // Use readonly connection for the dashboard to prevent locking issues
  // while the python script might be writing to it.
  return new Database(DB_PATH, { readonly: true, fileMustExist: false });
}

export interface Job {
  id: number;
  company: string;
  title: string;
  score: number;
  status: string;
}

export interface ApplicationDraft {
  id: number;
  job_id: number;
  company: string;
  title: string;
  score: number;
  email: string;
  subject: string;
  status: string;
  location: string;
  description: string;
  url: string;
  source: string;
  posted_at: string;
}

export function getStats() {
// ... omitting stats for brevity, will just replace the query

  try {
    const db = getDb();
    const jobsScanned = db.prepare('SELECT COUNT(*) as count FROM jobs').get() as { count: number };
    const matchesFound = db.prepare("SELECT COUNT(*) as count FROM jobs WHERE score >= 40").get() as { count: number };
    const pendingReview = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status='draft'").get() as { count: number };
    const emailsSent = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status='sent'").get() as { count: number };
    db.close();

    return {
      jobsScanned: jobsScanned.count,
      matchesFound: matchesFound.count,
      pendingReview: pendingReview.count,
      emailsSent: emailsSent.count
    };
  } catch (e) {
    console.error("DB Error:", e);
    return {
      jobsScanned: 0,
      matchesFound: 0,
      pendingReview: 0,
      emailsSent: 0
    };
  }
}

export function getPendingDrafts(): ApplicationDraft[] {
  try {
    const db = getDb();
    const drafts = db.prepare(`
      SELECT 
        a.id, 
        a.job_id, 
        a.subject, 
        a.status, 
        ct.email, 
        j.company, 
        j.title,
        j.score,
        j.location,
        j.description,
        j.url,
        j.source,
        j.posted_at
      FROM applications a
      JOIN contacts ct ON ct.id = a.contact_id
      JOIN jobs j ON j.id = a.job_id
      WHERE a.status = 'draft'
        AND length(j.company) < 60
      ORDER BY j.score DESC
      LIMIT 10
    `).all() as ApplicationDraft[];
    db.close();
    return drafts;
  } catch (e) {
    console.error("DB Error:", e);
    return [];
  }
}
