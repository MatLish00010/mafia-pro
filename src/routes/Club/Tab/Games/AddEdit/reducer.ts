import {Role} from '@/types/Role.ts';
import {Team} from '@/types/Team.ts';
import {User} from '@/types/User.ts';

export type State = {
  date: Date;
  players: User[];
  roles: Role[];
  winner: Team;
  firstKilled: {position: number | null; bonuses: number};
  points: {
    isWinner: boolean;
    role: Role;
    bonusesWinners: number;
    bonusesLosers: number;
    wills: number;
  }[];
  fines: {
    removed: boolean;
    handLose: boolean;
    vot: boolean;
    breakLose: boolean;
  }[];
};

export const initialState: State = {
  date: new Date(),
  players: [],
  roles: [],
  winner: 'RED',
  firstKilled: {
    position: null,
    bonuses: 0,
  },
  points: [],
  fines: [],
};

export type Action =
  | {type: 'ADD_PLAYERS'; props: {players: State['players']; date: Date}}
  | {type: 'ADD_ROLES'; roles: State['roles']}
  | {type: 'ADD_WINNER'; winner: State['winner']}
  | {
      type: 'ADD_FIRST_KILLED';
      firstKilled: {
        position: State['firstKilled']['position'];
        bonuses: State['firstKilled']['bonuses'];
      };
    }
  | {type: 'ADD_POINTS'; points: State['points']}
  | {type: 'ADD_WILLS'; fines: State['fines']};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PLAYERS':
      return {...state, players: action.props.players, date: action.props.date};
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
    case 'ADD_WILLS':
      return {...state, fines: action.fines};
    default:
      return state;
  }
};
