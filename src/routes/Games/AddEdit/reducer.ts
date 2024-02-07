import {Role} from '@/types/Role.ts';
import {Team} from '@/types/Team.ts';
import {User} from '@/types/User.ts';

export type State = {
  players: User[];
  roles: Role[];
  winner: Team;
  firstKilled: {position: number | null; bonuses: number};
  points: {
    isWinner: boolean;
    removed: boolean;
    vot: boolean;
    breakLose: boolean;
    role: Role;
    bonusesWinners: number;
    bonusesLosers: number;
  }[];
};

export const initialState: State = {
  players: [],
  roles: [],
  winner: 'RED',
  firstKilled: {
    position: null,
    bonuses: 0,
  },
  points: [],
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
    }
  | {type: 'ADD_POINTS'; points: State['points']};

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
    case 'ADD_POINTS':
      return {...state, points: action.points};
    default:
      return state;
  }
};
