import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

import type { Role } from "@/types/Role.ts";
import type { User } from "@/types/User.ts";
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
	players: User[];
	onSubmit: (roles: Role[]) => void;
	defaultValues?: Role[];
};

type DataForm = {
	roles: {
		value: Role;
	}[];
};

const options: { value: Role; label: string }[] = [
	{ value: "RED", label: "Red" },
	{ value: "BLACK", label: "Black" },
	{ value: "DON", label: "Don" },
	{ value: "SHERIFF", label: "Sher" },
];

const initialRoles = Array.from({ length: 10 }, () => ({
	value: "",
})) as unknown as DataForm["roles"];

const Roles = ({ players, onSubmit, defaultValues }: Props) => {
	const [disabledKeys, setDisabledKeys] = useState<Role[]>([]);

	const form = useForm<DataForm>({
		defaultValues: {
			roles: defaultValues?.length
				? defaultValues.map((item) => ({ value: item }))
				: initialRoles,
		},

		resolver: yupResolver(
			yup.object().shape({
				roles: yup
					.array()
					.of(
						yup.object().shape({
							value: yup.string<Role>().required("Role is required"),
						}),
					)
					.required(),
			}),
		),
	});

	const { fields } = useFieldArray({
		control: form.control,
		name: "roles",
	});

	const getThreshold = (role: Role): number => {
		switch (role) {
			case "RED":
				return 6;
			case "BLACK":
				return 2;
			case "SHERIFF":
			case "DON":
				return 1;
		}
	};

	const getDisabledKeys = () => {
		const valuesRoles = form.getValues("roles");

		const keys: Role[] = [];
		const counts = {
			DON: 0,
			RED: 0,
			SHERIFF: 0,
			BLACK: 0,
		};

		for (const item of valuesRoles) {
			if (item.value) {
				counts[item.value] += 1;

				if (counts[item.value] >= getThreshold(item.value)) {
					keys.push(item.value);
				}
			}
		}

		setDisabledKeys(keys);
	};

	useEffect(() => {
		getDisabledKeys();
	}, [getDisabledKeys]);

	const onReset = () => {
		setDisabledKeys([]);
		form.setValue("roles", initialRoles);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) =>
					onSubmit(data.roles.map((item) => item.value)),
				)}
				className="flex flex-col gap-4"
			>
				{fields.map((item, index) => (
					<FormField
						key={item.id}
						control={form.control}
						name={`roles.${index}.value`}
						render={({ field }) => (
							<FormItem>
								<div className="grid grid-cols-3 items-center">
									<FormLabel className="shrink-0 w-20">
										{index + 1}.{players[index].nick}:
									</FormLabel>

									<FormControl>
										<div className="grid grid-cols-4 col-span-2 space-x-2">
											{options.map((option) => (
												<Toggle
													variant="outline"
													key={option.value}
													aria-label={option.value}
													pressed={option.value === field.value}
													disabled={disabledKeys.includes(option.value)}
													onPressedChange={(isSelected) => {
														field.onChange(isSelected ? option.value : "");
														getDisabledKeys();
													}}
												>
													<span>{option.label}</span>
												</Toggle>
											))}
											<FormMessage />
										</div>
									</FormControl>
								</div>
							</FormItem>
						)}
					/>
				))}
				<div className="self-end mt-2 flex items-center gap-5">
					<Button type="button" variant="outline" onClick={onReset}>
						Reset
					</Button>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
};

export default Roles;
