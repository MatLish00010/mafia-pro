import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { supabase } from "@/providers/supabaseClient.ts";
import { Button } from "@/ui/button.tsx";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input.tsx";
import { useToast } from "@/ui/toast/use-toast.ts";

type DataForm = {
	email: string;
	password: string;
};

const Auth = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { toast } = useToast();

	const form = useForm<DataForm>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(
			yup.object().shape({
				email: yup.string().email("Should be email").required("Required"),
				password: yup.string().required("Required"),
			}),
		),
	});

	const onLogin = async (data: DataForm) => {
		const res = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		queryClient.invalidateQueries({ queryKey: ["profile"] });

		if (res.error) {
			toast({
				title: "Login Error",
				variant: "destructive",
				description: res.error.message,
			});
		}

		if (res.data.session) {
			navigate("/");
		}
	};

	return (
		<section className="flex-1 flex flex-col justify-center items-center gap-5">
			<h1>Login</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onLogin)}
					className="w-2/3 space-y-6 max-w-64"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										required
										type="email"
										placeholder="email@gmail.com"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										required
										type="password"
										placeholder="not 1234"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</section>
	);
};

export default Auth;
