import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, Users, Trophy, AlertTriangle, Unlock, RefreshCw, RotateCcw, UserCheck, Ban, Trash2 } from 'lucide-react';
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

// Helper function to determine the actual exam result
const getExamResult = (session: ExamSession): 'passed' | 'failed' | 'in_progress' | 'disqualified' | 'revoked' => {
  if (session.status === 'disqualified') return 'disqualified';
  if (session.status === 'revoked') return 'revoked';
  if (session.passed === true) return 'passed';
  if (session.passed === false) return 'failed';

  // If status is still in_progress but hearts are 0, it's effectively disqualified
  if (session.status === 'in_progress' && session.hearts_remaining === 0) {
    return 'disqualified';
  }

  // If status is completed but passed is null, treat as failed
  if (session.status === 'completed' && session.passed === null) {
    return 'failed';
  }

  return 'in_progress';
};

export default function ExamAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<ExamSession[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [stats, setStats] = useState({ total: 0, passed: 0, failed: 0, inProgress: 0, totalUsers: 0 });
  const [isApprovingAll, setIsApprovingAll] = useState(false);
  const [isDeletingEntries, setIsDeletingEntries] = useState(false);
  const [isRetakingAll, setIsRetakingAll] = useState(false);

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
      // Get total unique users who have taken exams (no limit)
      const { count: totalUsersCount } = await supabase
        .from('exam_sessions')
        .select('user_id', { count: 'exact', head: true });

      // Get total exam sessions count (no limit)
      const { count: totalSessionsCount } = await supabase
        .from('exam_sessions')
        .select('*', { count: 'exact', head: true });

      // Fetch exam sessions for display (paginated for performance)
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('exam_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

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

        // Calculate stats from ALL data using counts
        const passedCount = sessionsWithProfiles.filter(s => getExamResult(s) === 'passed').length;
        const failedCount = sessionsWithProfiles.filter(s => {
          const result = getExamResult(s);
          return result === 'failed' || result === 'disqualified' || result === 'revoked';
        }).length;
        const inProgressCount = sessionsWithProfiles.filter(s => getExamResult(s) === 'in_progress').length;

        setStats({
          total: totalSessionsCount || sessionsData.length,
          passed: passedCount,
          failed: failedCount,
          inProgress: inProgressCount,
          totalUsers: totalUsersCount || userIds.length
        });
      } else {
        setSessions([]);
        setStats({ total: 0, passed: 0, failed: 0, inProgress: 0, totalUsers: 0 });
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

  // Approve ALL blocked users at once
  const approveAllUsers = async () => {
    if (blockedUsers.length === 0) {
      toast.info('No blocked users to approve');
      return;
    }

    setIsApprovingAll(true);
    try {
      const { error } = await supabase
        .from('exam_eligibility')
        .update({
          is_eligible: true,
          unblocked_by: user?.id,
          unblocked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('is_eligible', false);

      if (error) throw error;

      toast.success(`Approved ${blockedUsers.length} users for retake`);
      await loadData();
    } catch (err) {
      console.error('Error approving all users:', err);
      toast.error('Failed to approve all users');
    } finally {
      setIsApprovingAll(false);
    }
  };

  // Allow ALL users (including those who passed) to retake the exam
  const retakeAll = async () => {
    const uniqueUserIds = [...new Set(sessions.map(s => s.user_id))];

    if (uniqueUserIds.length === 0) {
      toast.info('No users found to enable retake');
      return;
    }

    if (!confirm(`Are you sure you want to allow ALL ${uniqueUserIds.length} users to retake the exam? This includes users who have already passed.`)) {
      return;
    }

    setIsRetakingAll(true);
    try {
      // Prepare bulk upsert data
      const eligibilityUpdates = uniqueUserIds.map(userId => ({
        user_id: userId,
        is_eligible: true,
        unblocked_by: user?.id,
        unblocked_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from('exam_eligibility')
        .upsert(eligibilityUpdates, { onConflict: 'user_id' });

      if (error) throw error;

      toast.success(`Enabled retake for ${uniqueUserIds.length} users`);
      await loadData();
    } catch (err) {
      console.error('Error enabling retake for all:', err);
      toast.error('Failed to enable retake for all users');
    } finally {
      setIsRetakingAll(false);
    }
  };

  // Delete all completed/failed/disqualified exam entries
  const deleteCompletedEntries = async () => {
    const deletableSessions = sessions.filter(s => {
      const result = getExamResult(s);
      return result !== 'in_progress';
    });

    if (deletableSessions.length === 0) {
      toast.info('No completed entries to delete');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${deletableSessions.length} completed exam entries? This action cannot be undone.`)) {
      return;
    }

    setIsDeletingEntries(true);
    try {
      const sessionIds = deletableSessions.map(s => s.id);

      // Delete exam answers first (foreign key constraint)
      await supabase
        .from('exam_answers')
        .delete()
        .in('exam_session_id', sessionIds);

      // Delete exam results
      await supabase
        .from('exam_results')
        .delete()
        .in('exam_session_id', sessionIds);

      // Delete exam violations
      await supabase
        .from('exam_violations')
        .delete()
        .in('exam_session_id', sessionIds);

      // Delete exam sessions
      const { error } = await supabase
        .from('exam_sessions')
        .delete()
        .in('id', sessionIds);

      if (error) throw error;

      // Also delete eligibility records for deleted users who are blocked
      const userIds = [...new Set(deletableSessions.map(s => s.user_id))];
      await supabase
        .from('exam_eligibility')
        .delete()
        .in('user_id', userIds);

      toast.success(`Deleted ${deletableSessions.length} exam entries`);
      await loadData();
    } catch (err) {
      console.error('Error deleting entries:', err);
      toast.error('Failed to delete entries');
    } finally {
      setIsDeletingEntries(false);
    }
  };

  // Revoke an ongoing exam session
  const revokeExam = async (sessionId: string, userId: string) => {
    try {
      // Update the session to revoked status
      const { error: sessionError } = await supabase.from('exam_sessions').update({
        status: 'disqualified',
        passed: false,
        completed_at: new Date().toISOString(),
      }).eq('id', sessionId);

      if (sessionError) throw sessionError;

      // Block user from retaking
      const { data: existingEligibility } = await supabase
        .from('exam_eligibility')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (existingEligibility) {
        await supabase.from('exam_eligibility').update({
          is_eligible: false,
          last_exam_passed: false,
          last_exam_session_id: sessionId,
          blocked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }).eq('user_id', userId);
      } else {
        await supabase.from('exam_eligibility').insert({
          user_id: userId,
          is_eligible: false,
          last_exam_passed: false,
          last_exam_session_id: sessionId,
          blocked_at: new Date().toISOString(),
        });
      }

      toast.success('Exam revoked successfully');
      await loadData();
    } catch (err) {
      console.error('Error revoking exam:', err);
      toast.error('Failed to revoke exam');
    }
  };

  // Approve retake directly from the exam sessions table
  const approveRetakeFromSession = async (userId: string) => {
    try {
      // Check if eligibility record exists
      const { data: existingEligibility } = await supabase
        .from('exam_eligibility')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (existingEligibility) {
        // Update existing record
        await supabase.from('exam_eligibility').update({
          is_eligible: true,
          unblocked_by: user?.id,
          unblocked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }).eq('user_id', userId);
      } else {
        // Create new eligibility record
        await supabase.from('exam_eligibility').insert({
          user_id: userId,
          is_eligible: true,
          unblocked_by: user?.id,
          unblocked_at: new Date().toISOString(),
        });
      }

      toast.success('User approved for retake');
      await loadData();
    } catch (err) {
      console.error('Error approving retake:', err);
      toast.error('Failed to approve retake');
    }
  };

  // Fix stale exam sessions (in_progress with 0 hearts)
  const fixStaleSession = async (sessionId: string, userId: string) => {
    try {
      // Update the session to disqualified
      await supabase.from('exam_sessions').update({
        status: 'disqualified',
        passed: false,
        completed_at: new Date().toISOString(),
      }).eq('id', sessionId);

      // Create/update eligibility record to block retake
      const { data: existingEligibility } = await supabase
        .from('exam_eligibility')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (existingEligibility) {
        await supabase.from('exam_eligibility').update({
          is_eligible: false,
          last_exam_passed: false,
          last_exam_session_id: sessionId,
          blocked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }).eq('user_id', userId);
      } else {
        await supabase.from('exam_eligibility').insert({
          user_id: userId,
          is_eligible: false,
          last_exam_passed: false,
          last_exam_session_id: sessionId,
          blocked_at: new Date().toISOString(),
        });
      }

      toast.success('Session marked as disqualified');
      await loadData();
    } catch (err) {
      console.error('Error fixing session:', err);
      toast.error('Failed to update session');
    }
  };

  const getResultBadge = (session: ExamSession) => {
    const result = getExamResult(session);
    switch (result) {
      case 'passed':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Passed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'disqualified':
        return <Badge variant="destructive" className="bg-red-600/20 text-red-400 border-red-600/30">Disqualified</Badge>;
      case 'revoked':
        return <Badge variant="destructive" className="bg-orange-600/20 text-orange-400 border-orange-600/30">Revoked</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">In Progress</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (session: ExamSession) => {
    const result = getExamResult(session);
    // Show actual status with correction note if needed
    if (session.status === 'in_progress' && result === 'disqualified') {
      return (
        <div className="flex items-center gap-1">
          <Badge variant="destructive">Stale</Badge>
          <span className="text-xs text-muted-foreground">(needs fix)</span>
        </div>
      );
    }
    return (
      <Badge variant={
        session.status === 'completed' ? 'default' :
          session.status === 'disqualified' ? 'destructive' :
            session.status === 'revoked' ? 'destructive' :
              'secondary'
      }>
        {session.status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  // Get failed users who need retake approval (from sessions, not just blocked list)
  const failedSessions = sessions.filter(s => {
    const result = getExamResult(s);
    return result === 'failed' || result === 'disqualified' || result === 'revoked';
  });

  // Get in-progress sessions that can be revoked
  const inProgressSessions = sessions.filter(s => getExamResult(s) === 'in_progress');

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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <Users className="h-8 w-8 text-blue-500" />
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

        {/* Bulk Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Admin Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button
              onClick={approveAllUsers}
              disabled={isApprovingAll || blockedUsers.length === 0}
            >
              {isApprovingAll ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Approving...
                </>
              ) : (
                <>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Approve All Users ({blockedUsers.length})
                </>
              )}
            </Button>
            <Button
              variant="default" // Primary style to distinguish
              onClick={retakeAll}
              disabled={isRetakingAll || sessions.length === 0}
              className="ml-2"
            >
              {isRetakingAll ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake All ({[...new Set(sessions.map(s => s.user_id))].length})
                </>
              )}
            </Button>
            <Button
              variant="destructive"
              onClick={deleteCompletedEntries}
              disabled={isDeletingEntries || sessions.filter(s => getExamResult(s) !== 'in_progress').length === 0}
            >
              {isDeletingEntries ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Entries ({sessions.filter(s => getExamResult(s) !== 'in_progress').length})
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Exams ({sessions.length})</TabsTrigger>
            <TabsTrigger value="in_progress">
              In Progress ({inProgressSessions.length})
            </TabsTrigger>
            <TabsTrigger value="failed">
              Failed/Disqualified ({failedSessions.length})
            </TabsTrigger>
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
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sessions.map((session) => {
                        const result = getExamResult(session);
                        const isStale = session.status === 'in_progress' && result === 'disqualified';
                        const isInProgress = result === 'in_progress';

                        return (
                          <TableRow key={session.id}>
                            <TableCell className="font-medium">
                              {session.display_name || session.username || session.user_id.slice(0, 8)}
                            </TableCell>
                            <TableCell className="capitalize">{session.language}</TableCell>
                            <TableCell>{getStatusBadge(session)}</TableCell>
                            <TableCell>{getResultBadge(session)}</TableCell>
                            <TableCell>
                              {session.time_spent_seconds ? formatExamTime(session.time_spent_seconds) : '-'}
                            </TableCell>
                            <TableCell>{session.hearts_remaining}/3</TableCell>
                            <TableCell>{session.total_violations}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(session.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {isStale && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => fixStaleSession(session.id, session.user_id)}
                                  >
                                    Fix Status
                                  </Button>
                                )}
                                {isInProgress && (
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => revokeExam(session.id, session.user_id)}
                                  >
                                    <Ban className="h-3 w-3 mr-1" />
                                    Revoke
                                  </Button>
                                )}
                                {(result === 'failed' || result === 'disqualified' || result === 'revoked') && (
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => approveRetakeFromSession(session.user_id)}
                                  >
                                    <RotateCcw className="h-3 w-3 mr-1" />
                                    Allow Retake
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="in_progress">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  In Progress Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                {inProgressSessions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No exams in progress</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Hearts Left</TableHead>
                        <TableHead>Violations</TableHead>
                        <TableHead>Started At</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inProgressSessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">
                            {session.display_name || session.username || session.user_id.slice(0, 8)}
                          </TableCell>
                          <TableCell className="capitalize">{session.language}</TableCell>
                          <TableCell>{session.hearts_remaining}/3</TableCell>
                          <TableCell>{session.total_violations}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(session.created_at).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => revokeExam(session.id, session.user_id)}
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Revoke Exam
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

          <TabsContent value="failed">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Failed & Disqualified Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                {failedSessions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No failed exams</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Hearts Left</TableHead>
                        <TableHead>Violations</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {failedSessions.map((session) => {
                        const result = getExamResult(session);
                        const isStale = session.status === 'in_progress' && result === 'disqualified';

                        return (
                          <TableRow key={session.id}>
                            <TableCell className="font-medium">
                              {session.display_name || session.username || session.user_id.slice(0, 8)}
                            </TableCell>
                            <TableCell className="capitalize">{session.language}</TableCell>
                            <TableCell>{getResultBadge(session)}</TableCell>
                            <TableCell>{session.hearts_remaining}/3</TableCell>
                            <TableCell>{session.total_violations}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(session.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {isStale && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => fixStaleSession(session.id, session.user_id)}
                                  >
                                    Fix Status
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  onClick={() => approveRetakeFromSession(session.user_id)}
                                >
                                  <RotateCcw className="h-4 w-4 mr-2" />
                                  Allow Retake
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
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
                  Blocked Users (Awaiting Approval)
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
