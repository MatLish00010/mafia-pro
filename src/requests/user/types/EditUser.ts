import type { User } from "@/types/User.ts";

export type EditUser = {
	id: User["id"];
	nick: string;
	data_birthday?: null | Date;
	first_visit?: null | Date;
	is_active_club_cart?: boolean;
};
