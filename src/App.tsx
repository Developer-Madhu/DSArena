import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PersonalizedAssistant } from "@/components/assistant/PersonalizedAssistant";
import React, { lazy, Suspense } from "react";
import { GlobalErrorBoundary } from "@/components/common/GlobalErrorBoundary";
import { Loader2 } from "lucide-react";

// Lazy loaded page components
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Problems = lazy(() => import("./pages/Problems"));
const ProblemDetail = lazy(() => import("./pages/ProblemDetail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const PythonTrack = lazy(() => import("./pages/PythonTrack"));
const LearningTracks = lazy(() => import("./pages/LearningTracks"));
const LanguageTrackPage = lazy(() => import("./pages/LanguageTrackPage"));
const DailyChallenge = lazy(() => import("./pages/DailyChallenge"));
const PracticeProblemsIndex = lazy(() => import("./pages/PracticeProblemsIndex"));
const PracticeProblems = lazy(() => import("./pages/PracticeProblems"));
const Videos = lazy(() => import("./pages/Videos"));
const Exam = lazy(() => import("./pages/Exam"));
const ExamAdmin = lazy(() => import("./features/admin/components/ExamAdmin"));
const HostDashboard = lazy(() => import("./features/host/components/HostDashboard"));
const MasterAdminDashboard = lazy(() => import("./features/admin/components/MasterAdminDashboard"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-[#030712] flex items-center justify-center">
    <Loader2 className="h-8 w-8 text-primary animate-spin" />
  </div>
);
const App = () => (
  <GlobalErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/problems" element={<ProtectedRoute><Problems /></ProtectedRoute>} />
                <Route path="/python-track" element={<ProtectedRoute><PythonTrack /></ProtectedRoute>} />
                <Route path="/track/:slug" element={<ProtectedRoute><LanguageTrackPage /></ProtectedRoute>} />
                <Route path="/learning-tracks" element={<ProtectedRoute><LearningTracks /></ProtectedRoute>} />
                <Route path="/problem/:slug" element={<ProtectedRoute><ProblemDetail /></ProtectedRoute>} />
                <Route path="/daily-challenge" element={<ProtectedRoute><DailyChallenge /></ProtectedRoute>} />
                <Route path="/practice-problems" element={<ProtectedRoute><PracticeProblemsIndex /></ProtectedRoute>} />
                <Route path="/practice-problems/:slug" element={<ProtectedRoute><PracticeProblems /></ProtectedRoute>} />
                <Route path="/videos" element={<ProtectedRoute><Videos /></ProtectedRoute>} />
                <Route path="/exam" element={<ProtectedRoute><Exam /></ProtectedRoute>} />
                <Route path="/exam-admin" element={<ProtectedRoute><ExamAdmin /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><ExamAdmin /></ProtectedRoute>} />
                <Route path="/admin/host" element={<ProtectedRoute><HostDashboard /></ProtectedRoute>} />
                <Route path="/admin/master" element={<ProtectedRoute><MasterAdminDashboard /></ProtectedRoute>} />
                <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </GlobalErrorBoundary>
);

export default App;