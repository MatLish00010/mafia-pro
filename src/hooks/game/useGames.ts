import {useQuery} from '@tanstack/react-query';

import {getGames} from '@/requests/games';

const useGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: getGames,
    placeholderData: [],
  });
};

export default useGames;
