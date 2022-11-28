import { call, put, takeLatest } from '@redux-saga/core/effects';

import { ChatTypes } from '../types/ChatTypes';

import {
  addMemberToGroupFailure,
  addMemberToGroupSuccess,
  changeAvatarGroupFailure,
  changeAvatarGroupSuccess,
  changeLeaderFailure,
  changeLeaderSuccess,
  changeNameGroupFailure,
  changeNameGroupSuccess,
  createGroupFailure,
  createGroupSuccess,
  deleteGroupFailure,
  deleteGroupSuccess,
  deleteMessageAllMeSuccess,
  deleteMessageOnlyMeFailure,
  deleteMessageOnlyMeSuccess,
  getAllConversationByUserFailure,
  getAllConversationByUserSuccess,
  getAllMessageByConversationFailure,
  getAllMessageByConversationSuccess,
  getConversationByIdFailure,
  getConversationByIdSuccess,
  kickMemberOutGroupFailure,
  kickMemberOutGroupSuccess,
  leaveGroupFailure,
  leaveGroupSuccess,
  sendFileFailure,
  sendFileSuccess,
  sendImagesFailure,
  sendImagesSuccess,
  sendMessagesFailure,
  sendMessagesSuccess,
} from '../actions/ChatAction';
import {
  deleteAllMe,
  deleteOnlyMe,
  getAllConversationByUser,
  getAllMessageByConversation,
  sendFile,
  sendImage,
  sendMessage,
} from '../api/ChatApi';
import { getConversationById } from '../api/UserApi';
import { UserTypes } from '../types/UserTypes';
import {
  postAddMemberToGroup,
  postChangeAvatar,
  postChangeLeader,
  postChangeName,
  postCreateGroup,
  postDeleteGroup,
  postKickMemberOutGroup,
  postLeaveGroup,
} from '../api/GroupApi';

function* getAllMessageByConversationSaga(action) {
  try {
    const data = yield call(getAllMessageByConversation, action.payload);
    yield put(getAllMessageByConversationSuccess(data));
  } catch (error) {
    yield put(getAllMessageByConversationFailure(error));
  }
}

function* getAllConversationByUserSaga(action) {
  try {
    const data = yield call(getAllConversationByUser, action.payload);
    yield put(getAllConversationByUserSuccess(data));
  } catch (error) {
    yield put(getAllConversationByUserFailure(error));
  }
}

function* sendImagesSaga(action) {
  console.log('sendImagesSaga', action.payload);
  try {
    const data = yield call(sendImage, action.payload);
    yield put(sendImagesSuccess(data));
  } catch (error) {
    yield put(sendImagesFailure(error));
  }
}

function* sendFileSaga(action) {
  try {
    console.log('sendFileSaga', sendFile);
    const data = yield call(sendFile, action.payload);
    yield put(sendFileSuccess(data));
  } catch (error) {
    yield put(sendFileFailure(error));
  }
}

function* sendMessageSaga(action) {
  try {
    const data = yield call(sendMessage, action.payload);
    yield put(sendMessagesSuccess(data));
  } catch (error) {
    yield put(sendMessagesFailure(error));
  }
}

function* DeleteMessageOnlyMeSaga(action) {
  try {
    const data = yield call(deleteOnlyMe, action.payload);
    yield put(deleteMessageOnlyMeSuccess(data));
  } catch (error) {
    yield put(deleteMessageOnlyMeFailure(error));
  }
}

function* DeleteMessageAllMeSaga(action) {
  try {
    const data = yield call(deleteAllMe, action.payload);
    yield put(deleteMessageAllMeSuccess(data));
  } catch (error) {
    yield put(deleteMessageOnlyMeFailure(error));
  }
}

function* GetConversationByIdSaga(action) {
  try {
    const conversation = yield call(getConversationById, action.payload);
    yield put(getConversationByIdSuccess(conversation));
  } catch (error) {
    yield put(getConversationByIdFailure(error));
  }
}

function* AddMemberToGroupSaga(action) {
  try {
    const conversation = yield call(postAddMemberToGroup, action.payload);
    yield put(addMemberToGroupSuccess(conversation));
  } catch (error) {
    yield put(addMemberToGroupFailure(error));
  }
}

