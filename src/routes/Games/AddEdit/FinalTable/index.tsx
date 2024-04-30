import { calculatePoints } from "@/lib/points.ts";
import { Button } from "@/ui/button.tsx";
import { DataTable } from "@/ui/data-table.tsx";
import { DialogDescription, DialogHeader, DialogTitle } from "@/ui/dialog.tsx";

import type { State } from "../reducer.ts";

type Props = {
	state: State;
	onSubmit: () => void;
	onCancel: () => void;
};

const columns = [
	{
		accessorKey: "position",
		header: "Position",
	},
	{
		accessorKey: "nick",
		header: "Nick",
	},
	{
		accessorKey: "role",
		header: "Role",
	},
	{
		accessorKey: "points",
		header: "Points",
	},
];

const FinalTable = ({ state, onSubmit, onCancel }: Props) => {
	const rows = state.players.map((item, index) => ({
		nick: item.nick,
		position: index + 1,
		role: state.roles[index],
		points: calculatePoints({
			fkBonuses:
				state.firstKilled.position === index ? state.firstKilled.bonuses : 0,
			win: state.points[index].isWinner,
			removed: state.fines[index].removed,
			vot: state.fines[index].vot,
			breakLose: state.fines[index].breakLose,
			bonuses: state.points[index].isWinner
				? state.points[index].bonusesWinners
				: state.points[index].bonusesLosers,
			wills: state.points[index].wills,
			handLose: state.fines[index].handLose,
		}),
	}));

	return (
		<div className="flex flex-col gap-5">
			<DialogHeader>
				<DialogTitle>Final points</DialogTitle>
				<DialogDescription>
					Check the points, if everything is in order, click “Save to Database”,
					if not, click “Back” and correct the data.
				</DialogDescription>
			</DialogHeader>
			<DataTable columns={columns} data={rows} hidePagination hideSearch />
			<div className="space-x-2 self-end">
				<Button variant="outline" onClick={onCancel}>
					Back
				</Button>
				<Button onClick={onSubmit}>Save to Database</Button>
			</div>
		</div>
	);
};

export default FinalTable;
