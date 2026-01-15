import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, Database, CheckCircle, XCircle, Loader2, ArrowLeft, FileJson } from 'lucide-react';
import { toast } from 'sonner';

interface TableInfo {
  name: string;
  count: number;
  exported: boolean;
  exporting: boolean;
  error: string | null;
}

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

export default function AdminExport() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [exportingAll, setExportingAll] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    checkAdminAndLoad();
  }, [user]);

  const checkAdminAndLoad = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Check admin role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      toast.error('Access denied. Admin only.');
      navigate('/dashboard');
      return;
    }

    setIsAdmin(true);
    await loadTableStats();
    setLoading(false);
  };

  const loadTableStats = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.access_token) {
        toast.error('Not authenticated');
        return;
      }

      const response = await supabase.functions.invoke('export-data', {
        body: {},
      });

      if (response.error) {
        console.error('Error loading stats:', response.error);
        toast.error('Failed to load table statistics');
        return;
      }

      const { counts } = response.data;
      const tableInfos: TableInfo[] = TABLES_ORDER.map(name => ({
        name,
        count: counts[name] ?? 0,
        exported: false,
        exporting: false,
        error: null,
      }));

      setTables(tableInfos);
      setTotalRows(Object.values(counts as Record<string, number>).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0));
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to connect to export service');
    }
  };

  const exportTable = async (tableName: string): Promise<unknown[]> => {
    const allData: unknown[] = [];
    let offset = 0;
    const limit = 1000;
    let hasMore = true;

    while (hasMore) {
      const response = await supabase.functions.invoke('export-data', {
        body: {},
        headers: {},
      });

      // Use fetch directly for query params
      const { data: session } = await supabase.auth.getSession();
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/export-data?table=${tableName}&offset=${offset}&limit=${limit}`;
      
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${session?.session?.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to export ${tableName}: ${res.statusText}`);
      }

      const result = await res.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      allData.push(...result.data);
      hasMore = result.pagination.hasMore;
      offset += limit;
    }

    return allData;
  };

  const downloadJson = (data: unknown, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportTable = async (tableName: string) => {
    setTables(prev => prev.map(t => 
      t.name === tableName ? { ...t, exporting: true, error: null } : t
    ));

    try {
      const data = await exportTable(tableName);
      downloadJson(data, `${tableName}.json`);
      
      setTables(prev => prev.map(t => 
        t.name === tableName ? { ...t, exporting: false, exported: true } : t
      ));
      toast.success(`Exported ${tableName} (${data.length} rows)`);
    } catch (err) {
      console.error(`Export error for ${tableName}:`, err);
      setTables(prev => prev.map(t => 
        t.name === tableName ? { ...t, exporting: false, error: String(err) } : t
      ));
      toast.error(`Failed to export ${tableName}`);
    }
  };

  const handleExportAll = async () => {
    setExportingAll(true);
    setExportProgress(0);
    
    const allData: Record<string, unknown[]> = {};
    let completed = 0;

    for (const table of tables) {
      try {
        setTables(prev => prev.map(t => 
          t.name === table.name ? { ...t, exporting: true, error: null } : t
        ));

        const data = await exportTable(table.name);
        allData[table.name] = data;

        setTables(prev => prev.map(t => 
          t.name === table.name ? { ...t, exporting: false, exported: true } : t
        ));

        completed++;
        setExportProgress(Math.round((completed / tables.length) * 100));
      } catch (err) {
        console.error(`Export error for ${table.name}:`, err);
        setTables(prev => prev.map(t => 
          t.name === table.name ? { ...t, exporting: false, error: String(err) } : t
        ));
      }
    }

    // Download individual files for each table
    for (const [tableName, data] of Object.entries(allData)) {
      downloadJson(data, `${tableName}.json`);
      // Small delay to avoid browser blocking multiple downloads
      await new Promise(r => setTimeout(r, 200));
    }

    // Also create a combined export
    downloadJson({
      exportedAt: new Date().toISOString(),
      tables: allData,
    }, `full_export_${new Date().toISOString().split('T')[0]}.json`);

    setExportingAll(false);
    toast.success(`Export complete! ${Object.keys(allData).length} tables exported.`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const exportedCount = tables.filter(t => t.exported).length;
  const errorCount = tables.filter(t => t.error).length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/exam-admin')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Data Export</h1>
              <p className="text-muted-foreground">Export database tables for migration</p>
            </div>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Database className="h-4 w-4 mr-2" />
            {totalRows.toLocaleString()} total rows
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tables.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Exported</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{exportedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{errorCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Rows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRows.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Export All Button */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              Full Export
            </CardTitle>
            <CardDescription>
              Export all tables at once. Files will be downloaded individually and as a combined JSON.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleExportAll} 
              disabled={exportingAll}
              size="lg"
              className="w-full"
            >
              {exportingAll ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Exporting... {exportProgress}%
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export All Tables
                </>
              )}
            </Button>
            {exportingAll && (
              <Progress value={exportProgress} className="w-full" />
            )}
          </CardContent>
        </Card>

        {/* Individual Tables */}
        <Card>
          <CardHeader>
            <CardTitle>Individual Tables</CardTitle>
            <CardDescription>
              Export tables one by one. Tables are ordered by foreign key dependencies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {tables.map((table, index) => (
                <div 
                  key={table.name}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-6">{index + 1}.</span>
                    <div>
                      <div className="font-medium text-sm">{table.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {table.count.toLocaleString()} rows
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {table.exported && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {table.error && (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleExportTable(table.name)}
                      disabled={table.exporting || exportingAll}
                    >
                      {table.exporting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Import Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>
              After exporting, use the import script to load data into your new Supabase project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2">
              <p className="text-muted-foreground"># Set environment variables</p>
              <p>export NEW_SUPABASE_URL="https://your-project.supabase.co"</p>
              <p>export NEW_SUPABASE_SERVICE_KEY="your-service-role-key"</p>
              <p className="text-muted-foreground mt-4"># Run the import script</p>
              <p>node migration/import_data.js ./exported-data/</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
