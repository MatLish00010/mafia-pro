import {ColumnDef} from '@tanstack/react-table';

import {RatingPlayer} from '@/requests/rating/types.ts';
import {User} from '@/types/User.ts';

export const columns: ColumnDef<RatingPlayer & {nick: User['nick']}>[] = [
  {
    accessorKey: 'nick',

    header: 'Nick',
  },
  {
    accessorKey: 'countOfGames',
    header: 'Games',
  },
  {
    accessorKey: 'winGames',
    header: 'Win',
  },
  {
    accessorKey: 'loseGames',
    header: 'Lose',
  },

  {
    accessorKey: 'vot',
    header: 'Vot',
  },
  {
    accessorKey: 'breakLose',
    header: 'Break',
  },
  {
    accessorKey: 'removed',
    header: 'Removed',
  },
  {
    accessorKey: 'sum',
    header: 'Points',
  },
];
