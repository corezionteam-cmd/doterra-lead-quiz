-- Create leads table for the lead quiz app
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  interest TEXT,
  language TEXT DEFAULT 'en',
  goals TEXT,
  experience TEXT,
  time_commitment INTEGER,
  motivation TEXT,
  connect_options TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated and anonymous users
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reads (you can modify this based on your needs)
CREATE POLICY "Allow reads" ON leads
  FOR SELECT USING (true);

-- Create index for better performance
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_email ON leads(email);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 