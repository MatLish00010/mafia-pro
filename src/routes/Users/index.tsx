import useAddUser from '@/hooks/useAddUser.ts';
import Table from '@/routes/Users/Table';
import {Button} from '@/ui/button.tsx';

const Users = () => {
  const {mutate} = useAddUser();

  return (
    <section className="flex flex-col gap-5">
      <Button className="self-end" onClick={() => mutate()}>
        Add new Player
      </Button>
      <Table />
    </section>
  );
};

export default Users;
