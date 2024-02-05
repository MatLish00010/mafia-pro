import {useReducer} from 'react';

import {User} from '@/types/User.ts';

import Players from './Players';
import {initialState, reducer} from './reducer.ts';

const AddEdit = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmitPlayers = (data: User[]) => {
    dispatch({type: 'ADD_PLAYERS', players: data});
  };

  return (
    <>
      <Players onSubmit={onSubmitPlayers} defaultValues={state.players} />
    </>
  );
};

export default AddEdit;
