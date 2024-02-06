import {Role} from '@/types/Role.ts';
import {User} from '@/types/User.ts';

type State = {
  players: User[];
  roles: Role[];
};

export const initialState: State = {
  players: [],
  roles: [],
};

export type Action =
  | {type: 'ADD_PLAYERS'; players: State['players']}
  | {type: 'ADD_ROLES'; roles: State['roles']};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PLAYERS':
      return {...state, players: action.players};
    case 'ADD_ROLES':
      return {...state, roles: action.roles};
    default:
      return state;
  }
};
