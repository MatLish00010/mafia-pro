import { useReducer, useState } from "react";

import useAddGame from "@/hooks/game/useAddGame.ts";
import useUsers from "@/hooks/user/useUsers.ts";
import { cn } from "@/lib/utils.ts";
import type { Role } from "@/types/Role.ts";
import type { Team } from "@/types/Team.ts";
import type { User } from "@/types/User.ts";
import type { Tables } from "@/types/supabase.ts";
import DialogResponsive from "@/ui/dialogResponsive.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs.tsx";

import FinalTable from "./FinalTable";
import Fines from "./Fines";
import FirstKilled from "./FirstKilled";
import Players from "./Players";
import Points from "./Points";
import Roles from "./Roles";
import Winner from "./Winner";
import { type State, initialState, reducer } from "./reducer.ts";

enum TabVariant {
	PLAYERS = "players",
	ROLES = "roles",
	WINNER = "winner",
	FIRST_KILLED = "first_killed",
	POINTS = "points",
	FINES = "fines",
}

interface Props {
	onClose: () => void;
	club_id: Tables<"clubs">["id"];
}

interface TabProps {
	value: TabVariant;
	onClick: () => void;
	disabled?: boolean;
	label: string;
}

const Tab = ({ value, onClick, disabled, label }: TabProps) => {
	return (
		<TabsTrigger
			disabled={disabled}
			value={value}
			onClick={onClick}
			className="flex-1"
		>
			{label}
		</TabsTrigger>
	);
};

const AddEdit = ({ onClose, club_id }: Props) => {
	const [currentTub, setCurrentTub] = useState<TabVariant>(TabVariant.PLAYERS);
	const [isOpenFinalTable, setIsOpenFinalTable] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);
	const { mutate } = useAddGame();
	const { data } = useUsers(club_id);

	const onSubmitPlayers = (props: { players: User[]; date: Date }) => {
		dispatch({ type: "ADD_PLAYERS", props });
		setCurrentTub(TabVariant.ROLES);
	};

	const onSubmitRoles = (roles: Role[]) => {
		dispatch({ type: "ADD_ROLES", roles });
		setCurrentTub(TabVariant.WINNER);
	};

	const onSubmitWinner = (winner: Team) => {
		dispatch({ type: "ADD_WINNER", winner });
		setCurrentTub(TabVariant.FIRST_KILLED);
	};

	const onSubmitFirstKilled = (FKData: {
		firstKilled: null | number;
		bonuses: number;
	}) => {
		dispatch({
			type: "ADD_FIRST_KILLED",
			firstKilled: { position: FKData.firstKilled, bonuses: FKData.bonuses },
		});
		setCurrentTub(TabVariant.POINTS);
	};

	const onSubmitPoints = (points: State["points"]) => {
		dispatch({
			type: "ADD_POINTS",
			points,
		});
		setCurrentTub(TabVariant.FINES);
	};

	const onSubmitWills = (fines: State["fines"]) => {
		dispatch({
			type: "ADD_WILLS",
			fines,
		});
		setIsOpenFinalTable(true);
	};

	const onFinalSubmit = () => {
		setIsOpenFinalTable(false);
		mutate({ body: state, club_id });
		onClose();
	};

	const tabsConfig: TabProps[] = [
		{
			value: TabVariant.PLAYERS,
			onClick: () => setCurrentTub(TabVariant.PLAYERS),
			label: "Players",
		},
		{
			value: TabVariant.ROLES,
			onClick: () => setCurrentTub(TabVariant.ROLES),
			disabled: !state.players.length,
			label: "Roles",
		},
		{
			value: TabVariant.WINNER,
			onClick: () => setCurrentTub(TabVariant.WINNER),
			disabled: !state.roles.length,
			label: "Win",
		},
		{
			value: TabVariant.FIRST_KILLED,
			onClick: () => setCurrentTub(TabVariant.FIRST_KILLED),
			disabled: !state.roles.length,
			label: "FK",
		},
		{
			value: TabVariant.POINTS,
			onClick: () => setCurrentTub(TabVariant.POINTS),
			disabled: !state.roles.length,
			label: "Points",
		},
		{
			value: TabVariant.FINES,
			onClick: () => setCurrentTub(TabVariant.FINES),
			disabled: !state.points.length,
			label: "Fines",
		},
	];

	return (
		<>
			<Tabs
				value={currentTub}
				className="min-h-[500px] mt-4 flex flex-col gap-7"
			>
				<TabsList className="w-full">
					{tabsConfig.map((item) => (
						<Tab
							key={item.value}
							value={item.value}
							disabled={item.disabled}
							onClick={item.onClick}
							label={item.label}
						/>
					))}
				</TabsList>
				<TabsContent value={TabVariant.PLAYERS} className="flex-1">
					<Players
						users={data || []}
						onSubmit={onSubmitPlayers}
						defaultValues={{
							players: state.players,
							date: state.date,
						}}
					/>
				</TabsContent>
				<TabsContent value={TabVariant.ROLES} className="flex-1">
					<Roles
						players={state.players}
						onSubmit={onSubmitRoles}
						defaultValues={state.roles}
					/>
				</TabsContent>
				<TabsContent
					value={TabVariant.WINNER}
					className={cn([currentTub === TabVariant.WINNER && "flex", "flex-1"])}
				>
					<Winner onSubmit={onSubmitWinner} defaultValues={state.winner} />
				</TabsContent>
				<TabsContent
					value={TabVariant.FIRST_KILLED}
					className={cn([
						currentTub === TabVariant.FIRST_KILLED && "flex",
						"flex-1",
					])}
				>
					<FirstKilled
						players={state.players}
						onSubmit={onSubmitFirstKilled}
						roles={state.roles}
						defaultValues={{
							firstKilledPosition: state.firstKilled.position,
							bonuses:
								state.firstKilled.bonuses !== null
									? state.firstKilled.bonuses
									: undefined,
						}}
					/>
				</TabsContent>
				<TabsContent
					value={TabVariant.POINTS}
					className={cn([currentTub === TabVariant.POINTS && "flex", "flex-1"])}
				>
					<Points
						roles={state.roles}
						players={state.players}
						winnerTeam={state.winner}
						onSubmit={onSubmitPoints}
						defaultValues={state.points}
					/>
				</TabsContent>
				<TabsContent
					value={TabVariant.FINES}
					className={cn([currentTub === TabVariant.FINES && "flex", "flex-1"])}
				>
					<Fines
						players={state.players}
						points={state.points}
						winnerTeam={state.winner}
						onSubmit={onSubmitWills}
						defaultValues={state.fines}
					/>
				</TabsContent>
			</Tabs>
			<DialogResponsive
				isOpen={isOpenFinalTable}
				setIsOpen={setIsOpenFinalTable}
			>
				<FinalTable
					state={state}
					onSubmit={onFinalSubmit}
					onCancel={() => setIsOpenFinalTable(false)}
				/>
			</DialogResponsive>
		</>
	);
};

export default AddEdit;
