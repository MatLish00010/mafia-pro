import {useState} from 'react';

import useGames from '@/hooks/game/useGames.ts';
import useRemoveGame from '@/hooks/game/useRemoveGame.ts';
import {Game} from '@/types/Game.ts';
import {Tables} from '@/types/supabase.ts';
import {DataTable} from '@/ui/data-table.tsx';
import DialogResponsive from '@/ui/dialogResponsive.tsx';

import AddEdit from './AddEdit';
import GamePlayers from './GamePlayers';
import {getColumns} from './columns.tsx';

interface Props {
  club_id: Tables<'clubs'>['id'];
}

export default function Games({club_id}: Props) {
  const {data, isLoading} = useGames(club_id);
  const [isOpen, setIsOpen] = useState(false);
  const [gamePlayersState, setGamePlayersState] = useState<{
    isOpen: boolean;
    id: Game['id'];
  }>({
    isOpen: false,
    id: '',
  });

  const {mutate: removeMutate} = useRemoveGame();

  const columns = getColumns({
    editAction: () => null,
    removeAction: removeMutate,
    showPlayersAction: id => setGamePlayersState({id, isOpen: true}),
  });

  return (
    <div className="flex flex-col gap-5">
      <DialogResponsive
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonLabel="Add new"
        classNames={{button: ['self-end']}}>
        <AddEdit onClose={() => setIsOpen(false)} club_id={club_id} />
      </DialogResponsive>
      <DataTable columns={columns} data={data || []} isLoading={isLoading} hideSearch />
      <DialogResponsive
        isOpen={gamePlayersState.isOpen}
        setIsOpen={props => setGamePlayersState({id: '', isOpen: props})}>
        <GamePlayers
          onClose={() => setGamePlayersState({id: '', isOpen: false})}
          id={gamePlayersState.id}
        />
      </DialogResponsive>
    </div>
  );
}
