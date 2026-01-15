import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Tables in foreign key safe order for import
const TABLES_ORDER = [
  'profiles',
  'user_roles',
  'admins',
  'topics',
  'problems',
  'test_cases',
  'user_preferences',
  'user_solved',
  'problem_sessions',
  'submissions',
  'drafts',
  'skill_ratings',
  'learning_plan',
  'topic_unlocks',
  'arena_sessions',
  'user_activity',
  'leaderboard_achievements',
  'exam_instances',
  'exam_questions',
  'exam_sessions',
  'exam_answers',
  'exam_results',
  'exam_violations',
  'exam_eligibility',
  'app_config',
  'question_variants',
]

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

    // Client with user's token to verify identity
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    })

    // Get the user
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser()
    if (userError || !user) {
      console.error('Auth error:', userError)
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Export request from user: ${user.id}`)

    // Service client for admin operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()

    if (roleError || !roleData) {
      console.error('Admin check failed:', roleError)
      return new Response(
        JSON.stringify({ error: 'Access denied. Admin only.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Admin verified, processing export request')

    // Parse query parameters
    const url = new URL(req.url)
    const tableName = url.searchParams.get('table') || 'all'
    const offset = parseInt(url.searchParams.get('offset') || '0')
    const limit = parseInt(url.searchParams.get('limit') || '1000')

    // If requesting all tables, return metadata
    if (tableName === 'all') {
      const tableStats: Record<string, number> = {}
      
      for (const table of TABLES_ORDER) {
        const { count, error } = await supabaseAdmin
          .from(table)
          .select('*', { count: 'exact', head: true })
        
        if (error) {
          console.error(`Error counting ${table}:`, error)
          tableStats[table] = -1
        } else {
          tableStats[table] = count || 0
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          tables: TABLES_ORDER,
          counts: tableStats,
          totalTables: TABLES_ORDER.length,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate table name
    if (!TABLES_ORDER.includes(tableName)) {
      return new Response(
        JSON.stringify({ error: `Invalid table name: ${tableName}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get total count for pagination
    const { count: totalCount, error: countError } = await supabaseAdmin
      .from(tableName)
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error(`Count error for ${tableName}:`, countError)
      return new Response(
        JSON.stringify({ error: `Failed to count ${tableName}: ${countError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch data with pagination
    const { data, error } = await supabaseAdmin
      .from(tableName)
      .select('*')
      .range(offset, offset + limit - 1)

    if (error) {
      console.error(`Export error for ${tableName}:`, error)
      return new Response(
        JSON.stringify({ error: `Failed to export ${tableName}: ${error.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Exported ${data?.length || 0} rows from ${tableName} (offset: ${offset}, total: ${totalCount})`)

    return new Response(
      JSON.stringify({
        success: true,
        table: tableName,
        data: data || [],
        pagination: {
          offset,
          limit,
          count: data?.length || 0,
          total: totalCount || 0,
          hasMore: (offset + limit) < (totalCount || 0),
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
