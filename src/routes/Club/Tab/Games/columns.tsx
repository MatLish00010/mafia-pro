import {ColumnDef} from '@tanstack/react-table';
import {MoreHorizontal, Trash2} from 'lucide-react';

import {Game} from '@/types/Game.ts';
import {Badge} from '@/ui/badge.tsx';
import {Button} from '@/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu.tsx';

interface Props {
  editAction: (id: Game['id']) => void;
  removeAction: (id: Game['id']) => void;
  showPlayersAction: (id: Game['id']) => void;
}

export function getColumns({
  editAction,
  removeAction,
  showPlayersAction,
}: Props): ColumnDef<Game>[] {
  return [
    {
      accessorKey: 'date',
      header: 'Game Date',
    },
    {
      accessorKey: 'winner',
      cell: ({row}) => {
        const winner = row.getValue('winner') as Game['winner'];
        return (
          <Badge
            variant={winner === 'BLACK' ? 'default' : 'destructive'}
            className="justify-self-center w-max">
            {winner}
          </Badge>
        );
      },
      header: 'Winner',
    },
    {
      id: 'actions',
      cell: ({row}) => {
        const currentItem = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem disabled onClick={() => editAction(currentItem.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => showPlayersAction(currentItem.id)}>
                Show players
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => removeAction(currentItem.id)}>
                Remove
                <Trash2 className="h-4 w-4 ml-5" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
