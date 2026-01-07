export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      app_config: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
        }
        Relationships: []
      }
      arena_sessions: {
        Row: {
          attempts_count: number | null
          completed_at: string | null
          created_at: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          hints_used: boolean | null
          id: string
          mode: Database["public"]["Enums"]["arena_mode"]
          problem_id: string | null
          problem_slug: string | null
          rating_after: number | null
          rating_before: number | null
          rating_change: number | null
          result: Database["public"]["Enums"]["arena_result"] | null
          started_at: string | null
          time_limit_seconds: number | null
          time_taken_seconds: number | null
          topic: string
          user_id: string
        }
        Insert: {
          attempts_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          hints_used?: boolean | null
          id?: string
          mode: Database["public"]["Enums"]["arena_mode"]
          problem_id?: string | null
          problem_slug?: string | null
          rating_after?: number | null
          rating_before?: number | null
          rating_change?: number | null
          result?: Database["public"]["Enums"]["arena_result"] | null
          started_at?: string | null
          time_limit_seconds?: number | null
          time_taken_seconds?: number | null
          topic: string
          user_id: string
        }
        Update: {
          attempts_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          hints_used?: boolean | null
          id?: string
          mode?: Database["public"]["Enums"]["arena_mode"]
          problem_id?: string | null
          problem_slug?: string | null
          rating_after?: number | null
          rating_before?: number | null
          rating_change?: number | null
          result?: Database["public"]["Enums"]["arena_result"] | null
          started_at?: string | null
          time_limit_seconds?: number | null
          time_taken_seconds?: number | null
          topic?: string
          user_id?: string
        }
        Relationships: []
      }
      drafts: {
        Row: {
          code: string
          id: string
          problem_id: string
          problem_slug: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          code: string
          id?: string
          problem_id: string
          problem_slug?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          code?: string
          id?: string
          problem_id?: string
          problem_slug?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      exam_answers: {
        Row: {
          code: string
          compilation_errors: number | null
          created_at: string
          error_messages: string[] | null
          exam_session_id: string
          id: string
          is_correct: boolean | null
          last_run_at: string | null
          question_id: string
          question_index: number
          run_count: number | null
          runtime_errors: number | null
          submitted_at: string | null
          tests_passed: number | null
          tests_total: number | null
          time_spent_seconds: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          code?: string
          compilation_errors?: number | null
          created_at?: string
          error_messages?: string[] | null
          exam_session_id: string
          id?: string
          is_correct?: boolean | null
          last_run_at?: string | null
          question_id: string
          question_index: number
          run_count?: number | null
          runtime_errors?: number | null
          submitted_at?: string | null
          tests_passed?: number | null
          tests_total?: number | null
          time_spent_seconds?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          code?: string
          compilation_errors?: number | null
          created_at?: string
          error_messages?: string[] | null
          exam_session_id?: string
          id?: string
          is_correct?: boolean | null
          last_run_at?: string | null
          question_id?: string
          question_index?: number
          run_count?: number | null
          runtime_errors?: number | null
          submitted_at?: string | null
          tests_passed?: number | null
          tests_total?: number | null
          time_spent_seconds?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_answers_exam_session_id_fkey"
            columns: ["exam_session_id"]
            isOneToOne: false
            referencedRelation: "exam_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_eligibility: {
        Row: {
          blocked_at: string | null
          created_at: string | null
          id: string
          is_eligible: boolean | null
          last_exam_passed: boolean | null
          last_exam_session_id: string | null
          unblocked_at: string | null
          unblocked_by: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          blocked_at?: string | null
          created_at?: string | null
          id?: string
          is_eligible?: boolean | null
          last_exam_passed?: boolean | null
          last_exam_session_id?: string | null
          unblocked_at?: string | null
          unblocked_by?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          blocked_at?: string | null
          created_at?: string | null
          id?: string
          is_eligible?: boolean | null
          last_exam_passed?: boolean | null
          last_exam_session_id?: string | null
          unblocked_at?: string | null
          unblocked_by?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_eligibility_last_exam_session_id_fkey"
            columns: ["last_exam_session_id"]
            isOneToOne: false
            referencedRelation: "exam_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_results: {
        Row: {
          ai_feedback: string | null
          avg_time_per_question_seconds: number | null
          created_at: string
          detailed_analysis: string | null
          exam_session_id: string
          id: string
          improvement_suggestions: string[] | null
          max_score: number | null
          questions_correct: number | null
          questions_total: number | null
          total_compilation_errors: number | null
          total_runtime_errors: number | null
          total_score: number | null
          user_id: string
          weak_concepts: string[] | null
        }
        Insert: {
          ai_feedback?: string | null
          avg_time_per_question_seconds?: number | null
          created_at?: string
          detailed_analysis?: string | null
          exam_session_id: string
          id?: string
          improvement_suggestions?: string[] | null
          max_score?: number | null
          questions_correct?: number | null
          questions_total?: number | null
          total_compilation_errors?: number | null
          total_runtime_errors?: number | null
          total_score?: number | null
          user_id: string
          weak_concepts?: string[] | null
        }
        Update: {
          ai_feedback?: string | null
          avg_time_per_question_seconds?: number | null
          created_at?: string
          detailed_analysis?: string | null
          exam_session_id?: string
          id?: string
          improvement_suggestions?: string[] | null
          max_score?: number | null
          questions_correct?: number | null
          questions_total?: number | null
          total_compilation_errors?: number | null
          total_runtime_errors?: number | null
          total_score?: number | null
          user_id?: string
          weak_concepts?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "exam_results_exam_session_id_fkey"
            columns: ["exam_session_id"]
            isOneToOne: false
            referencedRelation: "exam_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_sessions: {
        Row: {
          auto_submitted: boolean | null
          can_retake: boolean | null
          completed_at: string | null
          created_at: string
          current_question_index: number | null
          hearts_remaining: number
          id: string
          language: string
          passed: boolean | null
          question_ids: string[]
          retake_approved_at: string | null
          retake_approved_by: string | null
          started_at: string
          status: Database["public"]["Enums"]["exam_status"]
          time_limit_seconds: number
          time_spent_seconds: number | null
          total_violations: number
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_submitted?: boolean | null
          can_retake?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_question_index?: number | null
          hearts_remaining?: number
          id?: string
          language: string
          passed?: boolean | null
          question_ids: string[]
          retake_approved_at?: string | null
          retake_approved_by?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["exam_status"]
          time_limit_seconds?: number
          time_spent_seconds?: number | null
          total_violations?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_submitted?: boolean | null
          can_retake?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_question_index?: number | null
          hearts_remaining?: number
          id?: string
          language?: string
          passed?: boolean | null
          question_ids?: string[]
          retake_approved_at?: string | null
          retake_approved_by?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["exam_status"]
          time_limit_seconds?: number
          time_spent_seconds?: number | null
          total_violations?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      exam_violations: {
        Row: {
          exam_session_id: string
          hearts_after: number
          hearts_before: number
          id: string
          occurred_at: string
          user_id: string
          violation_type: string
        }
        Insert: {
          exam_session_id: string
          hearts_after: number
          hearts_before: number
          id?: string
          occurred_at?: string
          user_id: string
          violation_type: string
        }
        Update: {
          exam_session_id?: string
          hearts_after?: number
          hearts_before?: number
          id?: string
          occurred_at?: string
          user_id?: string
          violation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_violations_exam_session_id_fkey"
            columns: ["exam_session_id"]
            isOneToOne: false
            referencedRelation: "exam_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard_achievements: {
        Row: {
          earned_at: string | null
          id: string
          tag_icon: string
          tag_name: string
          tag_type: string
          user_id: string
        }
        Insert: {
          earned_at?: string | null
          id?: string
          tag_icon: string
          tag_name: string
          tag_type: string
          user_id: string
        }
        Update: {
          earned_at?: string | null
          id?: string
          tag_icon?: string
          tag_name?: string
          tag_type?: string
          user_id?: string
        }
        Relationships: []
      }
      learning_plan: {
        Row: {
          completed_at: string | null
          created_at: string | null
          display_order: number | null
          failed_attempts: number | null
          id: string
          is_completed: boolean | null
          level: string
          problem_id: string
          problem_title: string
          topic: string | null
          track_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          display_order?: number | null
          failed_attempts?: number | null
          id?: string
          is_completed?: boolean | null
          level: string
          problem_id: string
          problem_title: string
          topic?: string | null
          track_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          display_order?: number | null
          failed_attempts?: number | null
          id?: string
          is_completed?: boolean | null
          level?: string
          problem_id?: string
          problem_title?: string
          topic?: string | null
          track_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      problem_sessions: {
        Row: {
          completed: boolean | null
          created_at: string | null
          duration_seconds: number | null
          ended_at: string | null
          id: string
          problem_id: string | null
          problem_slug: string | null
          started_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          problem_id?: string | null
          problem_slug?: string | null
          started_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          problem_id?: string | null
          problem_slug?: string | null
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "problem_sessions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      problems: {
        Row: {
          acceptance_rate: number | null
          constraints: string | null
          created_at: string | null
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          input_format: string | null
          is_published: boolean | null
          memory_limit_mb: number | null
          output_format: string | null
          slug: string
          starter_code: string | null
          time_limit_ms: number | null
          title: string
          topic_id: string | null
          total_accepted: number | null
          total_submissions: number | null
          updated_at: string | null
        }
        Insert: {
          acceptance_rate?: number | null
          constraints?: string | null
          created_at?: string | null
          description: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          input_format?: string | null
          is_published?: boolean | null
          memory_limit_mb?: number | null
          output_format?: string | null
          slug: string
          starter_code?: string | null
          time_limit_ms?: number | null
          title: string
          topic_id?: string | null
          total_accepted?: number | null
          total_submissions?: number | null
          updated_at?: string | null
        }
        Update: {
          acceptance_rate?: number | null
          constraints?: string | null
          created_at?: string | null
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          input_format?: string | null
          is_published?: boolean | null
          memory_limit_mb?: number | null
          output_format?: string | null
          slug?: string
          starter_code?: string | null
          time_limit_ms?: number | null
          title?: string
          topic_id?: string | null
          total_accepted?: number | null
          total_submissions?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "problems_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          avg_time_per_problem_seconds: number | null
          bio: string | null
          consecutive_fast_solves: number | null
          created_at: string | null
          display_name: string | null
          easy_solved: number | null
          hard_solved: number | null
          id: string
          interview_readiness: number | null
          interview_sessions_completed: number | null
          is_public: boolean | null
          last_activity_date: string | null
          last_fast_solve_at: string | null
          lives: number
          lost_times: Json
          medium_solved: number | null
          streak_days: number | null
          strongest_topic: string | null
          total_arena_sessions: number | null
          total_solved: number | null
          total_time_spent_seconds: number | null
          updated_at: string | null
          username: string | null
          weakest_topic: string | null
        }
        Insert: {
          avatar_url?: string | null
          avg_time_per_problem_seconds?: number | null
          bio?: string | null
          consecutive_fast_solves?: number | null
          created_at?: string | null
          display_name?: string | null
          easy_solved?: number | null
          hard_solved?: number | null
          id: string
          interview_readiness?: number | null
          interview_sessions_completed?: number | null
          is_public?: boolean | null
          last_activity_date?: string | null
          last_fast_solve_at?: string | null
          lives?: number
          lost_times?: Json
          medium_solved?: number | null
          streak_days?: number | null
          strongest_topic?: string | null
          total_arena_sessions?: number | null
          total_solved?: number | null
          total_time_spent_seconds?: number | null
          updated_at?: string | null
          username?: string | null
          weakest_topic?: string | null
        }
        Update: {
          avatar_url?: string | null
          avg_time_per_problem_seconds?: number | null
          bio?: string | null
          consecutive_fast_solves?: number | null
          created_at?: string | null
          display_name?: string | null
          easy_solved?: number | null
          hard_solved?: number | null
          id?: string
          interview_readiness?: number | null
          interview_sessions_completed?: number | null
          is_public?: boolean | null
          last_activity_date?: string | null
          last_fast_solve_at?: string | null
          lives?: number
          lost_times?: Json
          medium_solved?: number | null
          streak_days?: number | null
          strongest_topic?: string | null
          total_arena_sessions?: number | null
          total_solved?: number | null
          total_time_spent_seconds?: number | null
          updated_at?: string | null
          username?: string | null
          weakest_topic?: string | null
        }
        Relationships: []
      }
      question_variants: {
        Row: {
          created_at: string
          description: string
          id: string
          input_format: string
          original_question_id: string
          output_format: string
          title: string
          visible_test_cases: Json
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          input_format: string
          original_question_id: string
          output_format: string
          title: string
          visible_test_cases: Json
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          input_format?: string
          original_question_id?: string
          output_format?: string
          title?: string
          visible_test_cases?: Json
        }
        Relationships: []
      }
      skill_ratings: {
        Row: {
          accuracy: number | null
          avg_time_seconds: number | null
          created_at: string | null
          id: string
          problems_attempted: number
          problems_solved: number
          rating: number
          tier: Database["public"]["Enums"]["skill_tier"]
          topic: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          avg_time_seconds?: number | null
          created_at?: string | null
          id?: string
          problems_attempted?: number
          problems_solved?: number
          rating?: number
          tier?: Database["public"]["Enums"]["skill_tier"]
          topic: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accuracy?: number | null
          avg_time_seconds?: number | null
          created_at?: string | null
          id?: string
          problems_attempted?: number
          problems_solved?: number
          rating?: number
          tier?: Database["public"]["Enums"]["skill_tier"]
          topic?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          code: string
          created_at: string | null
          error_message: string | null
          id: string
          is_accepted: boolean | null
          memory_kb: number | null
          problem_id: string | null
          problem_slug: string | null
          runtime_ms: number | null
          status: Database["public"]["Enums"]["submission_status"] | null
          tests_passed: number | null
          tests_total: number | null
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          is_accepted?: boolean | null
          memory_kb?: number | null
          problem_id?: string | null
          problem_slug?: string | null
          runtime_ms?: number | null
          status?: Database["public"]["Enums"]["submission_status"] | null
          tests_passed?: number | null
          tests_total?: number | null
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          is_accepted?: boolean | null
          memory_kb?: number | null
          problem_id?: string | null
          problem_slug?: string | null
          runtime_ms?: number | null
          status?: Database["public"]["Enums"]["submission_status"] | null
          tests_passed?: number | null
          tests_total?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      test_cases: {
        Row: {
          created_at: string | null
          display_order: number | null
          expected_output: string
          id: string
          input: string
          is_visible: boolean | null
          problem_id: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          expected_output: string
          id?: string
          input: string
          is_visible?: boolean | null
          problem_id: string
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          expected_output?: string
          id?: string
          input?: string
          is_visible?: boolean | null
          problem_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_cases_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_unlocks: {
        Row: {
          accuracy_required: number | null
          created_at: string | null
          current_accuracy: number | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          problems_completed: number | null
          problems_required: number | null
          topic: string
          unlocked: boolean | null
          unlocked_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accuracy_required?: number | null
          created_at?: string | null
          current_accuracy?: number | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          problems_completed?: number | null
          problems_required?: number | null
          topic: string
          unlocked?: boolean | null
          unlocked_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accuracy_required?: number | null
          created_at?: string | null
          current_accuracy?: number | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          problems_completed?: number | null
          problems_required?: number | null
          topic?: string
          unlocked?: boolean | null
          unlocked_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      topics: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          created_at: string | null
          id: string
          problems_solved: number | null
          problems_viewed: number | null
          session_end: string | null
          session_start: string
          total_duration_seconds: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          problems_solved?: number | null
          problems_viewed?: number | null
          session_end?: string | null
          session_start?: string
          total_duration_seconds?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          problems_solved?: number | null
          problems_viewed?: number | null
          session_end?: string | null
          session_start?: string
          total_duration_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          coding_familiarity: number
          created_at: string | null
          id: string
          onboarding_completed: boolean | null
          preferred_language: string
          recommended_level: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          coding_familiarity: number
          created_at?: string | null
          id?: string
          onboarding_completed?: boolean | null
          preferred_language: string
          recommended_level?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          coding_familiarity?: number
          created_at?: string | null
          id?: string
          onboarding_completed?: boolean | null
          preferred_language?: string
          recommended_level?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_solved: {
        Row: {
          attempts: number | null
          best_memory_kb: number | null
          best_runtime_ms: number | null
          first_solved_at: string | null
          id: string
          last_attempt_at: string | null
          problem_id: string | null
          problem_slug: string | null
          user_id: string
        }
        Insert: {
          attempts?: number | null
          best_memory_kb?: number | null
          best_runtime_ms?: number | null
          first_solved_at?: string | null
          id?: string
          last_attempt_at?: string | null
          problem_id?: string | null
          problem_slug?: string | null
          user_id: string
        }
        Update: {
          attempts?: number | null
          best_memory_kb?: number | null
          best_runtime_ms?: number | null
          first_solved_at?: string | null
          id?: string
          last_attempt_at?: string | null
          problem_id?: string | null
          problem_slug?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_solved_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_skill_tier: {
        Args: { rating: number }
        Returns: Database["public"]["Enums"]["skill_tier"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      arena_mode: "practice" | "interview"
      arena_result: "solved" | "failed" | "timeout" | "abandoned"
      difficulty_level: "easy" | "medium" | "hard"
      exam_status: "in_progress" | "completed" | "abandoned" | "disqualified"
      skill_tier: "bronze" | "silver" | "gold" | "platinum" | "diamond"
      submission_status:
        | "pending"
        | "running"
        | "accepted"
        | "wrong_answer"
        | "time_limit"
        | "memory_limit"
        | "runtime_error"
        | "compile_error"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      arena_mode: ["practice", "interview"],
      arena_result: ["solved", "failed", "timeout", "abandoned"],
      difficulty_level: ["easy", "medium", "hard"],
      exam_status: ["in_progress", "completed", "abandoned", "disqualified"],
      skill_tier: ["bronze", "silver", "gold", "platinum", "diamond"],
      submission_status: [
        "pending",
        "running",
        "accepted",
        "wrong_answer",
        "time_limit",
        "memory_limit",
        "runtime_error",
        "compile_error",
      ],
    },
  },
} as const
