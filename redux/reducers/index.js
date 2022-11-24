import { combineReducers } from 'redux';
import callReducer from './CallReducer';
import { chatReducer } from './ChatReducer';
import { FriendReducer } from './FriendReducer';
import peerReducer from './PeerReducer';
import { createSocket } from './SocketReducer';
import { UserReducer } from './UserReducer';

export const reducers = combineReducers({
  user: UserReducer,
  chat: chatReducer,
  socket: createSocket,
  peer: peerReducer,
  call: callReducer,
  friend: FriendReducer,
});
