import * as yup from "yup";

import { formatFromThousand, formatToThousand } from "@/lib/numberFormat.ts";
import {
	MAX_BONUSES_LOSE,
	MAX_BONUSES_WIN,
	WILLS_MAX,
	WILLS_MIN,
} from "@/lib/points.ts";
import type { Role } from "@/types/Role.ts";

import { points } from "@/utils/points.ts";
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
					.min(WILLS_MIN, `Min value can be ${WILLS_MIN}`)
					.max(WILLS_MAX, `Max value can be ${WILLS_MAX}`)
					.required(),
				bonusesWinners: yup
					.number()
					.test(
						"maxBonusesWin",
						`You can distribute ${points.distributeBonuses.winners} to winners`,
						function () {
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
						`You can distribute ${MAX_BONUSES_LOSE} to losers`,
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
