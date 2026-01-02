import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PersonalizedAssistant } from "@/components/assistant/PersonalizedAssistant";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PythonTrack from "./pages/PythonTrack";
import LearningTracks from "./pages/LearningTracks";
import LanguageTrackPage from "./pages/LanguageTrackPage";
import DailyChallenge from "./pages/DailyChallenge";
import PracticeProblemsIndex from "./pages/PracticeProblemsIndex";
import PracticeProblems from "./pages/PracticeProblems";
import Videos from "./pages/Videos";
import Exam from "./pages/Exam";
import ExamAdmin from "./pages/ExamAdmin";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" />
        <BrowserRouter>
          <PersonalizedAssistant />
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
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;