import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import type { Team } from "@/types/Team.ts";
import { Button } from "@/ui/button.tsx";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/ui/form";
import { Toggle } from "@/ui/toggle.tsx";

type Props = {
	onSubmit: (winner: Team) => void;
	defaultValues?: Team;
};

type DataForm = {
	winner: Team;
};

const Winner = ({ onSubmit, defaultValues }: Props) => {
	const form = useForm<DataForm>({
		defaultValues: {
			winner: defaultValues || "RED",
		},
		resolver: yupResolver(
			yup.object().shape({
				winner: yup.mixed<Team>().oneOf(["RED", "BLACK"]).required(),
			}),
		),
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => onSubmit(data.winner))}
				className="flex flex-col justify-between flex-1"
			>
				<FormField
					control={form.control}
					name="winner"
					render={({ field }) => (
						<FormItem className="flex flex-col items-center flex-1 ">
							<FormLabel>Select the winning team</FormLabel>
							<FormControl>
								<div className="flex items-center gap-5 flex-1">
									<Toggle
										variant="outline"
										aria-label={"Red"}
										pressed={"RED" === field.value}
										onPressedChange={(isSelected) => {
											field.onChange(isSelected ? "RED" : "");
										}}
									>
										<span>Red</span>
									</Toggle>
									<Toggle
										variant="outline"
										aria-label={"Black"}
										pressed={field.value === "BLACK"}
										onPressedChange={(isSelected) => {
											field.onChange(isSelected ? "BLACK" : "");
										}}
									>
										<span>Black</span>
									</Toggle>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="self-end" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default Winner;
