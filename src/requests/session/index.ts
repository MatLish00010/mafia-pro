import { supabase } from "@/providers/supabaseClient.ts";
import type { User } from "@/types/User.ts";

export const getSession = async () =>
	supabase.auth.getSession().then(({ data: { session } }) => {
		return session;
	});

export const getProfile = async (id: User["id"]) =>
	supabase
		.from("profiles")
		.select(
			`*,
    club_access (club_id)`,
		)
		.eq("id", id)
		.throwOnError()
		.then((res) => (res.data ? res.data[0] : null));

export const getSessionWithProfile = async () => {
	const session = await getSession();

	const id = session?.user.id;

	if (id) {
		return await getProfile(session?.user.id);
	}

	return null;
};
