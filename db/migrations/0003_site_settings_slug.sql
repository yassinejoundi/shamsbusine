ALTER TABLE public.site_content
  DROP CONSTRAINT IF EXISTS site_content_page_slug_check,
  ADD CONSTRAINT site_content_page_slug_check
    CHECK (page_slug IN ('home', 'services', 'contact', 'entreprise', 'realisations', 'site-settings'));
