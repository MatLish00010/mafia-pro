import {useMutation, useQueryClient} from '@tanstack/react-query';
import {format} from 'date-fns';

import {addGame} from '@/requests/games';
import {State} from '@/routes/Games/AddEdit/reducer.ts';
import {Tables} from '@/types/supabase.ts';
import {useToast} from '@/ui/toast/use-toast.ts';

interface Props {
  body: State;
  club_id: Tables<'clubs'>['id'];
}

const useAddGame = (callback?: () => void) => {
  const {toast} = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add game'],
    mutationFn: ({body, club_id}: Props) => {
      return addGame({
        winner: body.winner,
        date: format(body.date, 'yyyy-MM-dd'),
        club_id,
        notes: '',
        players_data: body.players.map((player, index) => {
          const {roles, points, firstKilled, fines} = body;
          const {isWinner, bonusesWinners, bonusesLosers, wills} = points[index];
          const {breakLose, removed, vot, handLose} = fines[index];
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
            hand_lose: handLose,
            wills,
          };
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['games']});
      queryClient.invalidateQueries({queryKey: ['rating']});
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
