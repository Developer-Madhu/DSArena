import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 bg-destructive/10 rounded-2xl flex items-center justify-center mb-6 border border-destructive/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                        <AlertTriangle className="h-10 w-10 text-destructive" />
                    </div>
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-2">Neural Link Interrupted</h2>
                    <p className="text-white/40 font-mono text-xs tracking-widest uppercase mb-8 max-w-md mx-auto">
                        A critical core exception has occurred. The command sequence was terminated to prevent data corruption.
                    </p>

                    <div className="flex gap-4">
                        <Button
                            onClick={this.handleReset}
                            variant="destructive"
                            className="font-black uppercase tracking-widest text-[10px] h-10 px-6 italic"
                        >
                            <RefreshCcw className="mr-2 h-4 w-4" /> Try again
                        </Button>
                        <Button
                            onClick={() => window.location.href = '/'}
                            variant="outline"
                            className="border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] h-10 px-6 font-black italic"
                        >
                            <Home className="mr-2 h-4 w-4" /> Home
                        </Button>
                    </div>

                    {/* <div className="mt-8 p-4 bg-black/50 border border-white/5 rounded text-left max-w-2xl overflow-auto">
                        <p className="text-rose-500 font-mono text-[10px] uppercase mb-2">Stack Trace Log:</p>
                        <pre className="text-[10px] text-white/20 font-mono leading-relaxed whitespace-pre-wrap">
                            {this.state.error?.message}
                            {this.state.error?.stack}
                        </pre>
                    </div> */}
                </div>
            );
        }

        return this.props.children;
    }
}
