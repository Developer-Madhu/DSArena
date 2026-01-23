import { Navbar } from '@/components/layout/Navbar';
import { Shield, Mail, Lock, UserCheck, Share2, Database, History, RefreshCw, FileText } from 'lucide-react';

export default function Privacy() {
    const sections = [
        {
            id: "data-accessed",
            icon: <UserCheck className="h-6 w-6 text-cyan-400" />,
            title: "1. Data Accessed (Information We Collect)",
            content: "When you sign in to DSArena using your Google Account, we access the following specific information:",
            list: [
                "Email Address: To uniquely identify your account and communicate important updates.",
                "Basic Profile Information: Your name and profile picture to personalize your dashboard and coding profile."
            ]
        },
        {
            id: "data-usage",
            icon: <RefreshCw className="h-6 w-6 text-purple-400" />,
            title: "2. Data Usage (How We Use Your Information)",
            content: "We use the data accessed from Google APIs solely to provide and improve our services, including:",
            list: [
                "Creating and managing your user account.",
                "Tracking your progress on coding challenges and algorithm problems.",
                "Providing a personalized experience within the DSArena platform.",
                "Internal Use Only: We do not use your data for advertising or marketing purposes."
            ]
        },
        {
            id: "data-sharing",
            icon: <Share2 className="h-6 w-6 text-blue-400" />,
            title: "3. Data Sharing",
            content: "DSArena does not sell, trade, or share your Google user data with third parties. Your information is only used within the application to provide the service you requested. If legal requirements arise, we will only disclose information as required by law."
        },
        {
            id: "data-protection",
            icon: <Lock className="h-6 w-6 text-emerald-400" />,
            title: "4. Data Storage & Protection",
            content: "We take the security of your data seriously:",
            list: [
                "Encryption: All data transferred between your browser and our servers is encrypted using Industry-standard SSL/TLS protocols.",
                "Secure Storage: We use secure server environments to prevent unauthorized access, alteration, or disclosure of your personal information."
            ]
        },
        {
            id: "data-retention",
            icon: <History className="h-6 w-6 text-amber-400" />,
            title: "5. Data Retention & Deletion",
            content: "Retention: We retain your data for as long as your account is active to maintain your progress history.",
            subContent: "Deletion: You have the right to delete your account and associated data at any time. You can request data deletion by contacting us at codewithdsarena@gmail.com. Once requested, we will remove all your personal data from our active databases within 30 days."
        },
        {
            id: "google-api",
            icon: <Database className="h-6 w-6 text-rose-400" />,
            title: "6. Google API Limited Use Disclosure",
            content: "DSArena’s use and transfer of information received from Google APIs to any other app will adhere to the Google API Services User Data Policy, including the Limited Use requirements."
        },
        {
            id: "changes",
            icon: <RefreshCw className="h-6 w-6 text-indigo-400" />,
            title: "7. Changes to This Policy",
            content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page."
        },
        {
            id: "contact",
            icon: <Mail className="h-6 w-6 text-cyan-400" />,
            title: "8. Contact Us",
            content: "If you have any questions about this Privacy Policy, please contact us:",
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
                            <pattern id="privacy-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#privacy-grid)" />
                    </svg>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative z-10 space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-space font-bold tracking-tighter text-white">
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">Policy.</span>
                        </h1>
                        <p className="text-slate-400 text-sm font-mono tracking-widest">
                            EFFECTIVE DATE: JANUARY 23, 2026
                        </p>
                    </div>

                    {/* Intro */}
                    <div className="text-center p-6 md:p-8 space-y-4">
                        <p className="text-slate-300 leading-relaxed">
                            "At DSArena, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform to practice Data Structures and Algorithms."
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
                                            {section.subContent && (
                                                <p className="text-slate-400 leading-relaxed">
                                                    {section.subContent}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Warning */}
                    <div className="text-center pt-8">
                        <div className="inline-flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                            <FileText className="h-3 w-3" />
                            DOCUMENT_ID: DSA-PP-2026-01
                            <span className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse ml-2" />
                            STATUS: VERIFIED
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
