import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
// import { call, put, takeLatest, takeEvery } from '@redux-saga/core/effects';

// import {takeEvery}
import {
  checkOtpFailure,
  checkOtpSuccess,
  getAllFriendFailure,
  getAllFriendSuccess,
  getAllPeopleRequestFailure,
  getAllPeopleRequestSuccess,
  getEmailFailure,
  getEmailSuccess,
  getFriendByIdFailure,
  getFriendByIdSuccess,
  getNewTokenFailure,
  getNewTokenSuccess,
  getUserByIdFailure,
  getUserByIdSuccess,
  loginUserFailure,
  loginUserSuccess,
  registerUserFailure,
  registerUserSuccess,
  searchUserExistFailure,
  searchUserExistSuccess,
  searchUserFailure,
  searchUserSuccess,
  unFriendFailure,
  unFriendSuccess,
  updateAvatarFailure,
  updateAvatarSuccess,
  updatePasswordFailure,
  updatePasswordSuccess,
  updateProfileFailure,
  updateProfileSuccess,
} from '../actions/UserAction';
import {
  checkOtp,
  getAllFriend,
  getAllPeopleRequest,
  getEmail,
  getNewToken,
  getUserById,
  login,
  register,
  searchUser,
  searchUserExist,
  unFriend,
  updateAvatar,
  updatePassword,
  updateProfile,
} from '../api/UserApi';
import { UserTypes } from '../types/UserTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setItem } from '../asyncStore';

function* RegisterSaga(action) {
  try {
    const user = yield call(register, action.payload);

    // AsyncStorage.setItem('refeshToken', JSON.stringify(user.refeshToken));
    yield put(registerUserSuccess(user));
    action.callback();
  } catch (error) {
    yield put(registerUserFailure(error));
  }
}

function* LoginSaga(action) {
  try {
    const user = yield call(login, action.payload);
    setItem('token', JSON.stringify(user.token));
    setItem('refeshToken', JSON.stringify(user.refeshToken));

    yield put(loginUserSuccess(user));
    action.callback();
  } catch (error) {
    // const err =
    yield put(loginUserFailure(error.response.data));
  }
}

function* SearchUserSaga(action) {
  try {
    const result = yield call(searchUser, action.payload);
    yield put(searchUserSuccess(result));
  } catch (error) {
    yield put(searchUserFailure(error));
  }
}

function* SearchUserExistSaga(action) {
  try {
    const result = yield call(searchUserExist, action.payload);
    yield put(searchUserExistSuccess(result));
  } catch (error) {
    yield put(searchUserExistFailure(error));
  }
}

function* GetEmailSaga(action) {
  try {
    const result = yield call(getEmail, action.payload);

    yield put(getEmailSuccess(result));
  } catch (error) {
    yield put(getEmailFailure(error));
  }
}

function* UnFriendSaga(action) {
  try {
    const conversation = yield call(unFriend, action.payload);
    yield put(unFriendSuccess(conversation));
  } catch (error) {
    yield put(unFriendFailure(error));
  }
}

function* CheckOtpSaga(action) {
  try {
    const result = yield call(checkOtp, action.payload);
    yield put(checkOtpSuccess(result));
    // document.location.href = '/newpass';
    action.callback();
  } catch (error) {
    yield put(checkOtpFailure(error));
  }
}

function* UpdatePasswordSaga(action) {
  try {
    const result = yield call(updatePassword, action.payload);
    yield put(updatePasswordSuccess(result));
    action.callback();
  } catch (error) {
    yield put(updatePasswordFailure(error));
  }
}

function* UpdateProfileSaga(action) {
  try {
    const result = yield call(updateProfile, action.payload);

    yield put(updateProfileSuccess(result));
  } catch (error) {
    yield put(updateProfileFailure(error));
  }
}

function* GetNewTokenSaga(action) {
  try {
    const result = yield call(getNewToken, action.payload);
    AsyncStorage.setItem('token', JSON.stringify(result.accessToken));
    AsyncStorage.setItem('refeshToken', JSON.stringify(result.refeshToken));
    yield put(getNewTokenSuccess(result));
  } catch (error) {
    yield put(getNewTokenFailure(error));
  }
}

function* GetUserByIdSaga(action) {
  try {
    const user = yield call(getUserById, action.payload);
    yield put(getUserByIdSuccess(user));
  } catch (error) {
    yield put(getUserByIdFailure(error));
  }
}

function* GetFriendByIdSaga(action) {
  try {
    const user = yield call(getUserById, action.payload);
    yield put(getFriendByIdSuccess(user));
  } catch (error) {
    yield put(getFriendByIdFailure(error));
  }
}

function* UpdateAvatarSaga(action) {
  try {
    const result = yield call(updateAvatar, action.payload);
    yield put(updateAvatarSuccess(result));
  } catch (error) {
    yield put(updateAvatarFailure(error));
  }
}

function* GetAllFriendSaga(action) {
  try {
    const result = yield call(getAllFriend, action.payload);
    yield put(getAllFriendSuccess(result));
  } catch (error) {
    yield put(getAllFriendFailure(error));
  }
}

function* GetAllPeopleRequestSaga(action) {
  try {
    const result = yield call(getAllPeopleRequest, action.payload);
    yield put(getAllPeopleRequestSuccess(result));
  } catch (error) {
    yield put(getAllPeopleRequestFailure(error));
  }
}

function* UserSaga() {
  yield takeEvery(UserTypes.LOGIN_USER_REQUEST, LoginSaga);
  yield takeEvery(UserTypes.REGISTER_USER_REQUEST, RegisterSaga);
  yield takeLatest(UserTypes.SEARCH_USER_REQUEST, SearchUserSaga);

  yield takeLatest(UserTypes.SEARCH_USER_EXIST_REQUEST, SearchUserExistSaga);

  yield takeLatest(UserTypes.GET_USER_BY_ID_REQUEST, GetUserByIdSaga);
  yield takeLatest(UserTypes.GET_FRIEND_BY_ID_REQUEST, GetFriendByIdSaga);

  yield takeLatest(UserTypes.UPDATE_AVATAR_REQUEST, UpdateAvatarSaga);

  yield takeLatest(UserTypes.GET_EMAIL_REQUEST, GetEmailSaga);
  yield takeLatest(UserTypes.CHECK_OTP_REQUEST, CheckOtpSaga);
  yield takeLatest(UserTypes.UPDATE_PASSWORD_REQUEST, UpdatePasswordSaga);
  yield takeLatest(UserTypes.GET_NEW_TOKEN_REQUEST, GetNewTokenSaga);
  yield takeLatest(UserTypes.UN_FRIEND_REQUEST, UnFriendSaga);

  yield takeLatest(UserTypes.GET_ALL_FRIEND_REQUEST, GetAllFriendSaga);
  yield takeLatest(UserTypes.UPDATE_PROFILE_REQUEST, UpdateProfileSaga);
  yield takeLatest(
    UserTypes.GET_ALL_PEOPLE_REQUEST_REQUEST,
    GetAllPeopleRequestSaga
  );
}

export default UserSaga;
