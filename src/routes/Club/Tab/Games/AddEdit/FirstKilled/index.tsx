import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import type { Role } from "@/types/Role.ts";
import type { User } from "@/types/User.ts";
import { Button } from "@/ui/button.tsx";
import { Checkbox } from "@/ui/checkbox.tsx";
import {
	Form,
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/ui/form";
import { FormField } from "@/ui/form.tsx";
import { Input } from "@/ui/input.tsx";

type DataForm = {
	firstKilledPosition?: number | null;
	bonuses?: number;
};

type Props = {
	players: User[];
	roles: Role[];
	onSubmit: (props: { firstKilled: null | number; bonuses: number }) => void;
	defaultValues?: {
		firstKilledPosition: DataForm["firstKilledPosition"];
		bonuses: DataForm["bonuses"];
	};
};

const FirstKilled = ({ players, onSubmit, defaultValues, roles }: Props) => {
	const form = useForm<DataForm>({
		defaultValues: defaultValues || {
			firstKilledPosition: null,
			bonuses: 0,
		},
		resolver: yupResolver(
			yup.object().shape({
				firstKilledPosition: yup.number().nullable(),
				bonuses: yup
					.number()
					.typeError("Must be a number")
					.min(-0.45, "Min value can be -0.45")
					.max(0.45, "Max value can be 0.45"),
			}),
		),
	});

	const firstKilledPositionWatch = form.watch("firstKilledPosition");

	useEffect(() => {
		if (firstKilledPositionWatch === null) {
			form.setValue("bonuses", 0);
		}
	}, [firstKilledPositionWatch]);

	const prevSubmit = (data: DataForm) => {
		if (data.firstKilledPosition === null) {
			onSubmit({ firstKilled: null, bonuses: 0 });
		}

		if (
			typeof data.firstKilledPosition === "number" &&
			typeof data.bonuses === "number"
		) {
			onSubmit({
				firstKilled: data.firstKilledPosition,
				bonuses: data.bonuses,
			});
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(prevSubmit)}
				className="flex-1 flex flex-col justify-between gap-5"
			>
				<FormItem>
					<div className="mb-4">
						<FormLabel className="text-base">First kill</FormLabel>
						<FormDescription>
							Select the first killed player and add bonuses (optional)
						</FormDescription>
					</div>
					{players.map((item, index) => (
						<div className="grid grid-cols-2" key={item.id}>
							<FormField
								control={form.control}
								name="firstKilledPosition"
								render={({ field }) => {
									return (
										<FormItem
											key={item.id}
											className="grid grid-cols-2 items-center space-y-0"
										>
											<FormLabel className="text-sm font-normal">
												{index + 1}: {item.nick}
											</FormLabel>
											<FormControl>
												<Checkbox
													disabled={
														roles[index] === "BLACK" || roles[index] === "DON"
													}
													checked={field.value === index}
													onCheckedChange={(props) => {
														field.onChange(props ? index : null);
													}}
												/>
											</FormControl>
										</FormItem>
									);
								}}
							/>
							<FormField
								control={form.control}
								name="bonuses"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="0"
												{...field}
												value={
													firstKilledPositionWatch === index ? field.value : 0
												}
												disabled={firstKilledPositionWatch !== index}
												type="number"
											/>
										</FormControl>
										{firstKilledPositionWatch === index && <FormMessage />}
									</FormItem>
								)}
							/>
						</div>
					))}
					<FormMessage />
				</FormItem>
				<Button type="submit" className="self-end">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default FirstKilled;
