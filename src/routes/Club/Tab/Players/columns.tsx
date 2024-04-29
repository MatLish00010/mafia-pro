import {ColumnDef} from '@tanstack/react-table';
import {MoreHorizontal, Trash2} from 'lucide-react';

import {cn} from '@/lib/utils.ts';
import {User} from '@/types/User.ts';
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
  editAction: (id: User['id']) => void;
  removeAction: (id: User['id']) => void;
}

export default function getColumns({editAction, removeAction}: Props): ColumnDef<User>[] {
  return [
    {
      accessorKey: 'nick',
      header: 'Nick',
    },
    {
      accessorKey: 'is_active_club_cart',
      cell: ({row}) => {
        const isActive = row.getValue('is_active_club_cart');
        return (
          <p className={cn([isActive ? 'bg-green-600' : 'bg-red-600', 'rounded-md p-1 w-max'])}>
            {isActive ? 'Active' : 'Inactive'}
          </p>
        );
      },
      header: 'Is club cart active',
    },
    {
      accessorKey: 'first_visit',
      header: 'First visit',
    },
    {
      accessorKey: 'data_birthday',
      header: 'Date of birthday',
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
              <DropdownMenuItem onClick={() => editAction(currentItem.id)}>Edit</DropdownMenuItem>
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
