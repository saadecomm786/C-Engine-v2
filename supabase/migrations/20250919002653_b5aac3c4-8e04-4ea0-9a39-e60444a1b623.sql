-- Add features column to signals table to store signal metadata
ALTER TABLE public.signals ADD COLUMN IF NOT EXISTS features jsonb;