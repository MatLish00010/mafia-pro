import {useMutation, useQueryClient} from '@tanstack/react-query';

import {editUser} from '@/requests/user';
import {DataForm} from '@/routes/Club/Tab/Players/AddEdit';
import {User} from '@/types/User.ts';
import {useToast} from '@/ui/toast/use-toast.ts';

const useEditUser = (callback?: () => void) => {
  const {toast} = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['edit user'],
    mutationFn: (props: DataForm & {id: User['id']}) => editUser(props),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']});
      toast({
        title: 'Player updated',
        description: 'Data will automatically updated',
      });
      callback && callback();
    },
    onError: error => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.message,
      });
    },
  });
};

export default useEditUser;
