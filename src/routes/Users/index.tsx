import useAddUser from '@/hooks/useAddUser.ts';
import useUsers from '@/hooks/useUsers.ts';
import {Button} from '@/ui/button.tsx';

const Users = () => {
  const {data, isLoading} = useUsers();
  const {mutate} = useAddUser();

  return (
    <div className="flex justify-between">
      <div>
        {isLoading && <p>Loading Data</p>}
        {!!data &&
          data.map(item => (
            <div key={item.id} className="mb-5">
              <p>Nick: {item.nick}</p>
              <p>Birthday: {item.data_birthday}</p>
            </div>
          ))}
      </div>

      <Button onClick={() => mutate()}>Add new Player</Button>
    </div>
  );
};

export default Users;
