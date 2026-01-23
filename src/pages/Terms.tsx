import { Navbar } from '@/components/layout/Navbar';
import { FileText, Shield, User, Copyright, MessageSquare, AlertTriangle, XCircle, Globe, RefreshCcw, Mail } from 'lucide-react';

export default function Terms() {
    const sections = [
        {
            id: "use-of-service",
            icon: <Globe className="h-6 w-6 text-cyan-400" />,
            title: "1. Use of the Service",
            content: "DSArena provides a platform for practicing Data Structures and Algorithms. You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the platform."
        },
        {
            id: "user-accounts",
            icon: <User className="h-6 w-6 text-purple-400" />,
            title: "2. User Accounts",
            content: "To access certain features, you must sign in via Google OAuth.",
            list: [
                "You are responsible for maintaining the confidentiality of your account information.",
                "You agree to provide accurate and complete information.",
                "We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity."
            ]
        },
        {
            id: "intellectual-property",
            icon: <Copyright className="h-6 w-6 text-blue-400" />,
            title: "3. Intellectual Property",
            content: "All content, features, and functionality on DSArena—including text, graphics, logos, and code challenges—are the exclusive property of DSArena and its licensors. You may not reproduce, distribute, or create derivative works from our content without express written permission."
        },
        {
            id: "user-content",
            icon: <MessageSquare className="h-6 w-6 text-emerald-400" />,
            title: "4. User-Generated Content",
            content: "When you submit code or solutions on DSArena:",
            list: [
                "You retain ownership of your code.",
                "You grant DSArena a non-exclusive, royalty-free license to store, execute, and analyze your code to facilitate the platform's features and your progress tracking."
            ]
        },
        {
            id: "prohibited-activities",
            icon: <AlertTriangle className="h-6 w-6 text-amber-400" />,
            title: "5. Prohibited Activities (Code of Conduct)",
            content: "Users are strictly prohibited from:",
            list: [
                "Attempting to bypass security measures or reverse-engineer the platform.",
                "Using automated systems (bots, scrapers) to access the service without permission.",
                "Submitting malicious code or content that contains viruses."
            ]
        },
        {
            id: "liability",
            icon: <XCircle className="h-6 w-6 text-rose-400" />,
            title: "6. Disclaimers & Limitation of Liability",
            content: "DSArena is provided on an \"AS IS\" and \"AS AVAILABLE\" basis.",
            list: [
                "We do not guarantee that the service will be uninterrupted or error-free.",
                "To the maximum extent permitted by law, DSArena shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform."
            ]
        },
        {
            id: "termination",
            icon: <Shield className="h-6 w-6 text-indigo-400" />,
            title: "7. Termination",
            content: "We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason, including if you breach these Terms and Conditions."
        },
        {
            id: "governing-law",
            icon: <FileText className="h-6 w-6 text-slate-400" />,
            title: "8. Governing Law",
            content: "These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions."
        },
        {
            id: "changes",
            icon: <RefreshCcw className="h-6 w-6 text-cyan-400" />,
            title: "9. Changes to Terms",
            content: "We reserve the right to modify these terms at any time. We will notify users of any changes by updating the \"Last Updated\" date at the top of this page. Continued use of the service after changes constitutes acceptance of the new terms."
        },
        {
            id: "contact",
            icon: <Mail className="h-6 w-6 text-cyan-400" />,
            title: "10. Contact Information",
            content: "If you have any questions about these Terms, please contact us at:",
            list: [
                "Email: codewithdsarena@gmail.com",
                "Website: https://dsarena.in/"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#030712] text-slate-100 font-display selection:bg-cyan-500/30">
            <Navbar />

            <main className="relative pt-32 pb-20 px-6 max-w-4xl mx-auto">
                {/* Background Grids & Orbs */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
                    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="terms-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#terms-grid)" />
                    </svg>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative z-10 space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-space font-bold tracking-tighter text-white">
                            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">Conditions.</span>
                        </h1>
                        <p className="text-slate-400 text-sm font-mono tracking-widest uppercase">
                            LAST UPDATED: JANUARY 23, 2026
                        </p>
                    </div>

                    {/* Intro */}
                    <div className="text-center p-6 md:p-8 space-y-4">
                        <p className="text-slate-300 leading-relaxed">
                            "Welcome to DSArena. By accessing or using our platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services."
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="grid grid-cols-1 gap-6">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 transition-all hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                                        {section.icon}
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <h2 className="text-xl font-space font-bold text-white tracking-tight">
                                            {section.title}
                                        </h2>
                                        <div className="space-y-3">
                                            <p className="text-slate-400 leading-relaxed">
                                                {section.content}
                                            </p>
                                            {section.list && (
                                                <ul className="space-y-2">
                                                    {section.list.map((item, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-slate-400 text-sm">
                                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Meta */}
                    <div className="text-center pt-8 border-t border-white/5">
                        <div className="inline-flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                            <FileText className="h-3 w-3" />
                            DOCUMENT_ID: DSA-TC-2026-01
                            <span className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse ml-2" />
                            STATUS: ACTIVE_LEGALLY_BINDING
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
