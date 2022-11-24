import { ActionTypes } from '../types/ActionTypes';

const initialState = null;

const peerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PEER:
      return action.payload;
    default:
      return state;
  }
};

export default peerReducer;
