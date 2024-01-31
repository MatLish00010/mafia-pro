import {useMutation, useQueryClient} from '@tanstack/react-query';

import {addUser} from '@/requests';
import {DataForm} from '@/routes/Users/AddEdit';
import {useToast} from '@/ui/toast/use-toast.ts';

const useAddUser = (callback?: () => void) => {
  const {toast} = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add user'],
    mutationFn: (props: DataForm) => addUser(props),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']});
      toast({
        title: 'Player added',
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

export default useAddUser;
