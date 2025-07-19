-- Clean up columns to match the form data mapping
-- Remove unnecessary columns and ensure correct structure

-- First, let's see what columns we currently have
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads' 
ORDER BY ordinal_position;

-- Remove the unnecessary columns that we're not using
-- (These will be removed only if they exist)

-- Remove 'goals' column if it exists (we're using 'quiz_result' instead)
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'goals') THEN
        ALTER TABLE leads DROP COLUMN goals;
        RAISE NOTICE 'Removed goals column';
    END IF;
END $$;

-- Remove 'experience' column if it exists (we're using 'tags' instead)
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'experience') THEN
        ALTER TABLE leads DROP COLUMN experience;
        RAISE NOTICE 'Removed experience column';
    END IF;
END $$;

-- Ensure we have the correct columns for our form data
-- Add quiz_result column if it doesn't exist (for goals data)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'quiz_result') THEN
        ALTER TABLE leads ADD COLUMN quiz_result TEXT;
        RAISE NOTICE 'Added quiz_result column';
    END IF;
END $$;

-- Add tags column if it doesn't exist (for experience data)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'tags') THEN
        ALTER TABLE leads ADD COLUMN tags TEXT;
        RAISE NOTICE 'Added tags column';
    END IF;
END $$;

-- Verify the final structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads' 
ORDER BY ordinal_position; 