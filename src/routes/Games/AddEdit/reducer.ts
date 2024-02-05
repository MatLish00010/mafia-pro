import {User} from '@/types/User.ts';

type State = {
  players: User[];
};

export const initialState: State = {
  players: [],
};

export type Action = {type: 'ADD_PLAYERS'; players: State['players']};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PLAYERS':
      return {...state, players: action.players};
    default:
      return state;
  }
};
