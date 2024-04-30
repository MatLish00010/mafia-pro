import { useQuery } from "@tanstack/react-query";

import { getClubs } from "@/requests/club";
import type { Tables } from "@/types/supabase.ts";

export default function useClubs(ids?: Array<Tables<"clubs">["id"] | null>) {
	return useQuery({
		queryKey: ["clubs", ids],
		queryFn: () => getClubs(ids),
		placeholderData: [],
	});
}
