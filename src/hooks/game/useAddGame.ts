import {useMutation, useQueryClient} from '@tanstack/react-query';
import {format} from 'date-fns';

import {addGame} from '@/requests/games';
import {State} from '@/routes/Games/AddEdit/reducer.ts';
import {useToast} from '@/ui/toast/use-toast.ts';

const useAddGame = (callback?: () => void) => {
  const {toast} = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add game'],
    mutationFn: (props: State) => {
      return addGame({
        winner: props.winner,
        date: format(props.date, 'yyyy-MM-dd'),
        notes: '',
        players_data: props.players.map((player, index) => {
          const {roles, points, firstKilled} = props;
          const {isWinner, bonusesWinners, bonusesLosers, breakLose, removed, vot} = points[index];
          const {position, bonuses} = firstKilled;
          return {
            role: roles[index],
            user_id: player.id,
            bonuses: isWinner ? bonusesWinners : bonusesLosers,
            break_and_lose: breakLose,
            first_killed: position === index,
            first_killed_boneses: position === index ? bonuses : 0,
            removed: removed,
            victory_opposing_team: vot,
            win: isWinner,
            position: index,
          };
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['games']});
      toast({
        title: 'Game added',
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

export default useAddGame;
