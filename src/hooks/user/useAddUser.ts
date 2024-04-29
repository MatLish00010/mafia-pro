import {useMutation, useQueryClient} from '@tanstack/react-query';

import {addUser} from '@/requests/user';
import {DataForm} from '@/routes/Users/AddEdit';
import {Tables} from '@/types/supabase.ts';
import {useToast} from '@/ui/toast/use-toast.ts';

interface Props {
  body: DataForm;
  club_id: Tables<'clubs'>['id'];
}

const useAddUser = (callback?: () => void) => {
  const {toast} = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add user'],
    mutationFn: (props: Props) => addUser({...props.body, club_id: props.club_id}),
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
