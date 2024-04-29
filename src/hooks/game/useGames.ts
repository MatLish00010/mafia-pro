import {useQuery} from '@tanstack/react-query';

import {getGames} from '@/requests/games';
import {Tables} from '@/types/supabase.ts';

const useGames = (club_id?: Tables<'clubs'>['id']) => {
  return useQuery({
    queryKey: ['games', club_id],
    queryFn: () => getGames(club_id),
    placeholderData: [],
  });
};

export default useGames;
