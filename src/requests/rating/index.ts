import {
	formatFromThousand,
	formatToThousand,
	sumTwoNotIntegerNumbers,
} from "@/lib/numberFormat.ts";
import { BREAK_AND_LOSE, HAND_LOSE, REMOVED, VOT } from "@/lib/points.ts";
import { supabase } from "@/providers/supabaseClient.ts";
import type { RatingPlayer } from "@/requests/rating/types.ts";
import type { User } from "@/types/User.ts";
import type { Tables } from "@/types/supabase.ts";

const defaultValues: RatingPlayer = {
	countOfGames: 0,
	winGames: 0,
	loseGames: 0,
	ratingByRoles: {
		RED: {
			win: 0,
			lose: 0,
			bonuses: 0,
			wills: {
				positive: 0,
				negative: 0,
			},
		},
		BLACK: {
			win: 0,
			lose: 0,
			bonuses: 0,
			wills: {
				positive: 0,
				negative: 0,
			},
		},
		SHERIFF: {
			win: 0,
			lose: 0,
			bonuses: 0,
			wills: {
				positive: 0,
				negative: 0,
			},
		},
		DON: {
			win: 0,
			lose: 0,
			bonuses: 0,
			wills: {
				positive: 0,
				negative: 0,
			},
		},
	},
	vot: 0,
	removed: 0,
	breakLose: 0,
	sum: 0,
	handLose: 0,
};

type Rating = {
	[key in User["nick"]]: RatingPlayer;
};

export const getGamesWithDetails = async ({
	from,
	to,
	club_id,
}: {
	from: string;
	to: string;
	club_id: Tables<"clubs">["id"];
}) =>
	supabase
		.from("games")
		.select("*, game_details (*, users (*))")
		.eq("club_id", club_id)
		.gte("date", from)
		.lte("date", to)
		.throwOnError()
		.then((res) => {
			const data = res.data;

			const rating: Rating = {};

			if (!data) {
				return rating;
			}

			for (const game of data) {
				for (const detail of game.game_details) {
					if (!detail || !detail.users) {
						continue;
					}

					const role = detail.role;
					const nick = detail.users.nick;

					if (!rating[nick]) {
						rating[nick] = JSON.parse(JSON.stringify(defaultValues));
					}

					rating[nick].countOfGames += 1;

					if (detail.win) {
						rating[nick].winGames += 1;
					} else {
						rating[nick].loseGames += 1;
					}

					if (detail.win) {
						rating[nick].ratingByRoles[role].win += 1;
					} else {
						rating[nick].ratingByRoles[role].lose += 1;
					}

					if (detail.bonuses) {
						rating[nick].ratingByRoles[role].bonuses = sumTwoNotIntegerNumbers(
							rating[nick].ratingByRoles[role].bonuses,
							detail.bonuses,
						);
					}

					if (detail.first_killed && detail.first_killed_boneses) {
						if (detail.first_killed_boneses > 0) {
							rating[nick].ratingByRoles[role].wills.positive =
								sumTwoNotIntegerNumbers(
									detail.first_killed_boneses,
									rating[nick].ratingByRoles[role].wills.positive,
								);
						} else {
							rating[nick].ratingByRoles[role].wills.negative =
								sumTwoNotIntegerNumbers(
									detail.first_killed_boneses,
									rating[nick].ratingByRoles[role].wills.negative,
								);
						}
					}

					if (detail.wills) {
						if (detail.wills > 0) {
							rating[nick].ratingByRoles[role].wills.positive =
								sumTwoNotIntegerNumbers(
									detail.wills,
									rating[nick].ratingByRoles[role].wills.positive,
								);
						} else {
							rating[nick].ratingByRoles[role].wills.negative =
								sumTwoNotIntegerNumbers(
									detail.wills,
									rating[nick].ratingByRoles[role].wills.negative,
								);
						}
					}

					if (detail.removed) {
						rating[nick].removed = sumTwoNotIntegerNumbers(
							REMOVED,
							rating[nick].removed,
						);
					}

					if (detail.victory_opposing_team) {
						rating[nick].vot = sumTwoNotIntegerNumbers(VOT, rating[nick].vot);
					}

					if (detail.break_and_lose) {
						rating[nick].breakLose = sumTwoNotIntegerNumbers(
							BREAK_AND_LOSE,
							rating[nick].breakLose,
						);
					}

					if (detail.hand_lose) {
						rating[nick].handLose = sumTwoNotIntegerNumbers(
							HAND_LOSE,
							rating[nick].handLose,
						);
					}

					rating[nick].sum = formatFromThousand(
						formatToThousand(rating[nick].breakLose) +
							formatToThousand(rating[nick].vot) +
							formatToThousand(rating[nick].removed) +
							formatToThousand(rating[nick].ratingByRoles.DON.wills.positive) +
							formatToThousand(rating[nick].ratingByRoles.RED.wills.positive) +
							formatToThousand(
								rating[nick].ratingByRoles.SHERIFF.wills.positive,
							) +
							formatToThousand(
								rating[nick].ratingByRoles.BLACK.wills.positive,
							) +
							//
							formatToThousand(rating[nick].ratingByRoles.DON.wills.negative) +
							formatToThousand(rating[nick].ratingByRoles.RED.wills.negative) +
							formatToThousand(
								rating[nick].ratingByRoles.SHERIFF.wills.negative,
							) +
							formatToThousand(
								rating[nick].ratingByRoles.BLACK.wills.negative,
							) +
							//
							formatToThousand(rating[nick].ratingByRoles.DON.bonuses) +
							formatToThousand(rating[nick].ratingByRoles.RED.bonuses) +
							formatToThousand(rating[nick].ratingByRoles.SHERIFF.bonuses) +
							formatToThousand(rating[nick].ratingByRoles.BLACK.bonuses) +
							//
							formatToThousand(rating[nick].ratingByRoles.DON.win) +
							formatToThousand(rating[nick].ratingByRoles.RED.win) +
							formatToThousand(rating[nick].ratingByRoles.SHERIFF.win) +
							formatToThousand(rating[nick].ratingByRoles.BLACK.win),
					);
				}
			}

			return rating;
		});
