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
      drafts: {
        Row: {
          code: string
          id: string
          problem_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          code: string
          id?: string
          problem_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          code?: string
          id?: string
          problem_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drafts_problem_id_fkey"
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
          bio: string | null
          created_at: string | null
          display_name: string | null
          easy_solved: number | null
          hard_solved: number | null
          id: string
          is_public: boolean | null
          last_activity_date: string | null
          lives: number
          lost_times: Json
          medium_solved: number | null
          streak_days: number | null
          total_solved: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          easy_solved?: number | null
          hard_solved?: number | null
          id: string
          is_public?: boolean | null
          last_activity_date?: string | null
          lives?: number
          lost_times?: Json
          medium_solved?: number | null
          streak_days?: number | null
          total_solved?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          easy_solved?: number | null
          hard_solved?: number | null
          id?: string
          is_public?: boolean | null
          last_activity_date?: string | null
          lives?: number
          lost_times?: Json
          medium_solved?: number | null
          streak_days?: number | null
          total_solved?: number | null
          updated_at?: string | null
          username?: string | null
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
          problem_id: string
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
          problem_id: string
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
          problem_id?: string
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
          problem_id: string
          user_id: string
        }
        Insert: {
          attempts?: number | null
          best_memory_kb?: number | null
          best_runtime_ms?: number | null
          first_solved_at?: string | null
          id?: string
          last_attempt_at?: string | null
          problem_id: string
          user_id: string
        }
        Update: {
          attempts?: number | null
          best_memory_kb?: number | null
          best_runtime_ms?: number | null
          first_solved_at?: string | null
          id?: string
          last_attempt_at?: string | null
          problem_id?: string
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
      difficulty_level: "easy" | "medium" | "hard"
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
      difficulty_level: ["easy", "medium", "hard"],
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
