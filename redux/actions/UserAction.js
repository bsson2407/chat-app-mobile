import { UserTypes } from '../types/UserTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

// -------------- LOGIN
export const loginUserRequest = (data, callback) => {
  console.log('loginUserRequest', data);

  return {
    type: UserTypes.LOGIN_USER_REQUEST,
    payload: data,
    callback,
  };
};

export const loginUserSuccess = (data) => {
  console.log('loginUserSuccess', data);
  return {
    type: UserTypes.LOGIN_USER_SUCCESS,
    payload: data,
  };
};

export const loginUserFailure = (error) => {
  console.log('loginUserFailure', error);
  return {
    type: UserTypes.LOGIN_USER_FAILURE,
    payload: error,
  };
};

// -------------- REGISTER
export const registerUserRequest = (data, callback) => {
  return {
    type: UserTypes.REGISTER_USER_REQUEST,
    payload: data,
    callback,
  };
};

export const registerUserSuccess = (data) => {
  return {
    type: UserTypes.REGISTER_USER_SUCCESS,
    payload: data,
  };
};

export const registerUserFailure = (error) => {
  return {
    type: UserTypes.REGISTER_USER_FAILURE,
    payload,
  };
};

// -------------- LOGOUT
export const logoutUserRequest = () => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('refeshToken');
  return {
    type: UserTypes.LOGOUT_USER_REQUEST,
  };
};

export const logoutUserSuccess = (message) => {
  return {
    type: UserTypes.LOGOUT_USER_SUCCESS,
    payload,
  };
};

export const logoutUserFailure = (error) => {
  return {
    type: UserTypes.LOGOUT_USER_FAILURE,
    payload,
  };
};

// -------------- SEARCH USER BY PHONE OR EMAIL
export const searchUserRequest = (data) => {
  return {
    type: UserTypes.SEARCH_USER_REQUEST,
    payload: data,
  };
};
export const searchUserSuccess = (data) => {
  return {
    type: UserTypes.SEARCH_USER_SUCCESS,
    payload: data,
  };
};
export const searchUserFailure = (error) => {
  return {
    type: UserTypes.SEARCH_USER_FAILURE,
    payload,
  };
};

// -------------- SEARCH USER BY PHONE OR EMAIL
export const searchUserExistRequest = (data) => {
  return {
    type: UserTypes.SEARCH_USER_EXIST_REQUEST,
    payload: data,
  };
};
export const searchUserExistSuccess = (data) => {
  return {
    type: UserTypes.SEARCH_USER_EXIST_SUCCESS,
    payload: data,
  };
};
export const searchUserExistFailure = (error) => {
  return {
    type: UserTypes.SEARCH_USER_EXIST_FAILURE,
    payload,
  };
};

// -------------- CHECK OTP
export const checkOtpRequest = (data, callback) => {
  return {
    type: UserTypes.CHECK_OTP_REQUEST,
    payload: data,
    callback,
  };
};

export const checkOtpSuccess = (data) => {
  return {
    type: UserTypes.CHECK_OTP_SUCCESS,
    payload: data,
  };
};

export const checkOtpFailure = (error) => {
  return {
    type: UserTypes.CHECK_OTP_FAILURE,
    payload,
  };
};

// -------------- UPDATE PASWORD
export const updatePasswordRequest = (data, callback) => {
  return {
    type: UserTypes.UPDATE_PASSWORD_REQUEST,
    payload: data,
    callback,
  };
};

