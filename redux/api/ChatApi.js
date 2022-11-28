import { Conversation, IMessage } from '../types/ChatTypes';
import axiosClient from './AxiosClient';

export const getAllMessageByConversation = (id) =>
  axiosClient.get(`/chat/allmessage/${id}`);
export const getAllConversationByUser = (id) =>
  axiosClient.get(`/chat/conver/${id}`);
export const sendMessage = (data) => axiosClient.post(`/chat/message`, data);

export const sendImage = (data) => {
  console.log('sendImage', data);
  return axiosClient.post(`/chat/images`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};
// export const sendVideo = (data) =>
//   axiosClient.post(`/chat/video`, data);
export const sendFile = (data) => {
  console.log('sendFile', data);
  return axiosClient.post(`/chat/file`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteOnlyMe = (data) => axiosClient.post(`/chat/delete`, data);
export const deleteAllMe = (data) => axiosClient.post(`/chat/deleteAll`, data);
