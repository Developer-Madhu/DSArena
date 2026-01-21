import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, PlusCircle, Trash2, ShieldCheck, Eye, EyeOff, BrainCircuit, CheckCircle2, Save, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ManualQuestion, ExamInstance } from '../hooks/useHostDashboardLogic';
import { pythonProblemsData, getPythonCategories } from '@/lib/pythonProblemsData';
import { toast } from 'sonner';

interface HostQuestionDesignerProps {
    selectedInstanceId: string | null;
    instanceQuota: number;
    manualQuestions: ManualQuestion[];
    setManualQuestions: React.Dispatch<React.SetStateAction<ManualQuestion[]>>;
    currentQuestion: ManualQuestion;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<ManualQuestion>>;
    questionLibrary: ManualQuestion[];
    onSave: () => Promise<void>;
    isProcessing: boolean;
    dashboardMode: 'exam' | 'practice';
    addProblemFromBank: (selectedIds: string[]) => void;
}

export const HostQuestionDesigner = ({
    selectedInstanceId,
    instanceQuota,
    manualQuestions,
    setManualQuestions,
    currentQuestion,
    setCurrentQuestion,
    questionLibrary,
    onSave,
    isProcessing,
    dashboardMode,
    addProblemFromBank
}: HostQuestionDesignerProps) => {
    const [activeTab, setActiveTab] = useState("manual");
    const [selectedBankCategories, setSelectedBankCategories] = useState<string[]>(["Python Core"]);
    const [selectedBankProblemIds, setSelectedBankProblemIds] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        setSelectedBankCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleSmartRandomize = () => {
        // 1. Get pool from selected topics
        const pool = pythonProblemsData.filter(p => selectedBankCategories.includes(p.category));

        // 2. Bucket by difficulty
        const easy = pool.filter(p => p.difficulty.toLowerCase() === 'easy');
        const medium = pool.filter(p => p.difficulty.toLowerCase() === 'medium');
        const hard = pool.filter(p => p.difficulty.toLowerCase() === 'hard');

        // 3. Select mandatory 1 of each
        const selected: string[] = [];

        if (easy.length) selected.push(easy[Math.floor(Math.random() * easy.length)].id);
        if (medium.length) selected.push(medium[Math.floor(Math.random() * medium.length)].id);
        if (hard.length) selected.push(hard[Math.floor(Math.random() * hard.length)].id);

        // 4. Fill remainder to reach quota
        const remainingNeeded = instanceQuota - selected.length;
        if (remainingNeeded > 0) {
            const remainingPool = pool.filter(p => !selected.includes(p.id));
            const shuffled = [...remainingPool].sort(() => 0.5 - Math.random());
            const extras = shuffled.slice(0, remainingNeeded).map(p => p.id);
            selected.push(...extras);
        }

        setSelectedBankProblemIds(selected);
        toast.success("Smart selection applied: 1 Easy, 1 Medium, 1 Hard + Randoms");
    };

    const addTestCase = () => setCurrentQuestion(prev => ({ ...prev, testCases: [...prev.testCases, { input: '', output: '', hidden: false }] }));
    const removeTestCase = (idx: number) => setCurrentQuestion(prev => ({ ...prev, testCases: prev.testCases.filter((_, i) => i !== idx) }));
    const updateTestCase = (idx: number, field: string, value: string | boolean) => {
        const newCases = [...currentQuestion.testCases];
        newCases[idx] = { ...newCases[idx], [field]: value };
        setCurrentQuestion(prev => ({ ...prev, testCases: newCases }));
    };

    const addQuestionToStaging = () => {
        if (!currentQuestion.title || !currentQuestion.description) return toast.error("Title/Description required");
        setManualQuestions(prev => [...prev, currentQuestion]);
        setCurrentQuestion({ title: '', description: '', inputFormat: '', testCases: [{ input: '', output: '', hidden: false }] });
        toast.success("Added to staging");
    };

    const toggleBankProblem = (id: string) => {
        setSelectedBankProblemIds(prev => {
            if (prev.includes(id)) return prev.filter(p => p !== id);
            if (prev.length >= instanceQuota) {
                toast.warning("Quota reached");
                return prev;
            }
            return [...prev, id];
        });
    };

    const handleBankSync = () => {
        addProblemFromBank(selectedBankProblemIds);
        setSelectedBankProblemIds([]);
    };

    if (!selectedInstanceId) return (
        <Card className="glass border-white/10"><CardContent className="p-12 text-center opacity-40"><ShieldCheck className="mx-auto h-12 w-12 mb-4" /><p>Select a protocol to begin designing questions.</p></CardContent></Card>
    );

    return (
        <Card className={cn(
            "glass overflow-hidden transition-all duration-500",
            dashboardMode === 'exam' ? "border-cyan-500/20" : "border-violet-500/20"
        )}>
            <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="flex items-center gap-2 text-white">
                    {dashboardMode === 'exam' ? <FileText className="h-5 w-5 text-cyan-400" /> : <BrainCircuit className="h-5 w-5 text-violet-400" />}
                    Host Question Designer
                </CardTitle>
                <CardDescription>Assemble coding challenges for this instance.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid grid-cols-3 bg-white/5 border border-white/10 h-11 p-1 overflow-hidden">
                        <TabsTrigger
                            value="manual"
                            className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none uppercase h-full font-bold text-[10px] tracking-widest transition-all duration-300"
                        >
                            Manual
                        </TabsTrigger>
                        <TabsTrigger
                            value="bank"
                            className="data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-400 data-[state=active]:border-b-2 data-[state=active]:border-violet-500 rounded-none uppercase h-full font-bold text-[10px] tracking-widest transition-all duration-300"
                        >
                            Global Bank
                        </TabsTrigger>
                        <TabsTrigger
                            value="library"
                            className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 rounded-none uppercase h-full font-bold text-[10px] tracking-widest transition-all duration-300"
                        >
                            My Registry
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="manual" className="space-y-4">
                        <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="grid gap-2">
                                <Label className="text-slate-400 text-xs uppercase tracking-wider">Title</Label>
                                <Input
                                    value={currentQuestion.title}
                                    onChange={e => setCurrentQuestion({ ...currentQuestion, title: e.target.value })}
                                    className="bg-black/40 border-slate-800"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-slate-400 text-xs uppercase tracking-wider">Description</Label>
                                <Textarea
                                    value={currentQuestion.description}
                                    onChange={e => setCurrentQuestion({ ...currentQuestion, description: e.target.value })}
                                    className="bg-black/40 border-slate-800 h-32"
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label className={cn("text-xs uppercase tracking-wider", dashboardMode === 'exam' ? "text-cyan-400/80" : "text-violet-400/80")}>Test Cases</Label>
                                    <Button size="sm" variant="outline" onClick={addTestCase} className="border-white/10 hover:bg-white/5">
                                        <Plus className="h-3 w-3 mr-1" /> Add
                                    </Button>
                                </div>
                                {currentQuestion.testCases.map((tc: any, idx: number) => (
                                    <div key={idx} className="flex gap-2 bg-black/40 p-3 rounded-lg border border-white/5">
                                        <div className="flex-1 grid gap-2">
                                            <Input placeholder="Input" value={tc.input} onChange={e => updateTestCase(idx, 'input', e.target.value)} className="bg-black/40 border-slate-800" />
                                            <Input placeholder="Output" value={tc.output} onChange={e => updateTestCase(idx, 'output', e.target.value)} className="bg-black/40 border-slate-800" />
                                        </div>
                                        <div className="flex flex-col gap-2"><Button variant="ghost" size="icon" onClick={() => updateTestCase(idx, 'hidden', !tc.hidden)}>{tc.hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button><Button variant="ghost" size="icon" onClick={() => removeTestCase(idx)}><X className="h-4 w-4" /></Button></div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                onClick={addQuestionToStaging}
                                className={cn(
                                    "w-full h-11 text-white font-bold uppercase tracking-widest sheen-btn transition-all active:scale-95 shadow-lg",
                                    dashboardMode === 'exam' ? "bg-gradient-to-r from-cyan-600 to-blue-600 shadow-cyan-900/20" : "bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-violet-900/20"
                                )}
                            >
                                <Plus className="h-4 w-4 mr-2" /> Add to Staging
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="bank" className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                            <div className="space-y-3">
                                <Label className="text-slate-400 text-[10px] uppercase tracking-widest">Select Topics</Label>
                                <div className="flex flex-wrap gap-2">
                                    {getPythonCategories().map((cat: string) => (
                                        <Badge
                                            key={cat}
                                            variant="outline"
                                            onClick={() => toggleCategory(cat)}
                                            className={cn(
                                                "cursor-pointer transition-all px-3 py-1 text-[10px] uppercase tracking-wider font-bold",
                                                selectedBankCategories.includes(cat)
                                                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                                            )}
                                        >
                                            {cat}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-black/20 p-2 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="font-mono text-cyan-400 border-cyan-500/30">
                                        Selection: {selectedBankProblemIds.length} / {instanceQuota}
                                    </Badge>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleSmartRandomize}
                                        disabled={selectedBankCategories.length === 0}
                                        className="h-7 text-[10px] font-bold uppercase border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                                    >
                                        <BrainCircuit className="h-3 w-3 mr-1" /> Smart Randomize
                                    </Button>
                                </div>
                                {selectedBankProblemIds.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedBankProblemIds([])}
                                        className="h-7 text-[10px] uppercase text-red-400 hover:text-red-300"
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>

                            <div className="max-h-60 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                {pythonProblemsData
                                    .filter(p => selectedBankCategories.includes(p.category))
                                    .map((p: any) => (
                                        <div
                                            key={p.id}
                                            onClick={() => toggleBankProblem(p.id)}
                                            className={cn(
                                                "p-3 rounded-lg border cursor-pointer transition-all duration-300",
                                                selectedBankProblemIds.includes(p.id)
                                                    ? "bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                                    : "bg-black/20 border-white/5 hover:border-white/20 hover:bg-white/5"
                                            )}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-200">{p.title}</p>
                                                    <div className="flex gap-2 mt-1">
                                                        <span className={cn(
                                                            "text-[9px] uppercase font-bold tracking-tighter px-1 rounded",
                                                            p.difficulty.toLowerCase() === 'easy' ? "text-green-400 bg-green-400/10" :
                                                                p.difficulty.toLowerCase() === 'medium' ? "text-yellow-400 bg-yellow-400/10" :
                                                                    "text-red-400 bg-red-400/10"
                                                        )}>
                                                            {p.difficulty}
                                                        </span>
                                                        <p className="text-[9px] text-slate-500 uppercase font-mono">{p.visibleTestCases.length + (p.hiddenTestCases?.length || 0)} cases</p>
                                                    </div>
                                                </div>
                                                {selectedBankProblemIds.includes(p.id) && <CheckCircle2 className="h-4 w-4 text-cyan-400" />}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <Button
                                onClick={handleBankSync}
                                disabled={selectedBankProblemIds.length === 0}
                                className="w-full h-11 text-white font-bold uppercase tracking-widest sheen-btn bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-900/20 transition-all active:scale-95"
                            >
                                Sync with Staging
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="library" className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-h-80 overflow-y-auto space-y-2">
                            {questionLibrary.length === 0 ? <p className="text-center italic opacity-40">Empty Registry</p> : questionLibrary.map((q: ManualQuestion, idx: number) => (
                                <div key={idx} className="flex justify-between items-center p-2 rounded bg-black/40 border border-white/5">
                                    <div><p className="text-sm">{q.title}</p><p className="text-[10px] opacity-40">{q.testCases.length} Cases</p></div>
                                    <Button size="sm" variant="ghost" onClick={() => setManualQuestions(prev => [...prev, q])} className="text-cyan-400"><PlusCircle className="h-4 w-4 mr-1" /> Add</Button>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {manualQuestions.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                        <h4 className="flex items-center gap-2 text-sm font-bold"><CheckCircle2 className="h-4 w-4 text-green-500" /> Staging Area ({manualQuestions.length})</h4>
                        <div className="space-y-2">
                            {manualQuestions.map((q: ManualQuestion, idx: number) => (
                                <div key={idx} className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/10">
                                    <p className="text-sm">{q.title}</p>
                                    <Button variant="ghost" size="icon" onClick={() => setManualQuestions(prev => prev.filter((_, i) => i !== idx))}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                </div>
                            ))}
                        </div>
                        <Button
                            onClick={onSave}
                            disabled={isProcessing}
                            className={cn(
                                "w-full h-12 text-white font-bold uppercase tracking-[0.2em] sheen-btn transition-all active:scale-95 shadow-xl group",
                                dashboardMode === 'exam' ? "bg-gradient-to-r from-cyan-600 to-blue-600 shadow-cyan-900/20" : "bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-violet-900/20"
                            )}
                        >
                            {isProcessing ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                                    Finalize & Save Registry
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card >
    );
};
