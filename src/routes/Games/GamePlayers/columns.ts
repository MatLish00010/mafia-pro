import type { ColumnDef } from "@tanstack/react-table";

import type { GameDetails } from "@/types/Game.ts";
import type { User } from "@/types/User.ts";

export const columns: ColumnDef<
	GameDetails & {
		users: Pick<User, "nick"> | null;
	}
>[] = [
	{
		accessorKey: "position",
		cell: ({ row }) => {
			const position = row.getValue("position") as GameDetails["position"];
			return position + 1;
		},
		header: "Position",
	},
	{
		accessorKey: "users",
		cell: ({ row }) => {
			const user = row.getValue("users") as User;
			return user.nick;
		},
		header: "Nick",
	},
	{
		accessorKey: "role",
		header: "Role",
	},
];
