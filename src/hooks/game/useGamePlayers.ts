import { useQuery } from "@tanstack/react-query";

import { getGamePlayers } from "@/requests/games";
import type { Game } from "@/types/Game.ts";

type Props = {
	id: Game["id"];
};
const useGamePlayers = ({ id }: Props) => {
	return useQuery({
		queryKey: ["game players", id],
		queryFn: () => getGamePlayers(id),
		enabled: !!id,
		placeholderData: [],
	});
};

export default useGamePlayers;
