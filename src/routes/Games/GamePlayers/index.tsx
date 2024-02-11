import useGamePlayers from '@/hooks/game/useGamePlayers.ts';
import {Game} from '@/types/Game.ts';
import {DataTable} from '@/ui/data-table.tsx';

import {columns} from './columns.ts';

type Props = {
  id: Game['id'];
  onClose: () => void;
};

const GamePlayers = ({id}: Props) => {
  const {data, isLoading} = useGamePlayers({id});

  return (
    <div>
      {data && (
        <DataTable columns={columns} data={data} isLoading={isLoading} hideSearch hidePagination />
      )}
    </div>
  );
};

export default GamePlayers;
