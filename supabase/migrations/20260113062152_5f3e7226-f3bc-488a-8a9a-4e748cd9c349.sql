-- 1. Create admins table
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    admin_code TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create exam_instance_status enum type
DO $$ BEGIN
    CREATE TYPE exam_instance_status AS ENUM ('scheduled', 'active', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Create exam_instances table
CREATE TABLE IF NOT EXISTS public.exam_instances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_admin_id UUID REFERENCES public.admins(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER NOT NULL,
    max_students INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    score_per_question INTEGER NOT NULL,
    status exam_instance_status DEFAULT 'scheduled',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create exam_questions table
CREATE TABLE IF NOT EXISTS public.exam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_instance_id UUID REFERENCES public.exam_instances(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    test_cases JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Enable RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;

-- 6. Basic RLS policies for admins table
CREATE POLICY "Admins can view their own record"
ON public.admins FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Super admins can manage all admins"
ON public.admins FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

-- 7. RLS policies for exam_instances
CREATE POLICY "Admins can view all exam instances"
ON public.exam_instances FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.admins 
        WHERE user_id = auth.uid() AND is_active = true
    )
);

CREATE POLICY "Admins can create exam instances"
ON public.exam_instances FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.admins 
        WHERE id = host_admin_id AND user_id = auth.uid() AND is_active = true
    )
);

CREATE POLICY "Admins can update their own exam instances"
ON public.exam_instances FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.admins 
        WHERE id = host_admin_id AND user_id = auth.uid() AND is_active = true
    )
);

-- 8. RLS policies for exam_questions
CREATE POLICY "Anyone can view exam questions for active exams"
ON public.exam_questions FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.exam_instances 
        WHERE id = exam_instance_id
    )
);

CREATE POLICY "Admins can manage exam questions"
ON public.exam_questions FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.exam_instances ei
        JOIN public.admins a ON ei.host_admin_id = a.id
        WHERE ei.id = exam_instance_id AND a.user_id = auth.uid() AND a.is_active = true
    )
);