import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/providers/supabaseClient.ts";
import { useToast } from "@/ui/toast/use-toast.ts";

const useLogOut = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);

	const logOut = async () => {
		setLoading(true);
		const { error } = await supabase.auth.signOut();
		if (error) {
			toast({
				title: "Log out",
				variant: "destructive",
				description: error?.message,
			});
		}
		navigate("/");
		setLoading(false);
	};

	return {
		logOut,
		loading,
	};
};

export default useLogOut;
