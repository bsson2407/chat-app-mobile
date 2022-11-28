// import { Socket } from 'socket.io-client';
import { getCurrentSocket } from '../reducers/SocketReducer';
import { ChatTypes } from '../types/ChatTypes';
import { UserTypes } from '../types/UserTypes';

// --------------- GET ALL MESSAGE BY CONVERSATION
export const getAllMessageByConversationRequest = (idConversation) => {
  return {
    type: ChatTypes.GET_ALL_MESSAGE_BY_CONVERSATION_REQUEST,
    payload: idConversation,
  };
};
export const getAllMessageByConversationSuccess = (data) => {
  return {
    type: ChatTypes.GET_ALL_MESSAGE_BY_CONVERSATION_SUCCESS,
    payload: data,
  };
};
export const getAllMessageByConversationFailure = (error) => {
  return {
    type: ChatTypes.GET_ALL_MESSAGE_BY_CONVERSATION_FAILURE,
    payload: error,
  };
};

export const pushNewMesssgeToListMessage = (message) => {
  return {
    type: ChatTypes.PUSH_NEW_MESSAGE_TO_LIST_MESSAGE,
    payload: message,
  };
};

export const pushNewConversationToListConversation = (conversation) => {
  return {
    type: ChatTypes.PUSH_NEW_CONVERSATION_TO_LIST_CONVERSATION,
    payload: conversation,
  };
};

export const recallAMesssgeToListMessage = (message) => {
  return {
    type: ChatTypes.RECALL_A_MESSAGE_TO_LIST_MESSAGE,
    payload: message,
  };
};

// --------------- DELETE MESSAGE ONLY ME
export const deleteMessageOnlyMeRequest = (data) => {
  return {
    type: ChatTypes.DELETE_MESSAGE_ONLY_ME_REQUEST,
    payload: data,
  };
};
export const deleteMessageOnlyMeSuccess = (data) => {
  return {
    type: ChatTypes.DELETE_MESSAGE_ONLY_ME_SUCCESS,
    payload: data,
  };
};
export const deleteMessageOnlyMeFailure = (error) => {
  return {
    type: ChatTypes.DELETE_MESSAGE_ONLY_ME_FAILURE,
    payload: error,
  };
};

// --------------- DELETE MESSAGE ALL ME
export const deleteMessageAllMeRequest = (data) => {
  return {
    type: ChatTypes.DELETE_MESSAGE_ALL_ME_REQUEST,
    payload: data,
  };
};
export const deleteMessageAllMeSuccess = (data) => {
  return {
    type: ChatTypes.DELETE_MESSAGE_ALL_ME_SUCCESS,
    payload: data,
  };
};
export const deleteMessageAllMeFailure = (error) => {
  return {
    type: ChatTypes.DELETE_MESSAGE_ALL_ME_FAILURE,
    payload: error,
  };
};

// --------------- GET ALL CONVERSATION BY USER
export const getAllConversationByUserRequest = (id) => {
  return {
    type: ChatTypes.GET_ALL_CONVERSATION_BY_USER_REQUEST,
    payload: id,
  };
};
export const getAllConversationByUserSuccess = (data) => {
  return {
    type: ChatTypes.GET_ALL_CONVERSATION_BY_USER_SUCCESS,
    payload: data,
  };
};
export const getAllConversationByUserFailure = (error) => {
  return {
    type: ChatTypes.GET_ALL_CONVERSATION_BY_USER_FAILURE,
    payload: error,
  };
};

// -------------- SEND MESSAGE
export const sendMessagesRequest = (data) => {
  return {
    type: ChatTypes.SEND_MESSAGES_REQUEST,
    payload: data,
  };
};
export const sendMessagesSuccess = (data) => {
  getCurrentSocket().emit('sendMessage', data);
  return {
    type: ChatTypes.SEND_MESSAGES_SUCCESS,
    payload: data,
  };
};
export const sendMessagesFailure = (message) => {
  return {
    type: ChatTypes.SEND_MESSAGES_FAILURE,
    payload: message,
  };
};

// -------------- UPDATE AVATAR
export const sendImagesRequest = (data) => {
  console.log('sendImagesRequest', data);
  return {
    type: ChatTypes.SEND_IMAGES_REQUEST,
    payload: data,
  };
};
export const sendImagesSuccess = (data) => {
  // getCurrentSocket().emit('send_message', data);
  getCurrentSocket().emit('sendMessage', data);

  return {
    type: ChatTypes.SEND_IMAGES_SUCCESS,
    payload: data,
  };
};
export const sendImagesFailure = (message) => {
  return {
    type: ChatTypes.SEND_IMAGES_FAILURE,
    payload: message,
  };
};

// -------------- SEND FILE
export const sendFileRequest = (data) => {
  console.log('sendFileRequest');
  return {
    type: ChatTypes.SEND_FILE_REQUEST,
    payload: data,
  };
};
export const sendFileSuccess = (data) => {
  getCurrentSocket().emit('sendMessage', data);
  return {
    type: ChatTypes.SEND_FILE_SUCCESS,
    payload: data,
  };
};
export const sendFileFailure = (message) => {
  return {
    type: ChatTypes.SEND_FILE_FAILURE,
    payload: message,
  };
};

// --------------- SAVE INFO USER CURRENT CHATTING
export const saveInfoChatWith = (friend) => {
  return {
    type: ChatTypes.SAVE_INFO_CHAT_WITH,
    payload: friend,
  };
};

// --------------- SAVE INFO USER CURRENT CHATTING
export const saveInfoChatGroup = (group) => {
  return {
    type: ChatTypes.SAVE_INFO_CHAT_GROUP,
    payload: group,
  };
};

