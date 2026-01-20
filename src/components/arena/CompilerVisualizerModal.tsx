import React, { useState, useEffect } from 'react';
import { analyzeCode } from '../../services/geminiService';
import { CompilerAnalysis } from '../../types';
import MermaidChart from './MermaidChart';
import { Button } from '@/components/ui/button';
import {
    X,
    Play,
    Table as TableIcon,
    FileText,
    GitBranch,
    Activity,
    ChevronRight,
    ChevronLeft,
    Repeat,
    Volume2,
    Info,
    Globe,
    Loader2,
    Terminal,
    Cpu,
    ZoomIn,
    ZoomOut,
    Maximize,
    Grab,
    AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface CompilerVisualizerModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialCode: string;
    language: string;
}

const tabs = [
    { name: 'Flowchart', icon: <GitBranch className="w-4 h-4" /> },
    { name: 'ASCII Flow', icon: <FileText className="w-4 h-4" /> },
    { name: 'State Table', icon: <TableIcon className="w-4 h-4" /> },
    { name: 'Logic', icon: <Info className="w-4 h-4" /> },
    { name: 'Animation', icon: <Activity className="w-4 h-4" /> },
    { name: 'Narration', icon: <Volume2 className="w-4 h-4" /> },
];

const CompilerVisualizerModal: React.FC<CompilerVisualizerModalProps> = ({
    isOpen,
    onClose,
    initialCode,
    language
}) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<CompilerAnalysis | null>(null);
    const [activeTab, setActiveTab] = useState('Flowchart');

    // Animation states
    const [animationStep, setAnimationStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1000);
    const [zoomLevel, setZoomLevel] = useState(1.2);
    const [cooldown, setCooldown] = useState(0);

    const isMounted = React.useRef(false);
    const hasAutoAnalyzed = React.useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    useEffect(() => {
        const shouldAnalyze = isOpen && initialCode && !hasAutoAnalyzed.current;

        if (shouldAnalyze) {
            hasAutoAnalyzed.current = true; // LOCK IMMEDIATELY
            handleAnalyze();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, initialCode]);

    useEffect(() => {
        if (!isOpen) {
            hasAutoAnalyzed.current = false;
            setAnalysis(null);
            setCooldown(0);
        }
    }, [isOpen]);

    const handleAnalyze = async () => {
        if (loading || cooldown > 0) return;
        setLoading(true);
        try {
            const result = await analyzeCode(initialCode, language, input);

            if (isMounted.current) {
                setAnalysis(result);
                setAnimationStep(0);
                setCooldown(10);
            }
        } catch (error: any) {
            console.error("Analysis failed:", error);

            if (isMounted.current) {

                if (error.message?.includes('Rate limit') || error.message?.includes('429')) {
                    toast.error("Rate limit reached. Please wait 30 seconds.", {
                        icon: <AlertCircle className="w-4 h-4 text-rose-500" />,
                        duration: 5000
                    });
                    setCooldown(30);
                } else {
                    toast.error(error.message || "Synthesis failed. Please wait 15s.");
                    setCooldown(15);
                }
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    };

    // Cooldown timer effect
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setInterval(() => {
                setCooldown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [cooldown]);

    useEffect(() => {
        let timer: any;
        if (isPlaying && analysis && animationStep < (analysis.animationData?.highlightSequence?.length || 0) - 1) {
            timer = setTimeout(() => {
                setAnimationStep(prev => prev + 1);
            }, playbackSpeed);
        } else if (animationStep >= (analysis?.animationData?.highlightSequence?.length || 0) - 1) {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, animationStep, analysis, playbackSpeed]);

    if (!isOpen) return null;

    const renderTabContent = () => {
        if (!analysis) return null;

        switch (activeTab) {
            case 'ASCII Flow':
                return (
                    <div className="bg-[#030712] p-8 rounded-2xl h-full overflow-auto border border-slate-800/50 font-mono text-sm shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] group">
                        <pre className="text-emerald-400/90 leading-relaxed drop-shadow-[0_0_8px_rgba(52,211,153,0.2)] group-hover:text-emerald-400 transition-colors duration-500">{analysis.asciiFlow}</pre>
                    </div>
                );
            case 'State Table':
                return (
                    <ScrollArea className="h-full bg-[#030712]/50 rounded-2xl border border-slate-800/50 backdrop-blur-sm shadow-2xl">
                        <div className="p-6">
                            <table className="w-full text-left text-sm border-separate border-spacing-0">
                                <thead className="sticky top-0 bg-[#0B1121]/90 backdrop-blur-md text-slate-400 z-10">
                                    <tr>
                                        <th className="p-4 border-b border-slate-800/50 font-bold uppercase tracking-widest text-[10px] first:rounded-tl-xl">Step</th>
                                        <th className="p-4 border-b border-slate-800/50 font-bold uppercase tracking-widest text-[10px]">Line</th>
                                        <th className="p-4 border-b border-slate-800/50 font-bold uppercase tracking-widest text-[10px]">Variables</th>
                                        <th className="p-4 border-b border-slate-800/50 font-bold uppercase tracking-widest text-[10px] last:rounded-tr-xl">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/30">
                                    {analysis.stateTable.map((s, i) => (
                                        <tr key={i} className="hover:bg-indigo-500/5 group/row transition-all duration-300">
                                            <td className="p-4 text-cyan-400 font-bold font-mono text-xs">{s.step.toString().padStart(2, '0')}</td>
                                            <td className="p-4 text-slate-500 font-mono text-xs max-w-[200px] truncate">{s.line}</td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {s.variables.map((v, idx) => (
                                                        <span key={idx} className="bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800/50 text-[10px] flex items-center gap-2 group-hover/row:border-cyan-500/30 transition-colors">
                                                            <b className="text-slate-500 uppercase tracking-tighter">{v.name}</b>
                                                            <span className="text-cyan-400 font-mono">{v.value}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-400 text-xs italic leading-relaxed group-hover/row:text-slate-200 transition-colors">{s.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollArea>
                );
            case 'Logic':
                return (
                    <div className="bg-[#030712]/50 p-10 rounded-2xl h-full overflow-auto border border-slate-800/50 text-slate-300 leading-relaxed space-y-8 shadow-2xl backdrop-blur-md">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-3 text-white tracking-tight">
                                <Info className="w-5 h-5 text-cyan-400" />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 uppercase tracking-widest text-sm">Interpretive Analysis</span>
                            </h3>
                            <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 whitespace-pre-wrap text-[14px] font-medium leading-relaxed text-slate-400 border-l-4 border-l-indigo-500/50 shadow-inner">
                                {analysis.executionLogic}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-900/20 to-cyan-900/10 p-8 rounded-3xl border border-indigo-500/20 flex gap-6 items-start shadow-[0_0_30px_rgba(79,70,229,0.05)] transition-all hover:shadow-[0_0_40px_rgba(79,70,229,0.1)] group/analogy">
                            <div className="bg-indigo-600/10 p-4 rounded-2xl border border-indigo-500/30 shadow-xl group-hover/analogy:scale-110 transition-transform duration-500">
                                <Globe className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-indigo-200 text-md tracking-tight uppercase tracking-widest text-xs">Mental Model Mapping</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium group-hover:text-slate-400 transition-colors">
                                    Our neural engine has mapped this logic to a real-world scenario to help your pattern recognition. This process mimics how expert developers internalize complex systems.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case 'Flowchart':
                return (
                    <div className="h-full bg-[#030712]/50 rounded-2xl relative group shadow-2xl backdrop-blur-md border border-slate-800/50 overflow-hidden">
                        {/* Zoom Toolbar */}
                        <div className="absolute top-6 right-6 z-30 flex items-center gap-1 bg-[#0B1121]/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/50 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 3))}
                                className="h-8 w-8 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg"
                                title="Zoom In"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.5))}
                                className="h-8 w-8 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg"
                                title="Zoom Out"
                            >
                                <ZoomOut className="w-4 h-4" />
                            </Button>
                            <div className="w-px h-4 bg-slate-700/50 mx-1" />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setZoomLevel(1.2)}
                                className="h-8 w-8 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg"
                                title="Reset Zoom"
                            >
                                <Maximize className="w-4 h-4" />
                            </Button>
                            <div className="px-2 text-[10px] font-mono font-bold text-cyan-500/70 min-w-[40px] text-center">
                                {Math.round(zoomLevel * 100)}%
                            </div>
                        </div>

                        {/* Chart Viewport */}
                        <div className="w-full h-full overflow-auto cursor-grab active:cursor-grabbing custom-scrollbar p-8">
                            <div
                                className="min-w-full min-h-full flex items-center justify-center transition-transform duration-300 ease-out origin-center"
                                style={{ transform: `scale(${zoomLevel})` }}
                            >
                                <MermaidChart chart={analysis.mermaidChart} id="compiler-flow" />
                            </div>
                        </div>

                        {/* Helpful Hint */}
                        <div className="absolute bottom-6 left-6 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex items-center gap-3 bg-[#0B1121]/40 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-800/50">
                                <Grab className="w-3 h-3 text-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Scroll to explore matrix</span>
                            </div>
                        </div>
                    </div>
                );
            case 'Animation':
                const currentHighlight = analysis.animationData.highlightSequence[animationStep];
                return (
                    <div className="bg-[#030712]/50 p-8 rounded-2xl h-full flex flex-col items-center border border-slate-800/50 relative shadow-2xl overflow-hidden backdrop-blur-md">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

                        <div className="flex-grow w-full flex items-center justify-center relative min-h-[300px]">
                            <svg width="100%" height="100%" viewBox="0 0 400 300" className="max-w-md filter drop-shadow-[0_0_20px_rgba(79,70,229,0.1)]">
                                {analysis.animationData.nodes.map((node, i) => {
                                    const x = 50 + (i % 3) * 150;
                                    const y = 50 + Math.floor(i / 3) * 100;
                                    const isActive = currentHighlight?.nodeId === node.id;
                                    return (
                                        <g key={node.id} className="cursor-default">
                                            <rect
                                                x={x - 55} y={y - 28} width="110" height="56" rx="14"
                                                className={cn(
                                                    "transition-all duration-500 stroke-2",
                                                    isActive
                                                        ? "fill-indigo-600/90 stroke-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                                                        : "fill-slate-900/80 stroke-slate-800"
                                                )}
                                            />
                                            <text x={x} y={y} textAnchor="middle" fill={isActive ? "white" : "#475569"} className="text-[9px] font-bold tracking-widest pointer-events-none transition-colors duration-300">
                                                {node.label.toUpperCase()}
                                            </text>
                                            {isActive && currentHighlight.value !== undefined && (
                                                <g className="animate-in fade-in zoom-in duration-500">
                                                    <rect x={x - 35} y={y + 35} width="70" height="20" rx="6" className="fill-emerald-500/10 stroke-emerald-500/30 backdrop-blur-xl" />
                                                    <text x={x} y={y + 48} textAnchor="middle" fill="#10b981" className="text-[9px] font-mono font-bold tracking-wider">
                                                        {JSON.stringify(currentHighlight.value)}
                                                    </text>
                                                </g>
                                            )}
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>

                        <div className="w-full max-w-2xl flex items-center gap-6 bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-xl shadow-2xl">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
                                    onClick={() => setAnimationStep(Math.max(0, animationStep - 1))}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>
                                <Button
                                    variant="default"
                                    className="bg-cyan-500 hover:bg-cyan-400 text-black rounded-full h-11 w-11 p-0 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-90"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                >
                                    {isPlaying ? <div className="w-4 h-4 bg-black rounded-sm" /> : <Play className="w-4 h-4 fill-black ml-1" />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
                                    onClick={() => setAnimationStep(Math.min((analysis.animationData.highlightSequence.length || 1) - 1, animationStep + 1))}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                                <div className="w-px h-6 bg-slate-800/50 mx-2" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
                                    onClick={() => { setAnimationStep(0); setIsPlaying(false); }}
                                >
                                    <Repeat className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="flex-grow">
                                <div className="flex justify-between mb-2 px-1">
                                    <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Temporal Frequency</span>
                                    <span className="text-[8px] font-mono text-cyan-500/60">{(playbackSpeed / 1000).toFixed(1)}s</span>
                                </div>
                                <input
                                    type="range" min="100" max="2000" step="100"
                                    value={2100 - playbackSpeed}
                                    onChange={(e) => setPlaybackSpeed(2100 - Number(e.target.value))}
                                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500/80"
                                />
                            </div>

                            <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800/50 font-mono text-[10px] text-slate-400 shadow-inner">
                                <span className="text-cyan-500 font-bold tracking-tighter">{animationStep + 1}</span>
                                <span className="mx-2 text-slate-700">/</span>
                                <span className="text-slate-600 font-medium">{analysis.animationData.highlightSequence.length}</span>
                            </div>
                        </div>
                    </div>
                );
            case 'Narration':
                return (
                    <ScrollArea className="h-full bg-[#030712]/50 rounded-2xl border border-slate-800/50 shadow-2xl backdrop-blur-md">
                        <div className="p-8 pb-32 space-y-4">
                            {analysis.narration.map((step, i) => (
                                <div key={i} className="flex gap-6 p-6 bg-slate-900/20 rounded-2xl items-start border border-slate-800 hover:border-cyan-500/20 transition-all duration-300 group">
                                    <div className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-xl font-bold text-[9px] shrink-0 mt-1 shadow-inner group-hover:bg-indigo-600/20 group-hover:text-indigo-300 transition-colors tracking-widest">
                                        STEP-{(i + 1).toString().padStart(2, '0')}
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-200 transition-colors">{step}</p>
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none rounded-b-2xl"></div>
                    </ScrollArea>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 lg:p-12 animate-in fade-in duration-500">
            {/* Backdrop with Blur */}
            <div className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md" onClick={onClose} />

            {/* Modal Container: 80% Sizing */}
            <div
                className="relative w-full h-full max-w-[95%] max-h-[90%] lg:max-w-[85%] lg:max-h-[85%] bg-[#030712]/98 border border-slate-800/50 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 z-10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Ambient Background Accents */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                {/* Header */}
                <div className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 bg-[#030712]/80 backdrop-blur-xl z-20">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-cyan-600/20 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.1)] group transition-all duration-500 hover:rotate-12 hover:scale-110">
                            <Cpu className="w-5 h-5 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <div className="space-y-0.5">
                            <h2 className="text-sm font-black text-white tracking-[0.2em] uppercase">Neural Lens</h2>
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                                <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Logic Engine • {language}</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-10 w-10 text-slate-500 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Main Layout */}
                <div className="flex-1 flex flex-col p-8 gap-8 overflow-hidden z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-0">

                        {/* Controller Section */}
                        <div className="lg:col-span-4 flex flex-col gap-6 min-h-0">
                            <div className="bg-[#0B1121]/40 p-8 rounded-[2.5rem] border border-slate-800/50 shadow-2xl flex flex-col h-full min-h-0 backdrop-blur-md relative group transition-all duration-500 hover:border-indigo-500/20">
                                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>

                                <div className="space-y-8 flex-1 overflow-auto pr-2 custom-scrollbar">
                                    {/* Code Insight */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3 px-1">
                                            <label className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Source Matrix</label>
                                            <div className="text-[9px] font-mono text-cyan-500/50 tracking-tighter">RO_ACCESS</div>
                                        </div>
                                        <div className="bg-slate-950/80 rounded-2xl border border-slate-800/80 p-5 max-h-[250px] overflow-auto custom-scrollbar shadow-inner relative">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20"></div>
                                            <pre className="font-mono text-[11px] text-emerald-400/70 leading-relaxed italic">{initialCode}</pre>
                                        </div>
                                    </div>

                                    {/* Dynamic Parameters */}
                                    <div>
                                        <label className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-3 block px-1">Runtime Injector</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder="Specify input vector..."
                                                className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-5 py-4 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-700 font-medium"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-4 bg-slate-800 rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Sync Action */}
                                    <Button
                                        onClick={handleAnalyze}
                                        disabled={loading || cooldown > 0}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:from-slate-800 disabled:to-slate-900 h-14 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.2)] border border-indigo-400/20 transition-all active:scale-95 text-[10px] font-black uppercase tracking-[0.25em] gap-3 text-white"
                                    >
                                        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Play className="w-4 h-4 fill-current" />}
                                        {loading ? 'Synthesizing Matrix...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Refresh Visualization'}
                                    </Button>

                                    {/* Terminal Trace */}
                                    {analysis && (
                                        <div className="animate-in slide-in-from-bottom-4 duration-700 pt-2 px-1">
                                            <div className="flex items-center justify-between mb-3 text-indigo-400 font-black uppercase tracking-[0.2em] text-[9px]">
                                                <div className="flex items-center gap-2">
                                                    <Terminal className="w-3 h-3" />
                                                    <span>Predicted Vector Output</span>
                                                </div>
                                                <span className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                                            </div>
                                            <div className="bg-slate-950/90 p-5 rounded-2xl border border-indigo-500/10 font-mono text-emerald-400/90 text-xs overflow-auto max-h-40 min-h-[100px] custom-scrollbar shadow-2xl backdrop-blur-xl">
                                                {analysis.output ? analysis.output : <span className="text-slate-800 italic uppercase italic tracking-widest text-[10px]">No sequence detected in buffer.</span>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Matrix Viewport Section */}
                        <div className="lg:col-span-8 flex flex-col min-h-0">
                            <div className="bg-[#0B1121]/40 p-1 rounded-[2.5rem] border border-slate-800/50 shadow-2xl h-full flex flex-col min-h-0 backdrop-blur-md overflow-hidden">

                                {/* Navigation Bar */}
                                <div className="flex flex-wrap gap-2 p-6 pb-2 border-b border-slate-800/30">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.name}
                                            onClick={() => setActiveTab(tab.name)}
                                            className={cn(
                                                "flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black tracking-[0.15em] uppercase transition-all duration-300 border border-transparent",
                                                activeTab === tab.name
                                                    ? "bg-indigo-600/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_20px_rgba(79,70,229,0.05)]"
                                                    : "text-slate-600 hover:text-slate-400 hover:bg-slate-800/30"
                                            )}
                                        >
                                            <span className={cn("transition-transform duration-500", activeTab === tab.name && "scale-110")}>{tab.icon}</span>
                                            {tab.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Main Display Buffer */}
                                <div className="flex-1 relative min-h-0 p-8 pt-6">
                                    {!analysis && !loading && (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-700 gap-6 opacity-30 animate-pulse">
                                            <div className="h-24 w-24 rounded-3xl bg-slate-800/50 flex items-center justify-center border-2 border-slate-700 p-6">
                                                <Cpu className="w-16 h-16" />
                                            </div>
                                            <p className="font-black tracking-[0.3em] uppercase text-xs">Waiting for Neural Uplink</p>
                                        </div>
                                    )}

                                    {loading && (
                                        <div className="h-full flex flex-col items-center justify-center gap-8">
                                            <div className="relative w-40 h-40">
                                                <div className="absolute inset-0 rounded-full border-2 border-indigo-600/5 scale-150 animate-ping"></div>
                                                <div className="absolute inset-0 rounded-full border-4 border-indigo-600/10 scale-125"></div>
                                                <div className="absolute inset-0 rounded-full border-4 border-indigo-600/20"></div>
                                                <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
                                                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                                                    <Loader2 className="w-12 h-12 text-cyan-500 animate-spin-slow" />
                                                </div>
                                            </div>
                                            <div className="text-center space-y-3">
                                                <p className="text-white font-black text-xl tracking-[0.3em] uppercase animate-in fade-in slide-in-from-bottom duration-1000">Synthesizing Logic</p>
                                                <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] max-w-[300px] leading-relaxed">Decomposing algorithmic state space into human-readable sequence...</p>
                                            </div>
                                        </div>
                                    )}

                                    {!loading && analysis && renderTabContent()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompilerVisualizerModal;
