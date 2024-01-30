import {useMutation, useQueryClient} from '@tanstack/react-query';

import {addUser} from '@/requests';

const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add user'],
    mutationFn: () => {
      return addUser({nick: 'Vito', data_birthday: '1920-06-15'});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']});
    },
  });
};

export default useAddUser;
