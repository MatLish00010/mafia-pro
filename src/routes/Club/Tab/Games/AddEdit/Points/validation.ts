import * as yup from "yup";

import { formatFromThousand, formatToThousand } from "@/lib/numberFormat.ts";
import { MAX_BONUSES_LOSE, MAX_BONUSES_WIN } from "@/lib/points.ts";
import type { Role } from "@/types/Role.ts";

import type { DataForm } from "./types";

const calculateBonuses = (
	data: DataForm,
	isWinner: boolean,
	bonusesKey: "bonusesWinners" | "bonusesLosers",
): number => {
	let acc = 0;

	for (const item of data.points) {
		if (item.isWinner === isWinner) {
			acc += formatToThousand(item[bonusesKey]);
		}
	}

	return acc;
};

export const validation = yup.object().shape({
	points: yup
		.array()
		.of(
			yup.object().shape({
				role: yup.string<Role>().required(),
				isWinner: yup.boolean().required(),
				wills: yup
					.number()
					.typeError("Must be a number")
					.min(-0.45, "Min value can be -0.45")
					.max(0.45, "Max value can be 0.45")
					.required(),
				bonusesWinners: yup
					.number()
					.test(
						"maxBonusesWin",
						"You can distribute 0.7 to winners",
						function () {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							const allData = this.from[1].value as DataForm;
							const acc = calculateBonuses(allData, true, "bonusesWinners");
							const isError = formatFromThousand(acc) > MAX_BONUSES_WIN;
							return !isError;
						},
					)
					.min(0, "Min value 0")
					.typeError("Must be a number")
					.required(),
				bonusesLosers: yup
					.number()
					.test(
						"maxBonusesLose",
						"You can distribute 0.4 to losers",
						function () {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							const allData = this.from[1].value as DataForm;
							const acc = calculateBonuses(allData, false, "bonusesLosers");
							const isError = formatFromThousand(acc) > MAX_BONUSES_LOSE;
							return !isError;
						},
					)
					.min(0, "Min value 0")
					.typeError("Must be a number")
					.required(),
			}),
		)
		.required(),
});
