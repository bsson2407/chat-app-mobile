import { ActionTypes } from '../types/ActionTypes';

const initialState = null;
const callReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CALL: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default callReducer;
