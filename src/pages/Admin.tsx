import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Loader2, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'easy' | 'medium' | 'hard';
  is_published: boolean;
  total_submissions: number;
  total_accepted: number;
}

interface Topic {
  id: string;
  name: string;
  slug: string;
}

interface TestCase {
  id?: string;
  input: string;
  expected_output: string;
  is_visible: boolean;
  display_order: number;
}

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [problems, setProblems] = useState<Problem[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [topicId, setTopicId] = useState<string>('');
  const [description, setDescription] = useState('');
  const [inputFormat, setInputFormat] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [constraints, setConstraints] = useState('');
  const [starterCode, setStarterCode] = useState('def solution():\n    pass');
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: '', expected_output: '', is_visible: true, display_order: 0 },
    { input: '', expected_output: '', is_visible: true, display_order: 1 },
    { input: '', expected_output: '', is_visible: true, display_order: 2 },
    { input: '', expected_output: '', is_visible: false, display_order: 3 },
    { input: '', expected_output: '', is_visible: false, display_order: 4 },
    { input: '', expected_output: '', is_visible: false, display_order: 5 },
    { input: '', expected_output: '', is_visible: false, display_order: 6 },
    { input: '', expected_output: '', is_visible: false, display_order: 7 },
  ]);
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
      toast.error('Access denied');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    const [problemsRes, topicsRes] = await Promise.all([
      supabase
        .from('problems')
        .select('id, title, slug, difficulty, is_published, total_submissions, total_accepted')
        .order('created_at', { ascending: false }),
      supabase.from('topics').select('id, name, slug').order('display_order'),
    ]);

    if (problemsRes.data) setProblems(problemsRes.data as Problem[]);
    if (topicsRes.data) setTopics(topicsRes.data);
    setLoading(false);
  };

  const resetForm = () => {
    setEditingProblem(null);
    setTitle('');
    setSlug('');
    setDifficulty('easy');
    setTopicId('');
    setDescription('');
    setInputFormat('');
    setOutputFormat('');
    setConstraints('');
    setStarterCode('def solution():\n    pass');
    setTestCases([
      { input: '', expected_output: '', is_visible: true, display_order: 0 },
      { input: '', expected_output: '', is_visible: true, display_order: 1 },
      { input: '', expected_output: '', is_visible: true, display_order: 2 },
      { input: '', expected_output: '', is_visible: false, display_order: 3 },
      { input: '', expected_output: '', is_visible: false, display_order: 4 },
      { input: '', expected_output: '', is_visible: false, display_order: 5 },
      { input: '', expected_output: '', is_visible: false, display_order: 6 },
      { input: '', expected_output: '', is_visible: false, display_order: 7 },
    ]);
    setIsPublished(false);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!editingProblem) {
      setSlug(generateSlug(value));
    }
  };

  const updateTestCase = (index: number, field: keyof TestCase, value: string | boolean) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const handleSave = async () => {
    if (!title || !slug || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);

    try {
      const problemData = {
        title,
        slug,
        difficulty,
        topic_id: topicId || null,
        description,
        input_format: inputFormat || null,
        output_format: outputFormat || null,
        constraints: constraints || null,
        starter_code: starterCode,
        is_published: isPublished,
      };

      let problemId = editingProblem;

      if (editingProblem) {
        const { error } = await supabase
          .from('problems')
          .update(problemData)
          .eq('id', editingProblem);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('problems')
          .insert(problemData)
          .select('id')
          .single();

        if (error) throw error;
        problemId = data.id;
      }

      // Delete existing test cases and insert new ones
      if (problemId) {
        await supabase.from('test_cases').delete().eq('problem_id', problemId);

        const testCaseData = testCases.map((tc, index) => ({
          problem_id: problemId,
          input: tc.input,
          expected_output: tc.expected_output,
          is_visible: tc.is_visible,
          display_order: index,
        }));

        const { error: tcError } = await supabase.from('test_cases').insert(testCaseData);
        if (tcError) throw tcError;
      }

      toast.success(editingProblem ? 'Problem updated!' : 'Problem created!');
      setDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save problem');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (problemId: string) => {
    const { data: problem } = await supabase
      .from('problems')
      .select('*')
      .eq('id', problemId)
      .single();

    const { data: tcs } = await supabase
      .from('test_cases')
      .select('*')
      .eq('problem_id', problemId)
      .order('display_order');

    if (problem) {
      setEditingProblem(problemId);
      setTitle(problem.title);
      setSlug(problem.slug);
      setDifficulty(problem.difficulty);
      setTopicId(problem.topic_id || '');
      setDescription(problem.description);
      setInputFormat(problem.input_format || '');
      setOutputFormat(problem.output_format || '');
      setConstraints(problem.constraints || '');
      setStarterCode(problem.starter_code || 'def solution():\n    pass');
      setIsPublished(problem.is_published);

      if (tcs && tcs.length > 0) {
        setTestCases(
          tcs.map((tc: any) => ({
            id: tc.id,
            input: tc.input,
            expected_output: tc.expected_output,
            is_visible: tc.is_visible,
            display_order: tc.display_order,
          }))
        );
      }

      setDialogOpen(true);
    }
  };

  const handleDelete = async (problemId: string) => {
    if (!confirm('Are you sure you want to delete this problem?')) return;

    const { error } = await supabase.from('problems').delete().eq('id', problemId);

    if (error) {
      toast.error('Failed to delete problem');
    } else {
      toast.success('Problem deleted');
      fetchData();
    }
  };

  const handleTogglePublish = async (problemId: string, currentState: boolean) => {
    const { error } = await supabase
      .from('problems')
      .update({ is_published: !currentState })
      .eq('id', problemId);

    if (error) {
      toast.error('Failed to update problem');
    } else {
      fetchData();
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Manage problems and test cases</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                Add Problem
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden">
              <DialogHeader>
                <DialogTitle>
                  {editingProblem ? 'Edit Problem' : 'Create New Problem'}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh] pr-4">
                <div className="space-y-6 py-4">
                  {/* Basic Info */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Two Sum"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug *</Label>
                      <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="two-sum"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <Select value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Topic</Label>
                      <Select value={topicId} onValueChange={setTopicId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {topics.map((topic) => (
                            <SelectItem key={topic.id} value={topic.id}>
                              {topic.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Given an array of integers nums and an integer target..."
                      rows={4}
                    />
                  </div>

                  {/* Formats */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="inputFormat">Input Format</Label>
                      <Textarea
                        id="inputFormat"
                        value={inputFormat}
                        onChange={(e) => setInputFormat(e.target.value)}
                        placeholder="def twoSum(nums: List[int], target: int) -> List[int]"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="outputFormat">Output Format</Label>
                      <Textarea
                        id="outputFormat"
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        placeholder="Return indices of the two numbers"
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Constraints & Starter Code */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="constraints">Constraints</Label>
                      <Textarea
                        id="constraints"
                        value={constraints}
                        onChange={(e) => setConstraints(e.target.value)}
                        placeholder="2 <= nums.length <= 10^4"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="starterCode">Starter Code</Label>
                      <Textarea
                        id="starterCode"
                        value={starterCode}
                        onChange={(e) => setStarterCode(e.target.value)}
                        className="font-mono text-sm"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Test Cases */}
                  <div className="space-y-4">
                    <Label>Test Cases (8 required: 3 visible, 5 hidden)</Label>
                    {testCases.map((tc, index) => (
                      <div key={index} className="rounded-lg border border-border p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Test Case {index + 1}
                          </span>
                          <div className="flex items-center gap-2">
                            {tc.is_visible ? (
                              <Eye className="h-4 w-4 text-success" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {tc.is_visible ? 'Visible' : 'Hidden'}
                            </span>
                            <Switch
                              checked={tc.is_visible}
                              onCheckedChange={(v) => updateTestCase(index, 'is_visible', v)}
                            />
                          </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Input</Label>
                            <Textarea
                              value={tc.input}
                              onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                              className="font-mono text-sm"
                              rows={2}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Expected Output</Label>
                            <Textarea
                              value={tc.expected_output}
                              onChange={(e) => updateTestCase(index, 'expected_output', e.target.value)}
                              className="font-mono text-sm"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Publish Toggle */}
                  <div className="flex items-center gap-3">
                    <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                    <Label>Publish immediately</Label>
                  </div>
                </div>
              </ScrollArea>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="hero" onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Problem'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Problems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{problems.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {problems.filter((p) => p.is_published).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Draft
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">
                {problems.filter((p) => !p.is_published).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Problems List */}
        <Card>
          <CardHeader>
            <CardTitle>Problems</CardTitle>
          </CardHeader>
          <CardContent>
            {problems.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No problems yet. Create your first one!
              </div>
            ) : (
              <div className="space-y-2">
                {problems.map((problem) => (
                  <div
                    key={problem.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{problem.title}</span>
                          <Badge
                            variant="outline"
                            className={cn(
                              'border',
                              problem.difficulty === 'easy' && 'difficulty-easy',
                              problem.difficulty === 'medium' && 'difficulty-medium',
                              problem.difficulty === 'hard' && 'difficulty-hard'
                            )}
                          >
                            {problem.difficulty}
                          </Badge>
                          {!problem.is_published && (
                            <Badge variant="secondary">Draft</Badge>
                          )}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {problem.total_submissions} submissions •{' '}
                          {problem.total_accepted} accepted
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleTogglePublish(problem.id, problem.is_published)}
                      >
                        {problem.is_published ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(problem.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(problem.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
