import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Mail, MapPin, Globe, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await (supabase as any)
                .from('contact_messages')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                    },
                ]);

            if (error) throw error;

            toast.success('Transmission Received', {
                description: 'Your message has been successfully uplinked to the command center.',
            });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Signal Lost', {
                description: 'Failed to establish connection. Please check your network and retry transmission.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] text-slate-100 font-display selection:bg-cyan-500/30">
            <Navbar />

            <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Background Grids & Orbs */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
                    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#contact-grid)" />
                    </svg>
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-8">
                        <div className="space-y-4">                            
                            <h1 className="text-4xl md:text-6xl font-space font-bold tracking-tighter text-white">
                                Establish <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">Secure Connection.</span>
                            </h1>
                            <p className="text-slate-400 max-w-md leading-relaxed">
                                Need technical intelligence or ready to deploy custom architecture? Our operators are standing by for your transmission.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {/* System Status Panel */}
                            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all hover:bg-white/10 hover:border-cyan-500/30">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Comm Frequency</p>
                                        <p className="text-lg text-white font-medium">support@dsarena.com</p>
                                        <p className="text-sm text-slate-500">Encrypted Transmission line</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Input Form */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 transition-opacity group-hover:opacity-40">
                            <Send className="h-24 w-24 text-cyan-500 -rotate-12" />
                        </div>

                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="operator_name" className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] font-mono">
                                        Enter Name
                                    </label>
                                    <Input
                                        id="operator_name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="Enter identification..."
                                        className="bg-[#030712]/50 border-white/5 focus:border-cyan-500/50 focus:ring-cyan-500/20 text-white placeholder:text-slate-600 h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] font-mono">
                                        Enter Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        placeholder="name@domain.com"
                                        className="bg-[#030712]/50 border-white/5 focus:border-cyan-500/50 focus:ring-cyan-500/20 text-white placeholder:text-slate-600 h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="transmission" className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] font-mono">
                                        Enter Message
                                    </label>
                                    <Textarea
                                        id="transmission"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        placeholder="Message payload encryption pending..."
                                        className="bg-[#030712]/50 border-white/5 focus:border-cyan-500/50 focus:ring-cyan-500/20 text-white placeholder:text-slate-600 min-h-[150px] resize-none"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold tracking-widest uppercase h-14 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Syncing Transmission...
                                    </>
                                ) : (
                                    <>
                                        Establish Uplink
                                        <Send className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>

                            <div className="pt-4 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                <span className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse" />
                                STATUS: ENCRYPTED_CONNECTION_READY
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
