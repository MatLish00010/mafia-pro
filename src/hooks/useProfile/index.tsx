import { useQuery } from "@tanstack/react-query";

import { getSessionWithProfile } from "@/requests/session";

const useProfile = () => {
	return useQuery({
		queryKey: ["profile"],
		queryFn: getSessionWithProfile,
	});
};

export default useProfile;
