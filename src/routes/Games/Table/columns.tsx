import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import type { Game } from "@/types/Game.ts";
import { Badge } from "@/ui/badge.tsx";
import { Button } from "@/ui/button.tsx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/ui/dropdown-menu.tsx";

interface Props {
	showPlayersAction: (id: Game["id"]) => void;
}

export const getColumns = ({ showPlayersAction }: Props): ColumnDef<Game>[] => [
	{
		accessorKey: "date",
		header: "Game Date",
	},
	{
		accessorKey: "winner",
		cell: ({ row }) => {
			const winner = row.getValue("winner") as Game["winner"];
			return (
				<Badge
					variant={winner === "BLACK" ? "default" : "destructive"}
					className="justify-self-center w-max"
				>
					{winner}
				</Badge>
			);
		},
		header: "Winner",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const currentItem = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => showPlayersAction(currentItem.id)}>
							Show players
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
