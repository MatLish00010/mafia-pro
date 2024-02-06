import {Role} from '@/types/Role.ts';
import {Team} from '@/types/Team.ts';
import {User} from '@/types/User.ts';

type State = {
  players: User[];
  roles: Role[];
  winner: Team;
};

export const initialState: State = {
  players: [],
  roles: [],
  winner: 'RED',
};

export type Action =
  | {type: 'ADD_PLAYERS'; players: State['players']}
  | {type: 'ADD_ROLES'; roles: State['roles']}
  | {type: 'ADD_WINNER'; winner: State['winner']};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PLAYERS':
      return {...state, players: action.players};
    case 'ADD_ROLES':
      return {...state, roles: action.roles};
    case 'ADD_WINNER':
      return {...state, winner: action.winner};
    default:
      return state;
  }
};
