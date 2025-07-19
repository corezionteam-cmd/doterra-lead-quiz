import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug: Check if environment variables are loaded
console.log('Supabase URL:', supabaseUrl ? '✅ Loaded' : '❌ Missing')
console.log('Supabase Key:', supabaseAnonKey ? '✅ Loaded' : '❌ Missing')

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to insert lead data
export async function insertLead(leadData) {
  try {
    console.log('Attempting to insert lead data:', leadData)
    
    // Validate required fields
    if (!leadData.name || !leadData.email || !leadData.phone) {
      throw new Error('Name, email, and phone are required')
    }

    // Clean the data - remove any undefined values
    const cleanData = Object.fromEntries(
      Object.entries(leadData).filter(([_, value]) => value !== undefined && value !== null)
    )

    console.log('Cleaned data for insertion:', cleanData)

    const { data, error } = await supabase
      .from('leads')
      .insert([cleanData])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      throw error
    }

    console.log('Successfully inserted lead:', data)
    return { data, error: null }
  } catch (error) {
    console.error('Error in insertLead function:', error)
    return { data: null, error }
  }
}

// Helper function to get all leads (for admin purposes)
export async function getLeads() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching leads:', error)
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Supabase error:', error)
    return { data: null, error }
  }
}

// Test connection function
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Connection test failed:', error)
      return false
    }

    console.log('Connection test successful')
    return true
  } catch (error) {
    console.error('Connection test error:', error)
    return false
  }
} 