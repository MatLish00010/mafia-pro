import {useQuery} from '@tanstack/react-query';
import {endOfMonth, format, startOfMonth} from 'date-fns';

import {getGamesWithDetails} from '@/requests/rating';
import {RatingPlayer} from '@/requests/rating/types.ts';
import {Months} from '@/types/Months.ts';
import {User} from '@/types/User.ts';

type Props = {
  month: Months;
};

const useRating = (props: Props) => {
  return useQuery({
    queryKey: ['rating', props.month],
    queryFn: () => {
      const year = new Date().getFullYear();
      const dateSelectedMonth = new Date(year, props.month);

      return getGamesWithDetails({
        from: format(startOfMonth(dateSelectedMonth), 'yyyy-MM-dd'),
        to: format(endOfMonth(dateSelectedMonth), 'yyyy-MM-dd'),
      });
    },
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
