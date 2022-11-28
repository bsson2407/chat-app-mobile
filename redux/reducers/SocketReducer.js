/* eslint-disable @typescript-eslint/no-unused-vars */
import { io } from 'socket.io-client';

// const ENDPOINT = 'http://localhost:5000';
const ENDPOINT = 'https://chat-app-server-production-370f.up.railway.app';
// https://chap-app-cnmoi.herokuapp.com/
let socket = null;

export const createSocket = () => {
  if (socket !== null) {
    return socket;
  }
  return (socket = io(ENDPOINT));
};
export const getCurrentSocket = () => {
  return socket;
};
