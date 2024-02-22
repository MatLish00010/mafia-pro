import {useState} from 'react';

import useGames from '@/hooks/game/useGames.ts';
import useRemoveGame from '@/hooks/game/useRemoveGame.ts';
import useProfile from '@/hooks/useProfile';
import {accessConfig} from '@/lib/accessConfig.ts';
import AddEdit from '@/routes/Games/AddEdit';
import GamePlayers from '@/routes/Games/GamePlayers';
import {Game} from '@/types/Game.ts';
import {DataTable} from '@/ui/data-table.tsx';
import DialogResponsive from '@/ui/dialogResponsive.tsx';

import {getColumns} from './columns.tsx';

const Table = () => {
  const {data: profile} = useProfile();
  const {data, isLoading} = useGames();
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
    enableRemove: accessConfig.admins.includes(profile?.role || ''),
  });

  return (
    <>
      <div className="flex flex-col gap-5">
        <DialogResponsive
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          buttonLabel="Add new"
          disabledButton={!accessConfig.admins.includes(profile?.role || '')}
          classNames={{button: ['self-end']}}>
          <AddEdit onClose={() => setIsOpen(false)} />
        </DialogResponsive>
        {data && <DataTable columns={columns} data={data} isLoading={isLoading} hideSearch />}
      </div>
      <DialogResponsive
        isOpen={gamePlayersState.isOpen}
        setIsOpen={props => {
          if (!props) {
            setGamePlayersState({id: '', isOpen: props});
          }
        }}>
        <GamePlayers
          onClose={() => setGamePlayersState({id: '', isOpen: false})}
          id={gamePlayersState.id}
        />
      </DialogResponsive>
    </>
  );
};

export default Table;
