import {useReducer, useState} from 'react';

import useAddGame from '@/hooks/game/useAddGame.ts';
import {cn} from '@/lib/utils.ts';
import FinalTable from '@/routes/Games/AddEdit/FinalTable';
import FirstKilled from '@/routes/Games/AddEdit/FirstKilled';
import Points from '@/routes/Games/AddEdit/Points';
import {DataForm} from '@/routes/Games/AddEdit/Points/types.ts';
import {Role} from '@/types/Role.ts';
import {Team} from '@/types/Team.ts';
import {User} from '@/types/User.ts';
import DialogResponsive from '@/ui/dialogResponsive.tsx';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/ui/tabs.tsx';

import Players from './Players';
import Roles from './Roles';
import Winner from './Winner';
import {initialState, reducer} from './reducer.ts';

enum TabVariant {
  PLAYERS = 'players',
  ROLES = 'roles',
  WINNER = 'winner',
  FIRST_KILLED = 'first_killed',
  POINTS = 'points',
}

type Props = {
  onClose: () => void;
};

const AddEdit = ({onClose}: Props) => {
  const [currentTub, setCurrentTub] = useState<TabVariant>(TabVariant.PLAYERS);
  const [isOpenFinalTable, setIsOpenFinalTable] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {mutate} = useAddGame();

  const onSubmitPlayers = (props: {players: User[]; date: Date}) => {
    dispatch({type: 'ADD_PLAYERS', props});
    setCurrentTub(TabVariant.ROLES);
  };

  const onSubmitRoles = (roles: Role[]) => {
    dispatch({type: 'ADD_ROLES', roles});
    setCurrentTub(TabVariant.WINNER);
  };

  const onSubmitWinner = (winner: Team) => {
    dispatch({type: 'ADD_WINNER', winner});
    setCurrentTub(TabVariant.FIRST_KILLED);
  };

  const onSubmitFirstKilled = (FKData: {firstKilled: null | number; bonuses: number}) => {
    dispatch({
      type: 'ADD_FIRST_KILLED',
      firstKilled: {position: FKData.firstKilled, bonuses: FKData.bonuses},
    });
    setCurrentTub(TabVariant.POINTS);
  };

  const onSubmitPoints = (points: DataForm['points']) => {
    dispatch({
      type: 'ADD_POINTS',
      points,
    });
    setIsOpenFinalTable(true);
  };

  const onFinalSubmit = () => {
    setIsOpenFinalTable(false);
    mutate(state);
    onClose();
  };

  return (
    <>
      <Tabs value={currentTub} className="min-h-[500px] mt-4 flex flex-col gap-7">
        <TabsList className="w-full">
          <TabsTrigger
            value={TabVariant.PLAYERS}
            onClick={() => setCurrentTub(TabVariant.PLAYERS)}
            className="flex-1">
            Players
          </TabsTrigger>
          <TabsTrigger
            disabled={!state.players.length}
            value={TabVariant.ROLES}
            onClick={() => setCurrentTub(TabVariant.ROLES)}
            className="flex-1">
            Roles
          </TabsTrigger>
          <TabsTrigger
            disabled={!state.roles.length}
            value={TabVariant.WINNER}
            onClick={() => setCurrentTub(TabVariant.WINNER)}
            className="flex-1">
            Winner
          </TabsTrigger>
          <TabsTrigger
            disabled={!state.roles.length}
            value={TabVariant.FIRST_KILLED}
            onClick={() => setCurrentTub(TabVariant.FIRST_KILLED)}
            className="flex-1">
            Fist killed
          </TabsTrigger>
          <TabsTrigger
            disabled={!state.roles.length}
            value={TabVariant.POINTS}
            onClick={() => setCurrentTub(TabVariant.POINTS)}
            className="flex-1">
            Points
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TabVariant.PLAYERS} className="flex-1">
          <Players
            onSubmit={onSubmitPlayers}
            defaultValues={{
              players: state.players,
              date: state.date,
            }}
          />
        </TabsContent>
        <TabsContent value={TabVariant.ROLES} className="flex-1">
          <Roles players={state.players} onSubmit={onSubmitRoles} defaultValues={state.roles} />
        </TabsContent>
        <TabsContent
          value={TabVariant.WINNER}
          className={cn([currentTub === TabVariant.WINNER && 'flex', 'flex-1'])}>
          <Winner onSubmit={onSubmitWinner} defaultValues={state.winner} />
        </TabsContent>
        <TabsContent
          value={TabVariant.FIRST_KILLED}
          className={cn([currentTub === TabVariant.FIRST_KILLED && 'flex', 'flex-1'])}>
          <FirstKilled
            players={state.players}
            onSubmit={onSubmitFirstKilled}
            defaultValues={{
              firstKilledPosition: state.firstKilled.position,
              bonuses: state.firstKilled.bonuses !== null ? state.firstKilled.bonuses : undefined,
            }}
          />
        </TabsContent>
        <TabsContent
          value={TabVariant.POINTS}
          className={cn([currentTub === TabVariant.POINTS && 'flex', 'flex-1'])}>
          <Points
            roles={state.roles}
            players={state.players}
            winnerTeam={state.winner}
            onSubmit={onSubmitPoints}
            defaultValues={state.points}
          />
        </TabsContent>
      </Tabs>
      <DialogResponsive isOpen={isOpenFinalTable} setIsOpen={setIsOpenFinalTable}>
        <FinalTable
          state={state}
          onSubmit={onFinalSubmit}
          onCancel={() => setIsOpenFinalTable(false)}
        />
      </DialogResponsive>
    </>
  );
};

export default AddEdit;
