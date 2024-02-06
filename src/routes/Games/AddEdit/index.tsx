import {useReducer, useState} from 'react';

import Roles from '@/routes/Games/AddEdit/Roles';
import {Role} from '@/types/Role.ts';
import {User} from '@/types/User.ts';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/ui/tabs.tsx';

import Players from './Players';
import {initialState, reducer} from './reducer.ts';

enum TabVariant {
  PLAYERS = 'players',
  ROLES = 'roles',
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
    setCurrentTub(TabVariant.POINTS);
  };

  return (
    <Tabs value={currentTub} className="min-h-[400px] mt-4">
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
          value={TabVariant.POINTS}
          onClick={() => setCurrentTub(TabVariant.POINTS)}
          className="flex-1">
          Points
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TabVariant.PLAYERS} className="mt-7">
        <Players onSubmit={onSubmitPlayers} defaultValues={state.players} />
      </TabsContent>
      <TabsContent value={TabVariant.ROLES} className="mt-7">
        <Roles players={state.players} onSubmit={onSubmitRoles} defaultValues={state.roles} />
      </TabsContent>
      <TabsContent value={TabVariant.POINTS} className="mt-7">
        <Roles players={state.players} onSubmit={onSubmitRoles} />
      </TabsContent>
    </Tabs>
  );
};

export default AddEdit;
