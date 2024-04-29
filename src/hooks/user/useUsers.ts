import {useQuery} from '@tanstack/react-query';

import {getUsers} from '@/requests/user';
import {Tables} from '@/types/supabase.ts';

const useUsers = (club_id?: Tables<'clubs'>['id']) => {
  return useQuery({
    queryKey: ['users', club_id],
    queryFn: () => getUsers(club_id),
  });
};

export default useUsers;
