-- Create exam status enum
CREATE TYPE public.exam_status AS ENUM ('in_progress', 'completed', 'abandoned', 'disqualified');

-- Create exam_sessions table
CREATE TABLE public.exam_sessions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    language TEXT NOT NULL,
    status public.exam_status NOT NULL DEFAULT 'in_progress',
    hearts_remaining INTEGER NOT NULL DEFAULT 3,
    total_violations INTEGER NOT NULL DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE,
    time_limit_seconds INTEGER NOT NULL DEFAULT 10800, -- 3 hours
    time_spent_seconds INTEGER DEFAULT 0,
    question_ids TEXT[] NOT NULL,
    current_question_index INTEGER DEFAULT 0,
    auto_submitted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exam_answers table
CREATE TABLE public.exam_answers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_session_id UUID NOT NULL REFERENCES public.exam_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    question_id TEXT NOT NULL,
    question_index INTEGER NOT NULL,
    code TEXT NOT NULL DEFAULT '',
    is_correct BOOLEAN DEFAULT false,
    tests_passed INTEGER DEFAULT 0,
    tests_total INTEGER DEFAULT 0,
    compilation_errors INTEGER DEFAULT 0,
    runtime_errors INTEGER DEFAULT 0,
    time_spent_seconds INTEGER DEFAULT 0,
    submitted_at TIMESTAMP WITH TIME ZONE,
    last_run_at TIMESTAMP WITH TIME ZONE,
    run_count INTEGER DEFAULT 0,
    error_messages TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exam_results table for post-exam analysis
CREATE TABLE public.exam_results (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_session_id UUID NOT NULL REFERENCES public.exam_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    total_score INTEGER DEFAULT 0,
    max_score INTEGER DEFAULT 0,
    questions_correct INTEGER DEFAULT 0,
    questions_total INTEGER DEFAULT 0,
    total_compilation_errors INTEGER DEFAULT 0,
    total_runtime_errors INTEGER DEFAULT 0,
    avg_time_per_question_seconds INTEGER DEFAULT 0,
    weak_concepts TEXT[],
    improvement_suggestions TEXT[],
    detailed_analysis TEXT,
    ai_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exam_violations table to track individual violations
CREATE TABLE public.exam_violations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_session_id UUID NOT NULL REFERENCES public.exam_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    violation_type TEXT NOT NULL, -- 'tab_switch', 'window_blur', 'fullscreen_exit', 'copy', 'paste', 'right_click'
    hearts_before INTEGER NOT NULL,
    hearts_after INTEGER NOT NULL,
    occurred_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_violations ENABLE ROW LEVEL SECURITY;

-- RLS policies for exam_sessions
CREATE POLICY "Users can view own exam sessions"
ON public.exam_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exam sessions"
ON public.exam_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exam sessions"
ON public.exam_sessions FOR UPDATE
USING (auth.uid() = user_id);

-- RLS policies for exam_answers
CREATE POLICY "Users can view own exam answers"
ON public.exam_answers FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exam answers"
ON public.exam_answers FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exam answers"
ON public.exam_answers FOR UPDATE
USING (auth.uid() = user_id);

-- RLS policies for exam_results
CREATE POLICY "Users can view own exam results"
ON public.exam_results FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exam results"
ON public.exam_results FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS policies for exam_violations
CREATE POLICY "Users can view own violations"
ON public.exam_violations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own violations"
ON public.exam_violations FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_exam_sessions_user_id ON public.exam_sessions(user_id);
CREATE INDEX idx_exam_sessions_status ON public.exam_sessions(status);
CREATE INDEX idx_exam_answers_session_id ON public.exam_answers(exam_session_id);
CREATE INDEX idx_exam_results_session_id ON public.exam_results(exam_session_id);
CREATE INDEX idx_exam_violations_session_id ON public.exam_violations(exam_session_id);

-- Enable realtime for exam tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.exam_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.exam_answers;