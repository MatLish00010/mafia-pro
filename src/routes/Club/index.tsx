import { useSearchParams } from "react-router-dom";

import Tab from "@/routes/Club/Tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs.tsx";

import { useEffect } from "react";
import useClub from "./hooks/useClub.ts";

export default function Club() {
	const { clubs } = useClub();
	const [searchParams, setSearch] = useSearchParams();

	const setParams = (id: string) => {
		setSearch(
			{
				club: id,
				segment: searchParams.get("segment") || "",
			},
			{ replace: true },
		);
	};

	useEffect(() => {
		if (!searchParams.get("club") && clubs?.[0].id) {
			setParams(clubs[0].id);
		}
	}, [clubs]);

	return (
		<section>
			{!!clubs?.length && (
				<Tabs
					defaultValue={searchParams.get("club") || clubs[0].id}
					className="flex flex-col items-center"
				>
					<TabsList className="max-w-max">
						{clubs.map((club) => (
							<TabsTrigger
								key={club.id}
								value={club.id}
								onClick={() => setParams(club.id)}
							>
								{club.name}
							</TabsTrigger>
						))}
					</TabsList>

					{clubs.map((club) => (
						<TabsContent key={club.id} value={club.id} className="w-full pt-4">
							<Tab club={club} />
						</TabsContent>
					))}
				</Tabs>
			)}
		</section>
	);
}
