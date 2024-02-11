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
    header: () => <div className="text-center">Games</div>,
    cell: props => <div className="text-center">{props.row.getValue('countOfGames')}</div>,
  },
  {
    accessorKey: 'winGames',
    header: () => <div className="text-center">Win</div>,
    cell: props => <div className="text-center">{props.row.getValue('winGames')}</div>,
  },
  {
    accessorKey: 'loseGames',
    header: () => <div className="text-center">Lose</div>,
    cell: props => <div className="text-center">{props.row.getValue('loseGames')}</div>,
  },

  {
    accessorKey: 'handLose',
    header: () => <div className="text-center">Hand Lose</div>,
    cell: props => <div className="text-center">{props.row.getValue('handLose')}</div>,
  },
  {
    accessorKey: 'breakLose',
    header: () => <div className="text-center">Break</div>,
    cell: props => <div className="text-center">{props.row.getValue('breakLose')}</div>,
  },
  {
    accessorKey: 'removed',
    header: () => <div className="text-center">Removed</div>,
    cell: props => <div className="text-center">{props.row.getValue('removed')}</div>,
  },
  {
    accessorKey: 'sum',
    header: () => <div className="text-center">Sum</div>,
    cell: props => <div className="text-center">{props.row.getValue('sum')}</div>,
  },
];