// -------------- GET USER BY ID
export const getConversationByIdRequest = (id) => {
  return {
    type: UserTypes.GET_CONVERSATION_BY_ID_REQUEST,
    payload: id,
  };
};
export const getConversationByIdSuccess = (data) => {
  return {
    type: UserTypes.GET_CONVERSATION_BY_ID_SUCCESS,
    payload: data,
  };
};
export const getConversationByIdFailure = (message) => {
  return {
    type: UserTypes.GET_CONVERSATION_BY_ID_FAILURE,
    payload: message,
  };
};

// -------------- ADD MEMBER TO GROUP
export const addMemberToGroupRequest = (data) => {
  return {
    type: ChatTypes.ADD_MEMBER_TO_GROUP_REQUEST,
    payload: data,
  };
};
export const addMemberToGroupSuccess = (data) => {
  // data.idConversation = data._id;
  getCurrentSocket().emit('addMemberToGroup', data);

  return {
    type: ChatTypes.ADD_MEMBER_TO_GROUP_SUCCESS,
    payload: data,
  };
};
export const addMemberToGroupFailure = (message) => {
  return {
    type: ChatTypes.ADD_MEMBER_TO_GROUP_FAILURE,
    payload: message,
  };
};

// -------------- KICK MEMBER OUT GROUP
export const kickMemberOutGroupRequest = (data) => {
  return {
    type: ChatTypes.KICK_MEMBER_OUT_GROUP_REQUEST,
    payload: data,
  };
};
export const kickMemberOutGroupSuccess = (data) => {
  getCurrentSocket().emit('kickMemberOutGroup', data);

  return {
    type: ChatTypes.KICK_MEMBER_OUT_GROUP_SUCCESS,
    payload: data,
  };
};
export const kickMemberOutGroupFailure = (message) => {
  return {
    type: ChatTypes.KICK_MEMBER_OUT_GROUP_FAILURE,
    payload: message,
  };
};

// -------------- CHANGE NAME GROUP
export const changeNameGroupRequest = (data) => {
  return {
    type: ChatTypes.CHANGE_NAME_GROUP_REQUEST,
    payload: data,
  };
};
export const changeNameGroupSuccess = (data) => {
  getCurrentSocket().emit('changeNameGroup', data);
  return {
    type: ChatTypes.CHANGE_NAME_GROUP_SUCCESS,
    payload: data,
  };
};
export const changeNameGroupFailure = (message) => {
  return {
    type: ChatTypes.CHANGE_NAME_GROUP_FAILURE,
    payload: message,
  };
};

// -------------- CHANGE AVATAR GROUP
export const changeAvatarGroupRequest = (data) => {
  return {
    type: ChatTypes.CHANGE_AVATAR_GROUP_REQUEST,
    payload: data,
  };
};
export const changeAvatarGroupSuccess = (data) => {
  getCurrentSocket().emit('changeAvatarGroup', data);

  return {
    type: ChatTypes.CHANGE_AVATAR_GROUP_SUCCESS,
    payload: data,
  };
};
export const changeAvatarGroupFailure = (message) => {
  return {
    type: ChatTypes.CHANGE_AVATAR_GROUP_FAILURE,
    payload: message,
  };
};

// -------------- CREATE GROUP
export const createGroupRequest = (data) => {
  return {
    type: ChatTypes.CREATE_GROUP_REQUEST,
    payload: data,
  };
};
export const createGroupSuccess = (data) => {
  getCurrentSocket().emit('createGroup', data);
  return {
    type: ChatTypes.CREATE_GROUP_SUCCESS,
    payload: data,
  };
};
export const createGroupFailure = (message) => {
  return {
    type: ChatTypes.CREATE_GROUP_FAILURE,
    payload: message,
  };
};

// -------------- CHANGE LEADER
export const changeLeaderRequest = (data) => {
  return {
    type: ChatTypes.CHANGE_LEADER_GROUP_REQUEST,
    payload: data,
  };
};
export const changeLeaderSuccess = (data) => {
  getCurrentSocket().emit('changeLeader', data);
  return {
    type: ChatTypes.CHANGE_LEADER_GROUP_SUCCESS,
    payload: data,
  };
};
export const changeLeaderFailure = (message) => {
  return {
    type: ChatTypes.CHANGE_LEADER_GROUP_FAILURE,
    payload: message,
  };
};

// -------------- CREATE GROUP
export const deleteGroupRequest = (data) => {
  return {
    type: ChatTypes.DELETE_GROUP_REQUEST,
    payload: data,
  };
};
export const deleteGroupSuccess = (data) => {
  getCurrentSocket().emit('deleteGroup', data);
  return {
    type: ChatTypes.DELETE_GROUP_SUCCESS,
    payload: data,
  };
};
export const deleteGroupFailure = (message) => {
  return {
    type: ChatTypes.DELETE_GROUP_FAILURE,
    payload: message,
  };
};

// -------------- LEAVE GROUP
export const leaveGroupRequest = (data) => {
  return {
    type: ChatTypes.LEAVE_GROUP_REQUEST,
    payload: data,
  };
};
export const leaveGroupSuccess = (data) => {
  getCurrentSocket().emit('leaveGroup', data);
  return {
    type: ChatTypes.LEAVE_GROUP_SUCCESS,
    payload: data,
  };
};
export const leaveGroupFailure = (message) => {
  return {
    type: ChatTypes.LEAVE_GROUP_FAILURE,
    payload: message,
  };
};
