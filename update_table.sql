-- Safely add missing columns to existing leads table
-- These commands will only add columns if they don't exist

-- Add language column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'language') THEN
        ALTER TABLE leads ADD COLUMN language TEXT DEFAULT 'en';
    END IF;
END $$;

-- Add goals column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'goals') THEN
        ALTER TABLE leads ADD COLUMN goals TEXT;
    END IF;
END $$;

-- Add experience column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'experience') THEN
        ALTER TABLE leads ADD COLUMN experience TEXT;
    END IF;
END $$;

-- Add time_commitment column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'time_commitment') THEN
        ALTER TABLE leads ADD COLUMN time_commitment INTEGER;
    END IF;
END $$;

-- Add motivation column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'motivation') THEN
        ALTER TABLE leads ADD COLUMN motivation TEXT;
    END IF;
END $$;

-- Add connect_options column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'connect_options') THEN
        ALTER TABLE leads ADD COLUMN connect_options TEXT[];
    END IF;
END $$;

-- Add updated_at column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'updated_at') THEN
        ALTER TABLE leads ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Enable RLS if not already enabled
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies only if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'Allow anonymous inserts') THEN
        CREATE POLICY "Allow anonymous inserts" ON leads FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'Allow reads') THEN
        CREATE POLICY "Allow reads" ON leads FOR SELECT USING (true);
    END IF;
END $$;

-- Create indexes only if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'leads' AND indexname = 'idx_leads_created_at') THEN
        CREATE INDEX idx_leads_created_at ON leads(created_at);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'leads' AND indexname = 'idx_leads_email') THEN
        CREATE INDEX idx_leads_email ON leads(email);
    END IF;
END $$;

-- Create update trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger only if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_leads_updated_at') THEN
        CREATE TRIGGER update_leads_updated_at 
            BEFORE UPDATE ON leads 
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$; 