export const updatePasswordSuccess = (data) => {
  return {
    type: UserTypes.UPDATE_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const updatePasswordFailure = (error) => {
  return {
    type: UserTypes.UPDATE_PASSWORD_FAILURE,
    payload,
  };
};

// -------------- UPDATE PROFILE
export const updateProfileRequest = (data) => {
  return {
    type: UserTypes.UPDATE_PROFILE_REQUEST,
    payload: data,
  };
};

export const updateProfileSuccess = (data) => {
  return {
    type: UserTypes.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};

export const updateProfileFailure = (error) => {
  return {
    type: UserTypes.UPDATE_PROFILE_FAILURE,
    payload,
  };
};

// -------------- GET NEW ACCESS TOKEN
export const getNewTokenRequest = (refeshToken) => {
  return {
    type: UserTypes.GET_NEW_TOKEN_REQUEST,
    payload: refeshToken,
  };
};

export const getNewTokenSuccess = (tokens) => {
  return {
    type: UserTypes.GET_NEW_TOKEN_SUCCESS,
    payload: tokens,
  };
};

export const getNewTokenFailure = (error) => {
  return {
    type: UserTypes.GET_NEW_TOKEN_FAILURE,
    payload,
  };
};

// -------------- GET USER BY ID
export const getUserByIdRequest = (id) => {
  return {
    type: UserTypes.GET_USER_BY_ID_REQUEST,
    payload: id,
  };
};
export const getUserByIdSuccess = (data) => {
  return {
    type: UserTypes.GET_USER_BY_ID_SUCCESS,
    payload: data,
  };
};
export const getUserByIdFailure = (message) => {
  return {
    type: UserTypes.GET_USER_BY_ID_REQUEST,
    payload,
  };
};

// -------------- CREATE GROUP
export const unFriendRequest = (data) => {
  return {
    type: UserTypes.UN_FRIEND_REQUEST,
    payload: data,
  };
};
export const unFriendSuccess = (data) => {
  getCurrentSocket().emit('unFriend', data);
  return {
    type: UserTypes.UN_FRIEND_SUCCESS,
    payload: data,
  };
};
export const unFriendFailure = (message) => {
  return {
    type: UserTypes.UN_FRIEND_FAILURE,
    payload: message,
  };
};

// -------------- GET USER BY ID
export const getFriendByIdRequest = (id) => {
  return {
    type: UserTypes.GET_FRIEND_BY_ID_REQUEST,
    payload: id,
  };
};
export const getFriendByIdSuccess = (data) => {
  return {
    type: UserTypes.GET_FRIEND_BY_ID_SUCCESS,
    payload: data,
  };
};
export const getFriendByIdFailure = (message) => {
  return {
    type: UserTypes.GET_FRIEND_BY_ID_FAILURE,
    payload,
  };
};

// -------------- UPDATE AVATAR
export const updateAvatarRequest = (data) => {
  return {
    type: UserTypes.UPDATE_AVATAR_REQUEST,
    payload: data,
  };
};
export const updateAvatarSuccess = (data) => {
  return {
    type: UserTypes.UPDATE_AVATAR_SUCCESS,
    payload: data,
  };
};
export const updateAvatarFailure = (message) => {
  return {
    type: UserTypes.UPDATE_AVATAR_FAILURE,
    payload,
  };
};

// -------------- GET ALL FRIENDS
export const getAllFriendRequest = (id) => {
  return {
    type: UserTypes.GET_ALL_FRIEND_REQUEST,
    payload: id,
  };
};
export const getAllFriendSuccess = (data) => {
  return {
    type: UserTypes.GET_ALL_FRIEND_SUCCESS,
    payload: data,
  };
};
export const getAllFriendFailure = (error) => {
  return {
    type: UserTypes.GET_ALL_FRIEND_FAILURE,
    payload,
  };
};

// -------------- GET ALL PEOPLE REQUEST
export const getAllPeopleRequestRequest = (id) => {
  return {
    type: UserTypes.GET_ALL_PEOPLE_REQUEST_REQUEST,
    payload: id,
  };
};
export const getAllPeopleRequestSuccess = (data) => {
  return {
    type: UserTypes.GET_ALL_PEOPLE_REQUEST_SUCCESS,
    payload: data,
  };
};
export const getAllPeopleRequestFailure = (error) => {
  return {
    type: UserTypes.GET_ALL_PEOPLE_REQUEST_FAILURE,
    payload,
  };
};

// -------------- SAVE INFO USER TO STATE
export const saveInfoUser = (user) => {
  return {
    type: UserTypes.SAVE_INFO_USER,
    payload: user,
  };
};

// -------------- DELETE USER STATE
export const clearUserState = () => {
  return {
    type: UserTypes.CLEAR_USER_STATE,
  };
};

// -------------- GET OTP
export const getEmailRequest = (data) => {
  console.log('getEmailRequest', data);
  return {
    type: UserTypes.GET_EMAIL_REQUEST,
    payload: data,
  };
};

export const getEmailSuccess = (data) => {
  console.log('getEmailSuccess', data);

  return {
    type: UserTypes.GET_EMAIL_SUCCESS,
    payload: data,
  };
};

export const getEmailFailure = (error) => {
  return {
    type: UserTypes.GET_EMAIL_FAILURE,
    payload,
  };
};

// -------------- SAVE EMAIL USER TO STATE
export const saveEmailUser = (data) => {
  AsyncStorage.setItem('emailUserResetPass', JSON.stringify(data));
  return {
    type: UserTypes.SAVE_EMAIL_USER,
    payload: data,
  };
};

// -------------- SAVE EMAIL USER TO STATE
export const saveEmailUserRegister = (data) => {
  const flag = {
    email: data.email,
  };
  AsyncStorage.setItem('emailUserRegister', JSON.stringify(flag));
  return {
    type: UserTypes.SAVE_EMAIL_USER_REGISTER,
    payload: flag,
  };
};
