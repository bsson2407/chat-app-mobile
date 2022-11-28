import { Conversation, IMessage } from '../types/ChatTypes';
import axiosClient from './AxiosClient';

export const getAllMessageByConversation = (id) =>
  axiosClient.get(`/chat/allmessage/${id}`);
export const getAllConversationByUser = (id) =>
  axiosClient.get(`/chat/conver/${id}`);

export const postAddMemberToGroup = (data) =>
  axiosClient.post(`/group/addmembers`, data);
export const postKickMemberOutGroup = (data) =>
  axiosClient.post(`/group/delmembers`, data);
export const postLeaveGroup = (data) => axiosClient.post(`/group/leave`, data);
export const postCreateGroup = (data) =>
  axiosClient.post(`/group/create`, data);

export const postChangeAvatar = (data) =>
  axiosClient.post(`/group/changeavatar`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
export const postChangeName = (data) =>
  axiosClient.post(`/group/changename`, data);
export const postDeleteGroup = (data) =>
  axiosClient.post(`/group/delete`, data);
export const postChangeLeader = (data) =>
  axiosClient.post(`/group/changeleader`, data);
