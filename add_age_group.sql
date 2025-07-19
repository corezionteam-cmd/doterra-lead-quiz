-- Add age_group column for demographic analysis
ALTER TABLE leads ADD COLUMN IF NOT EXISTS age_group TEXT;

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads' AND column_name = 'age_group'; 