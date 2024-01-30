import useUsers from '@/hooks/useUsers.ts';

const Users = () => {
  const {data, isLoading} = useUsers();

  return (
    <div>
      {isLoading && <p>Loading Data</p>}
      {!!data &&
        data.map(item => (
          <div key={item.id}>
            <p>Nick: {item.nick}</p>
            <p>Birthday: {item.data_birthday}</p>
          </div>
        ))}
    </div>
  );
};

export default Users;
