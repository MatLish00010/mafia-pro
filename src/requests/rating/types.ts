import type { Role } from "@/types/Role.ts";

export type RatingPlayer = {
	countOfGames: number;
	winGames: number;
	loseGames: number;
	ratingByRoles: {
		[key in Role]: {
			win: number;
			lose: number;
			bonuses: number;
			wills: {
				positive: number;
				negative: number;
			};
		};
	};
	removed: number;
	vot: number;
	breakLose: number;
	sum: number;
	handLose: number;
};
