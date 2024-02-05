import {useMutation, useQueryClient} from '@tanstack/react-query';

import {removeUser} from '@/requests/user';
import {User} from '@/types/User.ts';
import {useToast} from '@/ui/toast/use-toast.ts';

const useRemoveUser = (callback?: () => void) => {
  const {toast} = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['remove user'],
    mutationFn: (props: User['id']) => removeUser(props),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']});
      toast({
        title: 'Player removed',
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

export default useRemoveUser;
