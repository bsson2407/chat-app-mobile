import axios from 'axios';
import axiosClient from './AxiosClient';

export const getAllUsers = () => axiosClient.get('/user');
export const login = (data) => {
  return axiosClient.post('/user/login', data);
  // return axios.post('https://chap-app-cnmoi.herokuapp.com/user/login', data);
};
export const register = (data) => {
  return axiosClient.post('/user/register', data);
};

export const getUserById = (id) => axiosClient.get(`/user/me/${id}`);
export const getConversationById = (id) =>
  axiosClient.get(`/user/conver/${id}`);
export const updateAvatar = (data) =>
  axiosClient.patch('/user/avatar', data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
export const searchUser = (data) => axiosClient.post('/user/search', data);
export const searchUserExist = (data) =>
  axiosClient.post('/user/searchExist', data);
export const addFriend = (data) => axiosClient.post('/user/invite', data);
export const updateProfile = (data) => axiosClient.post('/user/update', data);
export const getEmail = (data) => {
  return axiosClient.post('/user/sendmail', data);
};
export const checkOtp = (otp) => {
  return axiosClient.post('/user/checkotp', otp);
};
export const updatePassword = (dataPass) =>
  axiosClient.post('/user/updatepassword', dataPass);
export const getNewToken = (refeshToken) =>
  axiosClient.post('/user/getnewtoken', refeshToken);

export const getAllPeopleRequest = (id) =>
  axiosClient.get(`/user/getAllPeopleRequest/${id}`);
// export const addFriendRequest = (
//   userToId,
//   userFromId
// ): Promise<Friend> => axiosClient.post(`/user/invite/${userToId}`, userFromId);
export const getAllFriend = (id) => axiosClient.get(`/user/getAllFriend/${id}`);
export const unFriend = (data) => axiosClient.post('/user/unfriend', data);
