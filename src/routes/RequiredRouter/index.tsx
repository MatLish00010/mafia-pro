import { Navigate, Outlet, useLoaderData } from "react-router-dom";

import type { getSessionWithProfile } from "@/requests/session";
import type { LoaderData } from "@/types/LoaderData.ts";
import type { Profile } from "@/types/Profile.ts";

type Props = {
	accessForRoles?: Profile["role"][];
};

const RequiredRouter = ({ accessForRoles }: Props) => {
	const profile = useLoaderData() as LoaderData<typeof getSessionWithProfile>;

	if (!profile || !accessForRoles?.includes(profile.role)) {
		return <Navigate to="/signIn" />;
	}

	return <Outlet />;
};

export default RequiredRouter;
