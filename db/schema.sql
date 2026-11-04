CREATE TABLE IF NOT EXISTS quote_enquiries (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  city text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  project_type text NOT NULL,
  description text NOT NULL,
  attachments jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quote_enquiries_created_at_idx
  ON quote_enquiries (created_at DESC);
