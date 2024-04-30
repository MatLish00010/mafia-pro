import type { Tables, TablesInsert } from "@/types/supabase.ts";

export interface AddGame extends TablesInsert<"games"> {
	players_data: TablesInsert<"game_details">[];
	club_id: Tables<"clubs">["id"];
}
