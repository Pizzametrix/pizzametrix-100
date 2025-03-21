export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      landing_assets: {
        Row: {
          alt_text: string
          created_at: string
          dimensions: string | null
          id: string
          position: number | null
          section: string
          storage_path: string
        }
        Insert: {
          alt_text: string
          created_at?: string
          dimensions?: string | null
          id?: string
          position?: number | null
          section: string
          storage_path: string
        }
        Update: {
          alt_text?: string
          created_at?: string
          dimensions?: string | null
          id?: string
          position?: number | null
          section?: string
          storage_path?: string
        }
        Relationships: []
      }
      photos: {
        Row: {
          created_at: string
          id: string
          recipe_id: string | null
          storage_path: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          recipe_id?: string | null
          storage_path: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          recipe_id?: string | null
          storage_path?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "photos_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recettes"
            referencedColumns: ["id"]
          },
        ]
      }
      recettes: {
        Row: {
          ball_weight: number
          created_at: string
          custom_yeast: number | null
          description: string | null
          dough_type: string
          hydration: number
          id: string
          is_custom_yeast_enabled: boolean | null
          is_oil_enabled: boolean | null
          is_sugar_enabled: boolean | null
          nom: string
          oil: number | null
          phases: Json
          photos: Json | null
          pizza_count: number
          preferment_flour: number | null
          preferment_hydration: number | null
          preferment_yeast: number | null
          salt: number
          sugar: number | null
          type: string
          user_id: string
          yeast: number
          yeast_type: string
        }
        Insert: {
          ball_weight: number
          created_at?: string
          custom_yeast?: number | null
          description?: string | null
          dough_type?: string
          hydration: number
          id?: string
          is_custom_yeast_enabled?: boolean | null
          is_oil_enabled?: boolean | null
          is_sugar_enabled?: boolean | null
          nom: string
          oil?: number | null
          phases?: Json
          photos?: Json | null
          pizza_count: number
          preferment_flour?: number | null
          preferment_hydration?: number | null
          preferment_yeast?: number | null
          salt: number
          sugar?: number | null
          type: string
          user_id: string
          yeast: number
          yeast_type?: string
        }
        Update: {
          ball_weight?: number
          created_at?: string
          custom_yeast?: number | null
          description?: string | null
          dough_type?: string
          hydration?: number
          id?: string
          is_custom_yeast_enabled?: boolean | null
          is_oil_enabled?: boolean | null
          is_sugar_enabled?: boolean | null
          nom?: string
          oil?: number | null
          phases?: Json
          photos?: Json | null
          pizza_count?: number
          preferment_flour?: number | null
          preferment_hydration?: number | null
          preferment_yeast?: number | null
          salt?: number
          sugar?: number | null
          type?: string
          user_id?: string
          yeast?: number
          yeast_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_landing_asset: {
        Args: {
          storage_path_param: string
          section_param: string
          alt_text_param: string
          dimensions_param: string
        }
        Returns: undefined
      }
    }
    Enums: {
      type_recette: "napolitaine" | "teglia"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
