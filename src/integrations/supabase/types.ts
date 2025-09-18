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
      backtesting_log: {
        Row: {
          adjustments_made: Json | null
          analysis_period: string
          avg_rr: number
          created_at: string
          id: string
          total_signals: number
          win_rate: number
        }
        Insert: {
          adjustments_made?: Json | null
          analysis_period: string
          avg_rr: number
          created_at?: string
          id?: string
          total_signals: number
          win_rate: number
        }
        Update: {
          adjustments_made?: Json | null
          analysis_period?: string
          avg_rr?: number
          created_at?: string
          id?: string
          total_signals?: number
          win_rate?: number
        }
        Relationships: []
      }
      engine_params: {
        Row: {
          adjustment_reason: string | null
          description: string | null
          id: string
          last_adjusted: string
          max_value: number | null
          min_value: number | null
          param_name: string
          param_type: string
          param_value: number
        }
        Insert: {
          adjustment_reason?: string | null
          description?: string | null
          id?: string
          last_adjusted?: string
          max_value?: number | null
          min_value?: number | null
          param_name: string
          param_type: string
          param_value: number
        }
        Update: {
          adjustment_reason?: string | null
          description?: string | null
          id?: string
          last_adjusted?: string
          max_value?: number | null
          min_value?: number | null
          param_name?: string
          param_type?: string
          param_value?: number
        }
        Relationships: []
      }
      market_data: {
        Row: {
          ask: number | null
          atr: number | null
          bid: number | null
          ema_20: number | null
          ema_50: number | null
          high_24h: number | null
          last_updated: string
          low_24h: number | null
          macd: number | null
          orderbook_imbalance: number | null
          price: number
          price_change_24h: number | null
          rsi: number | null
          symbol: string
          volume_24h: number | null
          volume_surge: boolean | null
        }
        Insert: {
          ask?: number | null
          atr?: number | null
          bid?: number | null
          ema_20?: number | null
          ema_50?: number | null
          high_24h?: number | null
          last_updated?: string
          low_24h?: number | null
          macd?: number | null
          orderbook_imbalance?: number | null
          price: number
          price_change_24h?: number | null
          rsi?: number | null
          symbol: string
          volume_24h?: number | null
          volume_surge?: boolean | null
        }
        Update: {
          ask?: number | null
          atr?: number | null
          bid?: number | null
          ema_20?: number | null
          ema_50?: number | null
          high_24h?: number | null
          last_updated?: string
          low_24h?: number | null
          macd?: number | null
          orderbook_imbalance?: number | null
          price?: number
          price_change_24h?: number | null
          rsi?: number | null
          symbol?: string
          volume_24h?: number | null
          volume_surge?: boolean | null
        }
        Relationships: []
      }
      performance_logs: {
        Row: {
          coin: string
          id: number
          price: number | null
          signal: string | null
          stop_loss: number | null
          target_price: number | null
          timestamp: string | null
        }
        Insert: {
          coin: string
          id?: number
          price?: number | null
          signal?: string | null
          stop_loss?: number | null
          target_price?: number | null
          timestamp?: string | null
        }
        Update: {
          coin?: string
          id?: number
          price?: number | null
          signal?: string | null
          stop_loss?: number | null
          target_price?: number | null
          timestamp?: string | null
        }
        Relationships: []
      }
      performance_summary: {
        Row: {
          avg_confidence: number
          avg_rr: number
          id: string
          losses: number
          model: string
          period_end: string
          period_start: string
          symbol: string | null
          total_signals: number
          updated_at: string
          win_rate: number
          wins: number
        }
        Insert: {
          avg_confidence?: number
          avg_rr?: number
          id?: string
          losses?: number
          model: string
          period_end: string
          period_start: string
          symbol?: string | null
          total_signals?: number
          updated_at?: string
          win_rate?: number
          wins?: number
        }
        Update: {
          avg_confidence?: number
          avg_rr?: number
          id?: string
          losses?: number
          model?: string
          period_end?: string
          period_start?: string
          symbol?: string | null
          total_signals?: number
          updated_at?: string
          win_rate?: number
          wins?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      signals: {
        Row: {
          action: string
          closed_at: string | null
          confidence: number
          created_at: string
          created_by: string | null
          entry_max: number
          entry_mid: number
          entry_min: number
          feedback: Json | null
          id: string
          model: string
          reason: string | null
          reason_summary: string | null
          replaced_by: string | null
          replacement_reason: string | null
          result: string | null
          rr1: number
          rr2: number
          sl: number
          state: string
          symbol: string
          timeframes: string[] | null
          tp1: number
          tp2: number
        }
        Insert: {
          action: string
          closed_at?: string | null
          confidence: number
          created_at?: string
          created_by?: string | null
          entry_max: number
          entry_mid: number
          entry_min: number
          feedback?: Json | null
          id: string
          model: string
          reason?: string | null
          reason_summary?: string | null
          replaced_by?: string | null
          replacement_reason?: string | null
          result?: string | null
          rr1: number
          rr2: number
          sl: number
          state?: string
          symbol: string
          timeframes?: string[] | null
          tp1: number
          tp2: number
        }
        Update: {
          action?: string
          closed_at?: string | null
          confidence?: number
          created_at?: string
          created_by?: string | null
          entry_max?: number
          entry_mid?: number
          entry_min?: number
          feedback?: Json | null
          id?: string
          model?: string
          reason?: string | null
          reason_summary?: string | null
          replaced_by?: string | null
          replacement_reason?: string | null
          result?: string | null
          rr1?: number
          rr2?: number
          sl?: number
          state?: string
          symbol?: string
          timeframes?: string[] | null
          tp1?: number
          tp2?: number
        }
        Relationships: [
          {
            foreignKeyName: "signals_replaced_by_fkey"
            columns: ["replaced_by"]
            isOneToOne: false
            referencedRelation: "signals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
