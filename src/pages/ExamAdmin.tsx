import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, Users, Trophy, AlertTriangle, Unlock } from 'lucide-react';
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
  profiles?: { display_name: string | null; username: string | null; } | null;
}

interface BlockedUser {
  id: string;
  user_id: string;
  is_eligible: boolean;
  blocked_at: string | null;
  profiles?: { display_name: string | null; username: string | null; } | null;
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
    // Load exam sessions
    const { data: sessionsData } = await supabase
      .from('exam_sessions')
      .select('*, profiles:user_id(display_name, username)')
      .order('created_at', { ascending: false })
      .limit(100);

    if (sessionsData) {
      setSessions(sessionsData as any);
      
      // Calculate stats
      const total = sessionsData.length;
      const passed = sessionsData.filter(s => s.passed === true).length;
      const failed = sessionsData.filter(s => s.passed === false || s.status === 'disqualified').length;
      const inProgress = sessionsData.filter(s => s.status === 'in_progress').length;
      setStats({ total, passed, failed, inProgress });
    }

    // Load blocked users
    const { data: blockedData } = await supabase
      .from('exam_eligibility')
      .select('*, profiles:user_id(display_name, username)')
      .eq('is_eligible', false);

    if (blockedData) {
      setBlockedUsers(blockedData as any);
    }
  };

  const approveRetake = async (userId: string) => {
    try {
      await supabase.from('exam_eligibility').update({
        is_eligible: true,
        unblocked_by: user?.id,
        unblocked_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }).eq('user_id', userId);

      toast.success('User approved for retake');
      await loadData();
    } catch (err) {
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
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
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
            <TabsTrigger value="all">All Exams</TabsTrigger>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Hearts</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          {session.profiles?.display_name || session.profiles?.username || 'Unknown'}
                        </TableCell>
                        <TableCell className="capitalize">{session.language}</TableCell>
                        <TableCell>
                          <Badge variant={session.status === 'completed' ? 'default' : session.status === 'disqualified' ? 'destructive' : 'secondary'}>
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
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(session.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                          <TableCell>
                            {blocked.profiles?.display_name || blocked.profiles?.username || 'Unknown'}
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
