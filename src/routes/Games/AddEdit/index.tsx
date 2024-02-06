import {useReducer, useState} from 'react';

import {cn} from '@/lib/utils.ts';
import FirstKilled from '@/routes/Games/AddEdit/FirstKilled';
import {Role} from '@/types/Role.ts';
import {Team} from '@/types/Team.ts';
import {User} from '@/types/User.ts';
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

const AddEdit = () => {
  const [currentTub, setCurrentTub] = useState<TabVariant>(TabVariant.PLAYERS);
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmitPlayers = (players: User[]) => {
    dispatch({type: 'ADD_PLAYERS', players});
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

  return (
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
        <Players onSubmit={onSubmitPlayers} defaultValues={state.players} />
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
      <TabsContent value={TabVariant.POINTS} className="flex-1">
        <h1>Points</h1>
      </TabsContent>
    </Tabs>
  );
};

export default AddEdit;
