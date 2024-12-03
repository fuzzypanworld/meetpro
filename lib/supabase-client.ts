import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cggwnokrmtpaifsfjduj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnZ3dub2tybXRwYWlmc2ZqZHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMTA5MDUsImV4cCI6MjA0ODc4NjkwNX0.-mwyuuRns5hKphnKwVxx66auQEgmOnKlsGApIpH1-P8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

