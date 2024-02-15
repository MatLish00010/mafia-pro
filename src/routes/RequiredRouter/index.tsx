import {Navigate, Outlet, useLoaderData} from 'react-router-dom';

import {getSession} from '@/requests/session';
import {LoaderData} from '@/types/LoaderData.ts';

const RequiredRouter = () => {
  const session = useLoaderData() as LoaderData<typeof getSession>;

  if (!session) {
    return <Navigate to="/signIn" />;
  }
  return <Outlet />;
};

export default RequiredRouter;
