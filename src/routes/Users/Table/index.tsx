import {useState} from 'react';

import useRemoveUser from '@/hooks/user/useRemoveUser.ts';
import useUsers from '@/hooks/user/useUsers.ts';
import AddEdit from '@/routes/Users/AddEdit';
import {User} from '@/types/User.ts';
import {DataTable} from '@/ui/data-table.tsx';
import DialogResponsive from '@/ui/dialogResponsive.tsx';

import {getColumns} from './columns.tsx';

const Table = () => {
  const {data, isLoading} = useUsers();

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
    <>
      <div className="flex flex-col gap-5">
        <DialogResponsive
          isOpen={addEdit.isOpen}
          setIsOpen={isOpen => {
            if (!isOpen) {
              setAddEdit({isOpen});
            }
          }}
          buttonLabel="Add new"
          classNames={{button: ['self-end']}}>
          <AddEdit prevData={addEdit.prevData} onOpenChange={handleAddEdit} />
        </DialogResponsive>
        {data && <DataTable columns={columns} data={data} isLoading={isLoading} />}
      </div>
    </>
  );
};

export default Table;
