import {Role} from '@/types/Role.ts';
import {Team} from '@/types/Team.ts';
import {User} from '@/types/User.ts';

type State = {
  players: User[];
  roles: Role[];
  winner: Team;
  firstKilled: {position: number | null; bonuses: number};
};

export const initialState: State = {
  players: [],
  roles: [],
  winner: 'RED',
  firstKilled: {
    position: null,
    bonuses: 0,
  },
};

export type Action =
  | {type: 'ADD_PLAYERS'; players: State['players']}
  | {type: 'ADD_ROLES'; roles: State['roles']}
  | {type: 'ADD_WINNER'; winner: State['winner']}
  | {
      type: 'ADD_FIRST_KILLED';
      firstKilled: {
        position: State['firstKilled']['position'];
        bonuses: State['firstKilled']['bonuses'];
      };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PLAYERS':
      return {...state, players: action.players};
    case 'ADD_ROLES':
      return {...state, roles: action.roles};
    case 'ADD_WINNER':
      return {...state, winner: action.winner};
    case 'ADD_FIRST_KILLED':
      return {
        ...state,
        firstKilled: {
          bonuses: action.firstKilled.bonuses,
          position: action.firstKilled.position,
        },
      };
    default:
      return state;
  }
};
