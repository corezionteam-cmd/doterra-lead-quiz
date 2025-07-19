# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Choose your organization and project name
4. Set a database password (save it!)
5. Choose your region
6. Wait for the project to be created

## 2. Get Your Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key
3. Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 3. Create the Database Table

In your Supabase dashboard, go to **SQL Editor** and run this SQL:

```sql
-- Create leads table
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
```

## 4. Test the Connection

The app is now configured to save leads to Supabase! When users submit the form, their data will be stored in your `leads` table.

## 5. View Your Leads

You can view submitted leads in your Supabase dashboard under **Table Editor** → **leads**.

## Security Notes

- The anon key is safe to use in the frontend
- Row Level Security (RLS) is enabled for data protection
- You can add more restrictive policies based on your needs
- Consider adding email validation and rate limiting in production 