import {useEffect, useState} from 'react';

import useClubs from '@/hooks/club/useClubs.ts';
import useGames from '@/hooks/game/useGames.ts';
import GamePlayers from '@/routes/Games/GamePlayers';
import {Game} from '@/types/Game.ts';
import {Tables} from '@/types/supabase.ts';
import {DataTable} from '@/ui/data-table.tsx';
import DialogResponsive from '@/ui/dialogResponsive.tsx';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/ui/select.tsx';

import {getColumns} from './columns.tsx';

const Table = () => {
  const {data: clubs, isLoading: isLoadingClubs} = useClubs();

  const [club, setClub] = useState<Tables<'clubs'>['id'] | undefined>(
    clubs ? clubs[0]?.id : undefined,
  );

  const {data, isLoading} = useGames(club === 'all' ? undefined : club);

  const [gamePlayersState, setGamePlayersState] = useState<{
    isOpen: boolean;
    id: Game['id'];
  }>({
    isOpen: false,
    id: '',
  });

  const columns = getColumns({
    showPlayersAction: id => setGamePlayersState({id, isOpen: true}),
  });

  useEffect(() => {
    if (clubs?.length) {
      setClub(clubs[0].id);
    }
  }, [clubs]);

  return (
    <div className="flex flex-col items-start gap-5">
      <Select onValueChange={val => setClub(val)} defaultValue={'all'}>
        <SelectTrigger className="gap-2 w-50">
          <p className="font-light text-xs">Club:</p>
          <SelectValue className="ml-auto" placeholder="Choose club" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="all" value="all">
            All
          </SelectItem>
          {clubs?.map(item => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-full">
        <DataTable
          columns={columns}
          data={data || []}
          isLoading={isLoading || isLoadingClubs}
          hideSearch
        />
      </div>

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
};

export default Table;
