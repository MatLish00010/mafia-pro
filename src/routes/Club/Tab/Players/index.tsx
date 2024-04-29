import {useState} from 'react';

import useRemoveUser from '@/hooks/user/useRemoveUser.ts';
import useUsers from '@/hooks/user/useUsers.ts';
import getColumns from '@/routes/Club/Tab/Players/columns.tsx';
import {User} from '@/types/User.ts';
import {Tables} from '@/types/supabase.ts';
import {DataTable} from '@/ui/data-table.tsx';
import DialogResponsive from '@/ui/dialogResponsive.tsx';

import AddEdit from './AddEdit';

interface Props {
  club_id: Tables<'clubs'>['id'];
}

export default function Players({club_id}: Props) {
  const {data, isLoading} = useUsers(club_id);

  const [addEdit, setAddEdit] = useState<{isOpen: boolean; prevData?: User}>({
    isOpen: false,
    prevData: undefined,
  });

  const handleAddEdit = (isOpen: boolean, prevData?: User) => {
    setAddEdit({isOpen, prevData});
  };

  const {mutate: mutateRemove} = useRemoveUser(() => {});

  const columns = getColumns({
    editAction: (id: User['id']) =>
      handleAddEdit(
        true,
        data?.find(item => item.id === id),
      ),
    removeAction: (id: User['id']) => mutateRemove(id),
  });

  return (
    <div className="flex flex-col gap-5">
      <DialogResponsive
        isOpen={addEdit.isOpen}
        setIsOpen={handleAddEdit}
        buttonLabel="Add new"
        classNames={{button: ['self-end']}}>
        <AddEdit
          prevData={addEdit.prevData}
          onOpenChange={handleAddEdit}
          users={data || []}
          club_id={club_id}
        />
      </DialogResponsive>
      <DataTable columns={columns} data={data || []} isLoading={isLoading} />
    </div>
  );
}
