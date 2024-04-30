import { useQuery } from "@tanstack/react-query";
import { endOfMonth, format, startOfMonth } from "date-fns";

import { getGamesWithDetails } from "@/requests/rating";
import type { RatingPlayer } from "@/requests/rating/types.ts";
import type { Months } from "@/types/Months.ts";
import type { User } from "@/types/User.ts";
import type { Tables } from "@/types/supabase.ts";

interface Props {
	club_id: Tables<"clubs">["id"];
	month: Months;
}

const useRating = (props: Props) => {
	return useQuery({
		queryKey: ["rating", props.month, props.club_id],
		queryFn: () => {
			const year = new Date().getFullYear();
			const dateSelectedMonth = new Date(year, props.month);

			return getGamesWithDetails({
				club_id: props.club_id,
				from: format(startOfMonth(dateSelectedMonth), "yyyy-MM-dd"),
				to: format(endOfMonth(dateSelectedMonth), "yyyy-MM-dd"),
			});
		},
		select: (data) => {
			const arr: Array<RatingPlayer & { nick: User["nick"] }> = [];

			for (const property in data) {
				arr.push({ ...data[property], nick: property });
			}

			return arr.sort((a, b) => b.sum - a.sum);
		},
		placeholderData: {},
		enabled: !!props.club_id,
	});
};

export default useRating;
