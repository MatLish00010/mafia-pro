import { Outlet } from "react-router-dom";

import Header from "@/ui/header.tsx";
import { Toaster } from "@/ui/toast/toaster.tsx";

import "./App.css";

const WrapperApp = () => {
	return (
		<>
			<Header />
			<main className="container mx-auto flex-1 flex flex-col">
				<Outlet />
			</main>
			<Toaster />
		</>
	);
};

export default WrapperApp;
