CREATE TABLE IF NOT EXISTS public.site_content (
  page_slug text PRIMARY KEY CHECK (page_slug IN ('home', 'services', 'contact', 'entreprise', 'realisations')),
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text NOT NULL
);
