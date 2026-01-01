import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, Users, Trophy, AlertTriangle, Unlock, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { formatExamTime } from '@/lib/examUtils';

interface ExamSession {
  id: string;
  user_id: string;
  language: string;
  status: string;
  passed: boolean | null;
  hearts_remaining: number;
  time_spent_seconds: number | null;
  completed_at: string | null;
  created_at: string;
  total_violations: number;
  display_name?: string | null;
  username?: string | null;
}

interface BlockedUser {
  id: string;
  user_id: string;
  is_eligible: boolean;
  blocked_at: string | null;
  display_name?: string | null;
  username?: string | null;
}

export default function ExamAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<ExamSession[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [stats, setStats] = useState({ total: 0, passed: 0, failed: 0, inProgress: 0 });

  useEffect(() => {
    checkAdminAndLoad();
  }, [user]);

  // Set up realtime subscription
  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel('exam-admin-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'exam_sessions'
        },
        () => {
          console.log('Exam session changed, reloading data...');
          loadData();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'exam_eligibility'
        },
        () => {
          console.log('Eligibility changed, reloading data...');
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

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
    await loadData();
    setLoading(false);
  };

  const loadData = async () => {
    try {
      // First fetch all exam sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('exam_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (sessionsError) {
        console.error('Error fetching sessions:', sessionsError);
        toast.error('Failed to load exam sessions');
        return;
      }

      if (sessionsData && sessionsData.length > 0) {
        // Get unique user IDs
        const userIds = [...new Set(sessionsData.map(s => s.user_id))];
        
        // Fetch profiles for these users
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, display_name, username')
          .in('id', userIds);

        // Create a map for quick lookup
        const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);

        // Merge sessions with profile data
        const sessionsWithProfiles: ExamSession[] = sessionsData.map(session => ({
          ...session,
          display_name: profilesMap.get(session.user_id)?.display_name,
          username: profilesMap.get(session.user_id)?.username,
        }));

        setSessions(sessionsWithProfiles);
        
        // Calculate stats
        const total = sessionsData.length;
        const passed = sessionsData.filter(s => s.passed === true).length;
        const failed = sessionsData.filter(s => s.passed === false || s.status === 'disqualified').length;
        const inProgress = sessionsData.filter(s => s.status === 'in_progress').length;
        setStats({ total, passed, failed, inProgress });
      } else {
        setSessions([]);
        setStats({ total: 0, passed: 0, failed: 0, inProgress: 0 });
      }

      // Load blocked users
      const { data: blockedData, error: blockedError } = await supabase
        .from('exam_eligibility')
        .select('*')
        .eq('is_eligible', false);

      if (blockedError) {
        console.error('Error fetching blocked users:', blockedError);
      }

      if (blockedData && blockedData.length > 0) {
        const blockedUserIds = [...new Set(blockedData.map(b => b.user_id))];
        
        const { data: blockedProfilesData } = await supabase
          .from('profiles')
          .select('id, display_name, username')
          .in('id', blockedUserIds);

        const blockedProfilesMap = new Map(blockedProfilesData?.map(p => [p.id, p]) || []);

        const blockedWithProfiles: BlockedUser[] = blockedData.map(blocked => ({
          ...blocked,
          display_name: blockedProfilesMap.get(blocked.user_id)?.display_name,
          username: blockedProfilesMap.get(blocked.user_id)?.username,
        }));

        setBlockedUsers(blockedWithProfiles);
      } else {
        setBlockedUsers([]);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      toast.error('Failed to load data');
    }
  };

  const approveRetake = async (userId: string) => {
    try {
      const { error } = await supabase.from('exam_eligibility').update({
        is_eligible: true,
        unblocked_by: user?.id,
        unblocked_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }).eq('user_id', userId);

      if (error) throw error;

      toast.success('User approved for retake');
      await loadData();
    } catch (err) {
      console.error('Error approving retake:', err);
      toast.error('Failed to approve retake');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Exam Administration</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Exams</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <Trophy className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.passed}</p>
                <p className="text-sm text-muted-foreground">Passed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{stats.failed}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Exams ({sessions.length})</TabsTrigger>
            <TabsTrigger value="blocked">
              Blocked Users ({blockedUsers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Exam Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No exam sessions found</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Hearts</TableHead>
                        <TableHead>Violations</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">
                            {session.display_name || session.username || session.user_id.slice(0, 8)}
                          </TableCell>
                          <TableCell className="capitalize">{session.language}</TableCell>
                          <TableCell>
                            <Badge variant={
                              session.status === 'completed' ? 'default' : 
                              session.status === 'disqualified' ? 'destructive' : 
                              'secondary'
                            }>
                              {session.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {session.passed === true && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {session.passed === false && <XCircle className="h-5 w-5 text-red-500" />}
                            {session.passed === null && <Clock className="h-5 w-5 text-muted-foreground" />}
                          </TableCell>
                          <TableCell>
                            {session.time_spent_seconds ? formatExamTime(session.time_spent_seconds) : '-'}
                          </TableCell>
                          <TableCell>{session.hearts_remaining}/3</TableCell>
                          <TableCell>{session.total_violations}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(session.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blocked">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Users Awaiting Approval
                </CardTitle>
              </CardHeader>
              <CardContent>
                {blockedUsers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No blocked users</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Blocked At</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blockedUsers.map((blocked) => (
                        <TableRow key={blocked.id}>
                          <TableCell className="font-medium">
                            {blocked.display_name || blocked.username || blocked.user_id.slice(0, 8)}
                          </TableCell>
                          <TableCell>
                            {blocked.blocked_at ? new Date(blocked.blocked_at).toLocaleString() : '-'}
                          </TableCell>
                          <TableCell>
                            <Button size="sm" onClick={() => approveRetake(blocked.user_id)}>
                              <Unlock className="h-4 w-4 mr-2" />
                              Approve Retake
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
