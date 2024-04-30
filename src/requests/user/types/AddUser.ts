import type { Tables } from "@/types/supabase.ts";

export interface AddUser {
	nick: string;
	data_birthday?: null | Date;
	first_visit?: null | Date;
	is_active_club_cart?: boolean;
	club_id: Tables<"clubs">["id"];
}
