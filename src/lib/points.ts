import { formatFromThousand, formatToThousand } from "./numberFormat.ts";

export const REMOVED = -0.5;
export const VOT = -0.75;
export const WIN = 1;
export const BREAK_AND_LOSE = -0.4;
export const MAX_BONUSES_LOSE = 0.4;
export const MAX_BONUSES_WIN = 0.7;
export const HAND_LOSE = -0.2;

export const calculatePoints = ({
	fkBonuses,
	win,
	removed,
	vot,
	breakLose,
	bonuses,
	handLose,
	wills,
}: {
	fkBonuses: number;
	win: boolean;
	removed: boolean;
	vot: boolean;
	breakLose: boolean;
	bonuses: number;
	handLose: boolean;
	wills: number;
}) => {
	const winBonuses = win ? WIN : 0;
	const removedFines = removed ? REMOVED : 0;
	const votFines = vot ? VOT : 0;
	const breakLoseFines = breakLose ? BREAK_AND_LOSE : 0;
	const handLoseFines = handLose ? HAND_LOSE : 0;

	return formatFromThousand(
		formatToThousand(winBonuses) +
			formatToThousand(removedFines) +
			formatToThousand(votFines) +
			formatToThousand(breakLoseFines) +
			formatToThousand(bonuses) +
			formatToThousand(wills) +
			formatToThousand(fkBonuses) +
			formatToThousand(handLoseFines),
	);
};