function* KickMemberOutGroupSaga(action) {
  try {
    const conversation = yield call(postKickMemberOutGroup, action.payload);
    yield put(kickMemberOutGroupSuccess(conversation));
  } catch (error) {
    yield put(kickMemberOutGroupFailure(error));
  }
}

function* LeaveGroupSaga(action) {
  try {
    const conversation = yield call(postLeaveGroup, action.payload);
    yield put(leaveGroupSuccess(conversation));
  } catch (error) {
    yield put(leaveGroupFailure(error));
  }
}

function* CreateGroupSaga(action) {
  try {
    const conversation = yield call(postCreateGroup, action.payload);
    yield put(createGroupSuccess(conversation));
  } catch (error) {
    yield put(createGroupFailure(error));
  }
}

function* DeleteGroupSaga(action) {
  try {
    const conversation = yield call(postDeleteGroup, action.payload);
    yield put(deleteGroupSuccess(conversation));
  } catch (error) {
    yield put(deleteGroupFailure(error));
  }
}

function* ChangeNameGroupSaga(action) {
  try {
    const conversation = yield call(postChangeName, action.payload);
    yield put(changeNameGroupSuccess(conversation));
  } catch (error) {
    yield put(changeNameGroupFailure(error));
  }
}

function* ChangeAvatarGroupSaga(action) {
  try {
    const conversation = yield call(postChangeAvatar, action.payload);
    yield put(changeAvatarGroupSuccess(conversation));
  } catch (error) {
    yield put(changeAvatarGroupFailure(error));
  }
}

function* ChangeLeaderGroupSaga(action) {
  try {
    const conversation = yield call(postChangeLeader, action.payload);
    yield put(changeLeaderSuccess(conversation));
  } catch (error) {
    yield put(changeLeaderFailure(error));
  }
}

function* ChatSaga() {
  yield takeLatest(
    ChatTypes.GET_ALL_MESSAGE_BY_CONVERSATION_REQUEST,
    getAllMessageByConversationSaga
  );
  yield takeLatest(
    ChatTypes.GET_ALL_CONVERSATION_BY_USER_REQUEST,
    getAllConversationByUserSaga
  );
  yield takeLatest(ChatTypes.SEND_IMAGES_REQUEST, sendImagesSaga);
  // yield takeLatest(ChatTypes.SEND_VIDEO_REQUEST, sendVideoSaga);
  yield takeLatest(ChatTypes.SEND_FILE_REQUEST, sendFileSaga);
  yield takeLatest(ChatTypes.SEND_MESSAGES_REQUEST, sendMessageSaga);
  yield takeLatest(
    ChatTypes.DELETE_MESSAGE_ONLY_ME_REQUEST,
    DeleteMessageOnlyMeSaga
  );
  yield takeLatest(
    ChatTypes.DELETE_MESSAGE_ALL_ME_REQUEST,
    DeleteMessageAllMeSaga
  );

  yield takeLatest(
    UserTypes.GET_CONVERSATION_BY_ID_REQUEST,
    GetConversationByIdSaga
  );
  yield takeLatest(ChatTypes.LEAVE_GROUP_REQUEST, LeaveGroupSaga);
  yield takeLatest(ChatTypes.CREATE_GROUP_REQUEST, CreateGroupSaga);
  yield takeLatest(
    ChatTypes.CHANGE_LEADER_GROUP_REQUEST,
    ChangeLeaderGroupSaga
  );
  yield takeLatest(
    ChatTypes.CHANGE_AVATAR_GROUP_REQUEST,
    ChangeAvatarGroupSaga
  );
  yield takeLatest(ChatTypes.CHANGE_NAME_GROUP_REQUEST, ChangeNameGroupSaga);
  yield takeLatest(ChatTypes.DELETE_GROUP_REQUEST, DeleteGroupSaga);

  yield takeLatest(ChatTypes.ADD_MEMBER_TO_GROUP_REQUEST, AddMemberToGroupSaga);
  yield takeLatest(
    ChatTypes.KICK_MEMBER_OUT_GROUP_REQUEST,
    KickMemberOutGroupSaga
  );
}

export default ChatSaga;
