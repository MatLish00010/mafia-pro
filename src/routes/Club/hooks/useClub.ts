import {useMemo} from 'react';

import useClubs from '@/hooks/club/useClubs.ts';
import useProfile from '@/hooks/useProfile';

export default function useClub() {
  const {data: profile, isLoading: isLoadingProfile} = useProfile();

  const ids = useMemo(() => profile?.club_access.map(club => club.club_id) || undefined, [profile]);

  const {data, isLoading} = useClubs(ids);

  return {
    isLoading: isLoading || isLoadingProfile,
    clubs: data,
  };
}
