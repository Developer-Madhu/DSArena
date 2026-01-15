/**
 * Data Import Script for Supabase Migration
 * 
 * Usage:
 *   export NEW_SUPABASE_URL="https://your-project.supabase.co"
 *   export NEW_SUPABASE_SERVICE_KEY="your-service-role-key"
 *   node migration/import_data.js ./exported-data/
 * 
 * Options:
 *   --dry-run    Preview what would be imported without making changes
 *   --table=X    Import only a specific table
 *   --skip=X,Y   Skip specific tables
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuration
const BATCH_SIZE = 500;
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;

// Tables in foreign key safe order
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
];

// Parse command line arguments
const args = process.argv.slice(2);
const dataDir = args.find(a => !a.startsWith('--')) || './exported-data';
const dryRun = args.includes('--dry-run');
const tableArg = args.find(a => a.startsWith('--table='));
const skipArg = args.find(a => a.startsWith('--skip='));

const targetTable = tableArg ? tableArg.split('=')[1] : null;
const skipTables = skipArg ? skipArg.split('=')[1].split(',') : [];

// Validate environment
const SUPABASE_URL = process.env.NEW_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.NEW_SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing environment variables!');
  console.error('   Set NEW_SUPABASE_URL and NEW_SUPABASE_SERVICE_KEY');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false }
});

// Helper: Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Retry with exponential backoff
async function withRetry(fn, tableName, attempt = 1) {
  try {
    return await fn();
  } catch (error) {
    if (attempt >= RETRY_ATTEMPTS) {
      throw error;
    }
    console.log(`   ⚠️  Retry ${attempt}/${RETRY_ATTEMPTS} for ${tableName}...`);
    await sleep(RETRY_DELAY_MS * attempt);
    return withRetry(fn, tableName, attempt + 1);
  }
}

// Helper: Read JSON file
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

// Helper: Insert data in batches
async function insertBatch(tableName, rows) {
  if (rows.length === 0) return { inserted: 0, errors: [] };

  const errors = [];
  let inserted = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    
    if (dryRun) {
      console.log(`   [DRY RUN] Would insert ${batch.length} rows into ${tableName}`);
      inserted += batch.length;
      continue;
    }

    try {
      const result = await withRetry(async () => {
        const { data, error } = await supabase
          .from(tableName)
          .upsert(batch, { 
            onConflict: 'id',
            ignoreDuplicates: false 
          });
        
        if (error) throw error;
        return data;
      }, tableName);

      inserted += batch.length;
      process.stdout.write(`\r   Inserting... ${inserted}/${rows.length}`);
    } catch (error) {
      errors.push({
        batch: i / BATCH_SIZE + 1,
        error: error.message,
        sample: batch[0]?.id || 'unknown'
      });
    }
  }

  console.log(); // New line after progress
  return { inserted, errors };
}

// Main import function
async function importData() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║       Supabase Data Import Script          ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log();
  console.log(`📁 Data directory: ${dataDir}`);
  console.log(`🔗 Target: ${SUPABASE_URL}`);
  if (dryRun) console.log('🧪 DRY RUN MODE - No changes will be made');
  if (targetTable) console.log(`🎯 Target table: ${targetTable}`);
  if (skipTables.length) console.log(`⏭️  Skipping: ${skipTables.join(', ')}`);
  console.log();

  // Verify directory exists
  if (!fs.existsSync(dataDir)) {
    console.error(`❌ Directory not found: ${dataDir}`);
    process.exit(1);
  }

  // Check for combined export file
  const combinedFiles = fs.readdirSync(dataDir).filter(f => f.startsWith('full_export_'));
  let dataSource = 'individual';
  let combinedData = null;

  if (combinedFiles.length > 0) {
    const latestCombined = combinedFiles.sort().reverse()[0];
    console.log(`📦 Found combined export: ${latestCombined}`);
    combinedData = readJsonFile(path.join(dataDir, latestCombined));
    if (combinedData?.tables) {
      dataSource = 'combined';
    }
  }

  const stats = {
    total: 0,
    inserted: 0,
    errors: 0,
    skipped: 0,
    tables: {}
  };

  // Process tables in order
  for (const tableName of TABLES_ORDER) {
    // Skip if not target table (when specified)
    if (targetTable && tableName !== targetTable) continue;
    
    // Skip if in skip list
    if (skipTables.includes(tableName)) {
      console.log(`⏭️  Skipping ${tableName}`);
      stats.skipped++;
      continue;
    }

    console.log(`\n📊 Processing: ${tableName}`);

    // Get data from combined or individual file
    let data;
    if (dataSource === 'combined' && combinedData?.tables?.[tableName]) {
      data = combinedData.tables[tableName];
    } else {
      const filePath = path.join(dataDir, `${tableName}.json`);
      data = readJsonFile(filePath);
    }

    if (!data) {
      console.log(`   ⚠️  No data file found, skipping`);
      stats.tables[tableName] = { status: 'no_file', rows: 0 };
      continue;
    }

    if (!Array.isArray(data)) {
      console.log(`   ⚠️  Invalid data format, skipping`);
      stats.tables[tableName] = { status: 'invalid', rows: 0 };
      continue;
    }

    if (data.length === 0) {
      console.log(`   ✅ Empty table, nothing to import`);
      stats.tables[tableName] = { status: 'empty', rows: 0 };
      continue;
    }

    console.log(`   Found ${data.length} rows`);
    stats.total += data.length;

    // Insert data
    const { inserted, errors } = await insertBatch(tableName, data);
    
    stats.inserted += inserted;
    stats.errors += errors.length;
    stats.tables[tableName] = {
      status: errors.length > 0 ? 'partial' : 'success',
      rows: data.length,
      inserted,
      errors: errors.length
    };

    if (errors.length > 0) {
      console.log(`   ❌ ${errors.length} batch(es) failed`);
      errors.forEach(e => console.log(`      Batch ${e.batch}: ${e.error}`));
    } else {
      console.log(`   ✅ Inserted ${inserted} rows`);
    }
  }

  // Summary
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║                  SUMMARY                   ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log();
  console.log(`📊 Total rows processed: ${stats.total.toLocaleString()}`);
  console.log(`✅ Rows inserted: ${stats.inserted.toLocaleString()}`);
  console.log(`❌ Errors: ${stats.errors}`);
  console.log(`⏭️  Tables skipped: ${stats.skipped}`);
  console.log();

  // Per-table summary
  console.log('Per-table results:');
  for (const [table, result] of Object.entries(stats.tables)) {
    const icon = result.status === 'success' ? '✅' : 
                 result.status === 'partial' ? '⚠️' : 
                 result.status === 'empty' ? '📭' : '❌';
    console.log(`  ${icon} ${table}: ${result.inserted || 0}/${result.rows || 0} rows`);
  }

  if (dryRun) {
    console.log('\n🧪 This was a DRY RUN. No changes were made.');
    console.log('   Remove --dry-run to actually import data.');
  }

  console.log('\n✨ Import complete!');
}

// Run
importData().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
