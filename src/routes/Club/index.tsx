import Tab from "@/routes/Club/Tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs.tsx";

import useClub from "./hooks/useClub.ts";

export default function Club() {
	const { clubs } = useClub();

	return (
		<section>
			{!!clubs?.length && (
				<Tabs defaultValue={clubs[0].id} className="flex flex-col items-center">
					<TabsList className="max-w-max">
						{clubs.map((club) => (
							<TabsTrigger key={club.id} value={club.id}>
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
