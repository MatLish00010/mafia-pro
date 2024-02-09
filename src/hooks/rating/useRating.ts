import {useQuery} from '@tanstack/react-query';

import {getGamesWithDetails} from '@/requests/rating';
import {RatingPlayer} from '@/requests/rating/types.ts';
import {User} from '@/types/User.ts';

const useRating = () => {
  return useQuery({
    queryKey: ['rating'],
    queryFn: getGamesWithDetails,
    select: data => {
      const arr: Array<RatingPlayer & {nick: User['nick']}> = [];

      for (const property in data) {
        arr.push({...data[property], nick: property});
      }

      return arr.sort((a, b) => b.sum - a.sum);
    },
    placeholderData: {},
  });
};

export default useRating;
