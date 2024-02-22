import {Navigate, Outlet, useLoaderData} from 'react-router-dom';

import {getSessionWithProfile} from '@/requests/session';
import {LoaderData} from '@/types/LoaderData.ts';
import {Profile} from '@/types/Profile.ts';

type Props = {
  accessForRoles?: Profile['role'][];
};

const RequiredRouter = ({accessForRoles}: Props) => {
  const profile = useLoaderData() as LoaderData<typeof getSessionWithProfile>;

  if (!profile || !accessForRoles?.includes(profile.role)) {
    return <Navigate to="/signIn" />;
  }

  return <Outlet />;
};

export default RequiredRouter;
