import {useState} from 'react';

import AddEdit from '@/routes/Users/AddEdit';
import Table from '@/routes/Users/Table';
import {Button} from '@/ui/button.tsx';

const Users = () => {
  const [isOpenAddEdit, setIsOpenAddEdit] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-5">
        <Button className="self-end" onClick={() => setIsOpenAddEdit(!isOpenAddEdit)}>
          Add new
        </Button>
        <Table />
      </section>
      <AddEdit isOpen={isOpenAddEdit} onOpenChange={setIsOpenAddEdit} />
    </>
  );
};

export default Users;
