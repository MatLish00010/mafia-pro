import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "@/App.tsx";
import ErrorPage from "@/error-page.tsx";
import { ThemeProvider } from "@/providers/theme.tsx";
import { getSessionWithProfile } from "@/requests/session";
import Index from "@/routes";
import SignIn from "@/routes/Auth/SignIn";
import SignUp from "@/routes/Auth/SignUp";
import Club from "@/routes/Club";
import Games from "@/routes/Games";
import Rating from "@/routes/Rating";
import RequiredRouter from "@/routes/RequiredRouter";
import { useToast } from "@/ui/toast/use-toast.ts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,

		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Index /> },
					{
						path: "/signIn",
						element: <SignIn />,
					},
					{
						path: "/signUp",
						element: <SignUp />,
					},
					{
						path: "rating",
						element: <Rating />,
					},
					{
						path: "games",
						element: <Games />,
					},
					{
						element: (
							<RequiredRouter accessForRoles={["CLUB_ADMIN", "ADMIN"]} />
						),
						loader: getSessionWithProfile,
						children: [
							{
								path: "club",
								element: <Club />,
							},
						],
					},
				],
			},
		],
	},
]);

export default function Root() {
	const { toast } = useToast();

	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: false,
					},
				},
				queryCache: new QueryCache({
					onError: (error) => {
						toast({
							variant: "destructive",
							description: error.message,
						});
					},
				}),
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
