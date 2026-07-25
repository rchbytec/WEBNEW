-- Cloudflare D1 Database Schema for Visitors Tracking

CREATE TABLE IF NOT EXISTS visitors (
  visitor_id TEXT PRIMARY KEY,
  ip TEXT,
  first_seen TEXT NOT NULL,
  last_seen TEXT NOT NULL,
  visit_count INTEGER NOT NULL DEFAULT 1,
  device_type TEXT,
  browser TEXT,
  location TEXT,
  last_section TEXT,
  user_agent TEXT,
  visit_history TEXT
);

CREATE INDEX IF NOT EXISTS idx_last_seen
ON visitors(last_seen);
