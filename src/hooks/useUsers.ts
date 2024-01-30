import {useQuery} from '@tanstack/react-query';

import {getUsers} from '@/requests';

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    placeholderData: [],
  });
};

export default useUsers;
