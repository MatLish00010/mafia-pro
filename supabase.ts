export type Json = string | number | boolean | null | {[key: string]: Json | undefined} | Json[];

export interface Database {
  public: {
    Tables: {
      game_details: {
        Row: {
          bonuses: number;
          break_and_lose: boolean;
          created_at: string;
          first_killed: boolean;
          first_killed_boneses: number | null;
          game_id: string | null;
          id: string;
          removed: boolean;
          role: Database['public']['Enums']['ROLE'];
          user_id: string;
          victory_opposing_team: boolean;
          win: boolean;
        };
        Insert: {
          bonuses: number;
          break_and_lose: boolean;
          created_at?: string;
          first_killed: boolean;
          first_killed_boneses?: number | null;
          game_id?: string | null;
          id?: string;
          removed: boolean;
          role: Database['public']['Enums']['ROLE'];
          user_id: string;
          victory_opposing_team: boolean;
          win: boolean;
        };
        Update: {
          bonuses?: number;
          break_and_lose?: boolean;
          created_at?: string;
          first_killed?: boolean;
          first_killed_boneses?: number | null;
          game_id?: string | null;
          id?: string;
          removed?: boolean;
          role?: Database['public']['Enums']['ROLE'];
          user_id?: string;
          victory_opposing_team?: boolean;
          win?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'game_details_game_id_fkey';
            columns: ['game_id'];
            isOneToOne: false;
            referencedRelation: 'games';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'game_details_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      games: {
        Row: {
          created_at: string;
          date: string;
          id: string;
          notes: string | null;
          winner: Database['public']['Enums']['Team'];
        };
        Insert: {
          created_at?: string;
          date: string;
          id?: string;
          notes?: string | null;
          winner: Database['public']['Enums']['Team'];
        };
        Update: {
          created_at?: string;
          date?: string;
          id?: string;
          notes?: string | null;
          winner?: Database['public']['Enums']['Team'];
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          data_birthday: string | null;
          first_visit: string | null;
          id: string;
          is_active_club_cart: boolean;
          nick: string;
        };
        Insert: {
          created_at?: string;
          data_birthday?: string | null;
          first_visit?: string | null;
          id?: string;
          is_active_club_cart?: boolean;
          nick: string;
        };
        Update: {
          created_at?: string;
          data_birthday?: string | null;
          first_visit?: string | null;
          id?: string;
          is_active_club_cart?: boolean;
          nick?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      ROLE: 'RED' | 'BLACK' | 'SHERIFF' | 'DON';
      Team: 'RED' | 'BLACK';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
