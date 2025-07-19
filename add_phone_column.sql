-- Add phone column to existing leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone TEXT;

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads' AND column_name = 'phone'; 