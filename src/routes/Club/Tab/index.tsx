import { useSearchParams } from "react-router-dom";

import Table from "@/routes/Rating/Table";
import type { Tables } from "@/types/supabase.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs.tsx";

import { useEffect } from "react";
import Games from "./Games";
import Players from "./Players";

interface Props {
	club: Tables<"clubs">;
}

export default function Tab({ club }: Props) {
	const [searchParams, setSearch] = useSearchParams();

	const setParams = (tab: string) => {
		setSearch(
			{
				club: searchParams.get("club") || "",
				segment: tab,
			},
			{ replace: true },
		);
	};

	useEffect(() => {
		if (!searchParams.get("segment")) {
			setParams("players");
		}
	}, []);

	return (
		<Tabs
			defaultValue={searchParams.get("segment") || "players"}
			className="flex flex-col items-center"
		>
			<TabsList className="max-w-max">
				<TabsTrigger value="players" onClick={() => setParams("players")}>
					Players
				</TabsTrigger>
				<TabsTrigger value="games" onClick={() => setParams("games")}>
					Games
				</TabsTrigger>
				<TabsTrigger value="rating" onClick={() => setParams("rating")}>
					Rating
				</TabsTrigger>
			</TabsList>
			<TabsContent value="players" className="w-full">
				<Players club_id={club.id} />
			</TabsContent>
			<TabsContent value="games" className="w-full">
				<Games club_id={club.id} />
			</TabsContent>
			<TabsContent value="rating" className="w-full">
				<Table club_id={club.id} />
			</TabsContent>
		</Tabs>
	);
}
