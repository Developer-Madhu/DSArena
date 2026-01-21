import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase as sbInstance } from '@/integrations/supabase/client';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabase = sbInstance as any;
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { pythonProblemsData } from '@/lib/pythonProblemsData';

export interface ManualQuestion {
    title: string;
    description: string;
    inputFormat?: string;
    testCases: {
        input: string;
        output: string;
        hidden: boolean;
    }[];
    variant?: 'A' | 'B' | 'C' | 'D';
}

export interface ExamInstance {
    id: string;
    topic: string;
    start_time: string;
    end_time: string;
    duration_minutes: number;
    max_students: number;
    total_questions: number;
    score_per_question: number;
    status: 'scheduled' | 'active' | 'completed';
}

export interface FormData {
    topic: string;
    date: string;
    startTime: string;
    duration: number;
    maxStudents: number;
    numQuestions: number;
    scorePerQuestion: number;
}

const initialFormData: FormData = {
    topic: '',
    date: new Date().toISOString().split('T')[0],
    startTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    duration: 90,
    maxStudents: 50,
    numQuestions: 3,
    scorePerQuestion: 10
};

export function useHostDashboardLogic() {
    const { user } = useAuth();
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const [isAdmin, setIsAdmin] = useState(false);
    const [isRootAdmin, setIsRootAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [adminCode, setAdminCode] = useState<string>('');
    const [practiceCode, setPracticeCode] = useState<string>('');
    const [instances, setInstances] = useState<ExamInstance[]>([]);
    const [dashboardMode, setDashboardMode] = useState<'exam' | 'practice'>('exam');

    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
    const [editingInstanceId, setEditingInstanceId] = useState<string | null>(null);
    const [manualQuestions, setManualQuestions] = useState<ManualQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<ManualQuestion>({
        title: '',
        description: '',
        inputFormat: '',
        testCases: [{ input: '', output: '', hidden: false }]
    });

    const [questionLibrary, setQuestionLibrary] = useState<ManualQuestion[]>([]);
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const fetchInstances = useCallback(async () => {
        if (!user) return;
        const { data, error } = await (supabase as any)
            .from('exam_instances')
            .select('*')
            .eq('host_admin_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching instances:', error);
        } else {
            setInstances(data as ExamInstance[] || []);
        }
    }, [user, sb]);

    const fetchQuestionLibrary = useCallback(async () => {
        if (!user) return;
        const { data, error } = await (supabase as any)
            .from('exam_instances')
            .select(`
                id,
                exam_questions (
                    title,
                    description,
                    test_cases,
                    input_format
                )
            `)
            .eq('host_admin_id', user.id);

        if (error) {
            console.error('Error fetching library:', error);
        } else {
            const titles = new Set<string>();
            const questions: ManualQuestion[] = [];
            const typedData = data as any;
            typedData?.forEach(inst => {
                inst.exam_questions?.forEach(q => {
                    if (!titles.has(q.title)) {
                        titles.add(q.title);
                        questions.push({
                            title: q.title,
                            description: q.description,
                            inputFormat: q.input_format,
                            testCases: q.test_cases as { input: string; output: string; hidden: boolean }[]
                        });
                    }
                });
            });
            setQuestionLibrary(questions);
        }
    }, [user, sb]);

    useEffect(() => {
        const checkAuth = async () => {
            if (!user) {
                navigate('/auth');
                return;
            }

            let { data: adminData } = await sb
                .from('admins')
                .select('admin_code, is_root')
                .eq('id', user.id)
                .maybeSingle();

            if (!adminData && user.email) {
                const { data: invitedAdmin } = await supabase
                    .from('admins')
                    .select('*')
                    .eq('email', user.email)
                    .maybeSingle();

                if (invitedAdmin && invitedAdmin.id !== user.id) {
                    const { data: updatedAdmin, error: claimError } = await supabase
                        .from('admins' as any)
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .update({ id: user.id } as any)
                        .eq('email', user.email)
                        .select()
                        .single();

                    if (!claimError) {
                        adminData = updatedAdmin as any;
                        toast.success("Host Protocol verified via neural invitation sequence.");
                    }
                }
            }

            if (!adminData) {
                const { data: roleData } = await supabase
                    .from('user_roles')
                    .select('role')
                    .eq('user_id', user.id)
                    .eq('role', 'admin')
                    .maybeSingle();

                if (roleData) {
                    toast.info("Legacy Admin detected. Synchronizing Host Protocol...");
                    const newCode = 'DSA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
                    const { data: newAdmin, error: upsertError } = await supabase
                        .from('admins' as any)
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .upsert({
                            id: user.id,
                            email: user.email || '',
                            admin_code: newCode,
                            is_root: true
                        } as any, { onConflict: 'id' })
                        .select()
                        .single();

                    if (!upsertError) {
                        adminData = newAdmin as any;
                    } else if (upsertError.code === '23505' || upsertError.code === '409') {
                        const { data: existing } = await sb.from('admins').select('admin_code, is_root').eq('id', user.id).single();
                        if (existing) adminData = existing;
                    }
                }
            }

            if (!adminData) {
                toast.error('Clearance Insufficient. This zone is Restricted.');
                navigate('/');
                return;
            }

            setAdminCode(adminData.admin_code);
            setPracticeCode(adminData.admin_code.replace('DSA-', 'PRC-'));
            setIsRootAdmin(adminData.is_root || false);
            setIsAdmin(true);
            await fetchInstances();
            setLoading(false);
        };

        checkAuth();
    }, [user, navigate, fetchInstances, sb]);

    useEffect(() => {
        if (isAdmin) fetchQuestionLibrary();
    }, [isAdmin, fetchQuestionLibrary]);

    const handleCreateInstance = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            const startTime = new Date(`${formData.date}T${formData.startTime}`);
            const endTime = new Date(startTime.getTime() + formData.duration * 60000);

            let result;
            if (editingInstanceId) {
                result = await supabase
                    .from('exam_instances')
                    .update({
                        topic: formData.topic,
                        start_time: startTime.toISOString(),
                        end_time: endTime.toISOString(),
                        duration_minutes: formData.duration,
                        max_students: formData.maxStudents,
                        total_questions: formData.numQuestions,
                        score_per_question: formData.scorePerQuestion,
                    })
                    .eq('id', editingInstanceId)
                    .select()
                    .single();
            } else {
                const finalTopic = dashboardMode === 'practice' ? `[PRACTICE] ${formData.topic}` : formData.topic;
                result = await supabase
                    .from('exam_instances')
                    .insert({
                        host_admin_id: user?.id,
                        topic: finalTopic,
                        start_time: startTime.toISOString(),
                        end_time: endTime.toISOString(),
                        duration_minutes: formData.duration,
                        max_students: formData.maxStudents,
                        total_questions: formData.numQuestions,
                        score_per_question: formData.scorePerQuestion,
                        status: 'scheduled'
                    })
                    .select()
                    .single();
            }

            const { data, error } = result;
            if (error) throw error;

            toast.success(editingInstanceId ? 'Instance updated successfully!' : 'Exam instance created successfully!');
            fetchInstances();
            if (!editingInstanceId) setSelectedInstanceId(data.id);
            setEditingInstanceId(null);
        } catch (err) {
            console.error('Error saving instance:', err);
            toast.error('Failed to save exam instance');
        }
    };

    const handleEdit = (instance: ExamInstance) => {
        setEditingInstanceId(instance.id);
        setFormData({
            topic: instance.topic,
            date: instance.start_time.split('T')[0],
            startTime: new Date(instance.start_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            duration: instance.duration_minutes,
            maxStudents: instance.max_students,
            numQuestions: instance.total_questions,
            scorePerQuestion: instance.score_per_question
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const addProblemFromBank = (selectedBankProblemIds: string[]) => {
        const problems = pythonProblemsData.filter(p => selectedBankProblemIds.includes(p.id));
        if (problems.length === 0) return;

        const newQuestions: ManualQuestion[] = problems.map(problem => ({
            title: problem.title,
            description: problem.description,
            inputFormat: problem.inputFormat,
            testCases: [
                ...problem.visibleTestCases.map(tc => ({ input: tc.input, output: tc.expectedOutput, hidden: false })),
                ...(problem.hiddenTestCases || []).map(tc => ({ input: tc.input, output: tc.expectedOutput, hidden: true }))
            ]
        }));

        setManualQuestions(prev => [...prev, ...newQuestions]);
        toast.success(`${problems.length} problems synchronized from Global Bank.`);
    };

    const handleSaveQuestions = async () => {
        if (!selectedInstanceId) {
            toast.error("Please select an exam instance first.");
            return;
        }
        if (manualQuestions.length === 0) {
            toast.error("Add at least one question first.");
            return;
        }

        setIsProcessing(true);
        try {
            const records = manualQuestions.map(q => ({
                exam_instance_id: selectedInstanceId,
                title: q.title,
                description: q.description,
                input_format: q.inputFormat || '',
                test_cases: q.testCases.map(tc => ({
                    ...tc,
                    input: tc.input.split('||').map(line => line.trim()).join('\n'),
                    output: tc.output.split('||').map(line => line.trim()).join('\n')
                })),
                assigned_variant: q.variant || 'A'
            }));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await sb.from('exam_questions').insert(records as any);
            if (error) throw error;

            toast.success('All questions saved to the secure instance registry.');
            setManualQuestions([]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await sb.from('exam_instances').update({ status: 'active' } as any).eq('id', selectedInstanceId);
            fetchInstances();
            fetchQuestionLibrary();
            setSelectedInstanceId(null);
        } catch (err: any) {
            console.error('Save failed:', err);
            toast.error(`Failed to save questions: ${err.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const deleteInstance = async (id: string) => {
        if (!confirm('Are you sure? This will delete the instance and all associated questions, sessions, and data.')) return;

        setIsProcessing(true);
        try {
            const { data: sessions } = await sb.from('exam_sessions').select('id').eq('exam_instance_id', id);
            if (sessions && sessions.length > 0) {
                const sessionIds = sessions.map(s => s.id);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await sb.from('exam_eligibility').update({ last_exam_session_id: null } as any).in('last_exam_session_id', sessionIds);
                await sb.from('exam_answers').delete().in('exam_session_id', sessionIds);
                await sb.from('exam_results').delete().in('exam_session_id', sessionIds);
                await sb.from('exam_violations').delete().in('exam_session_id', sessionIds);
                await sb.from('exam_sessions').delete().in('id', sessionIds);
            }
            await sb.from('exam_questions').delete().eq('exam_instance_id', id);
            const { error } = await sb.from('exam_instances').delete().eq('id', id);
            if (error) throw error;

            toast.success('Instance and all associated data purged successfully.');
            fetchInstances();
            if (selectedInstanceId === id) setSelectedInstanceId(null);
        } catch (err: any) {
            console.error("Purge failure:", err);
            toast.error(`Purge failed: ${err.message || 'Unknown protocol error'}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        isAdmin, isRootAdmin, loading, adminCode, practiceCode, instances, dashboardMode, setDashboardMode,
        isProcessing, selectedInstanceId, setSelectedInstanceId, editingInstanceId, setEditingInstanceId,
        manualQuestions, setManualQuestions, currentQuestion, setCurrentQuestion, questionLibrary,
        formData, setFormData, handleCreateInstance, handleEdit, addProblemFromBank, handleSaveQuestions, deleteInstance,
        fetchInstances, fetchQuestionLibrary
    };
}
