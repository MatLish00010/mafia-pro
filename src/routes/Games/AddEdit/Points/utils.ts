import type { Role } from "@/types/Role.ts";
import type { Team } from "@/types/Team.ts";

export const RED_TEAM: Role[] = ["RED", "SHERIFF"];

export const getIsWinner = ({
	index,
	roles,
	winner,
}: {
	index: number;
	roles: Role[];
	winner: Team;
}): boolean => {
	const isRedTeam = RED_TEAM.includes(roles[index]);
	return (winner === "RED" && isRedTeam) || (winner === "BLACK" && !isRedTeam);
};
