import {
	type SupabaseClientOptions,
	createClient,
} from "@supabase/supabase-js";

import type { Database } from "@/types/supabase.ts";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const options: SupabaseClientOptions<"public"> = {
	db: {
		schema: "public",
	},
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true,
	},
	global: {
		headers: { "x-my-custom-header": "my-app-name" },
	},
};

export const supabase = createClient<Database>(
	supabaseUrl,
	supabaseAnonKey,
	options,
);
