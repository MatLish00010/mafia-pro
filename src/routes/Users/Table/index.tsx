import {useState} from 'react';

import useUsers from '@/hooks/useUsers.ts';
import AddEdit from '@/routes/Users/AddEdit';
import {User} from '@/types/User.ts';
import {Button} from '@/ui/button.tsx';
import {DataTable} from '@/ui/data-table.tsx';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/ui/dialog.tsx';

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

  const columns = getColumns({
    editAction: (id: User['id']) =>
      handleAddEdit(
        true,
        data?.find(item => item.id === id),
      ),
  });

  return (
    <>
      <div className="flex flex-col gap-5">
        <Button className="self-end" onClick={() => handleAddEdit(!addEdit.isOpen)}>
          Add new
        </Button>
        {data && <DataTable columns={columns} data={data} isLoading={isLoading} />}
      </div>
      <Dialog open={addEdit.isOpen} onOpenChange={handleAddEdit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Player</DialogTitle>
            <DialogDescription>Make changes. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <AddEdit
            isOpen={addEdit.isOpen}
            prevData={addEdit.prevData}
            onOpenChange={handleAddEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Table;
