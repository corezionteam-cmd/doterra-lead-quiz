-- Add missing columns to existing leads table
-- This script adds the columns that the form is trying to insert

-- Add interest column
ALTER TABLE leads ADD COLUMN IF NOT EXISTS interest TEXT;

-- Add language column  
ALTER TABLE leads ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en';

-- Add goals column
ALTER TABLE leads ADD COLUMN IF NOT EXISTS goals TEXT;

-- Add experience column
ALTER TABLE leads ADD COLUMN IF NOT EXISTS experience TEXT;

-- Add time_commitment column
ALTER TABLE leads ADD COLUMN IF NOT EXISTS time_commitment INTEGER;

-- Add motivation column
ALTER TABLE leads ADD COLUMN IF NOT EXISTS motivation TEXT;

-- Add connect_options column (array of text)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS connect_options TEXT[];

-- Add updated_at column if it doesn't exist
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Verify the columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads' 
ORDER BY ordinal_position; 