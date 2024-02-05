import {useState} from 'react';

import AddEdit from '@/routes/Games/AddEdit';
import DialogResponsive from '@/ui/dialogResponsive.tsx';

const Table = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <h1>Users T</h1>
      <DialogResponsive isOpen={isOpen} setIsOpen={setIsOpen} buttonLabel="Add new">
        <AddEdit />
      </DialogResponsive>
    </>
  );
};

export default Table;
