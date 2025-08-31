import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_STORAGE_URL!
const supabaseKey = process.env.SUPABASE_STORAGE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
