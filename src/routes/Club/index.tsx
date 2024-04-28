import {useMemo} from 'react';

import useClubs from '@/hooks/club/useClubs.ts';
import useProfile from '@/hooks/useProfile';

export default function Club() {
  const {data: profile, isLoading: isLoadingProfile} = useProfile();
  const ids = useMemo(() => profile?.club_access.map(club => club.club_id) || undefined, [profile]);

  const {data, isLoading} = useClubs(ids);
  console.log('data:', data);
  return <section>{isLoadingProfile || isLoading ? <h1>LOADING ...</h1> : <h1>Club</h1>}</section>;
}
