import {useMutation, useQueryClient} from '@tanstack/react-query';

import {removeGame} from '@/requests/games';
import {Game} from '@/types/Game.ts';
import {useToast} from '@/ui/toast/use-toast.ts';

const useRemoveGame = () => {
  const {toast} = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['remove game'],
    mutationFn: (id: Game['id']) => removeGame(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['games']});
      queryClient.invalidateQueries({queryKey: ['rating']});
      toast({
        title: 'Game removed',
        description: 'Data will automatically updated',
      });
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

export default useRemoveGame;
