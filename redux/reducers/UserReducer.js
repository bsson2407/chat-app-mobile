import { UserTypes } from '../types/UserTypes';

const initialState = {
  isLoading: false,
  userCurrent: {},
  friendProfile: {},
  error: null,
  emailUserResetPass: null,
  listFriend: [],
  userExist: false,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    //------LOGIN------
    case UserTypes.LOGIN_USER_REQUEST: {
      return { isLoading: true };
    }

    case UserTypes.LOGIN_USER_SUCCESS: {
      return {
        isLoading: false,
        userCurrent: action.payload,
        error: undefined,
      };
    }

    case UserTypes.LOGIN_USER_FAILURE: {
      return {
        isLoading: false,
        error: action.payload,
      };
    }

    // ------------- REGISTER
    case UserTypes.REGISTER_USER_REQUEST: {
      return {
        isLoading: true,
      };
    }

    case UserTypes.REGISTER_USER_SUCCESS: {
      return {
        isLoading: false,
        userCurrent: action.payload,
        error: undefined,
      };
    }

    case UserTypes.REGISTER_USER_FAILURE: {
      return {
        error: action.payload,
        isLoading: false,
      };
    }

    //-------------- LOGOUT
    case UserTypes.LOGOUT_USER_REQUEST: {
      return {
        ...state,
      };
    }

    //-------------- SERCH USER BY PHONE OR EMAIL
    case UserTypes.SEARCH_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserTypes.SEARCH_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        resultSearch: action.payload,
      };
    }
    case UserTypes.SEARCH_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        resultSearch: null,
        error: action.payload,
      };
    }
    // ------------- GET OTP BY EMAIL
    case UserTypes.GET_EMAIL_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UserTypes.GET_EMAIL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        result: action.payload,
        error: undefined,
      };
    }

    case UserTypes.GET_EMAIL_FAILURE: {
      return {
        ...state,
        errorResetPass: action.payload,
        isLoading: false,
      };
    }

    // ------------- CHECK OTP
    case UserTypes.CHECK_OTP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UserTypes.CHECK_OTP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        checkOtp: action.payload,
      };
    }

    case UserTypes.CHECK_OTP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    // ------------- UPDATE PASSWORD
    case UserTypes.UPDATE_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UserTypes.UPDATE_PASSWORD_SUCCESS: {
      alert('Đổi mật khẩu thành công');
      return {
        ...state,
        // resultUpdatePassword: action.payload,
      };
    }

    case UserTypes.UPDATE_PASSWORD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    // ------------- UPDATE PROFILE
    case UserTypes.UPDATE_PROFILE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UserTypes.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        userCurrent: action.payload,
      };
    }

    case UserTypes.UPDATE_PROFILE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- GET NEW TOKEN
    case UserTypes.GET_NEW_TOKEN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UserTypes.GET_NEW_TOKEN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        tokens: action.payload,
      };
    }

    case UserTypes.GET_NEW_TOKEN_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    //-------------- UPDATE AVATAR REQUEST
    case UserTypes.UPDATE_AVATAR_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserTypes.UPDATE_AVATAR_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userCurrent: action.payload,
      };
    }
    case UserTypes.UPDATE_AVATAR_FAILURE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    //-------------- UPDATE AVATAR REQUEST
    case UserTypes.GET_USER_BY_ID_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserTypes.GET_USER_BY_ID_SUCCESS: {
      if (state.userCurrent) {
        return {
          ...state,
          isLoading: false,
          userCurrent: action.payload,
        };
      } else {
        return {
          ...state,
          isLoading: false,
        };
      }

      // if (state.userCurrent._id === userData._id) {
      //   return;
      // }
    }
    case UserTypes.GET_USER_BY_ID_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- UPDATE AVATAR REQUEST
    case UserTypes.GET_FRIEND_BY_ID_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserTypes.GET_FRIEND_BY_ID_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        friendProfile: action.payload,
      };
    }
    case UserTypes.GET_FRIEND_BY_ID_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- UN FRIEND
    case UserTypes.UN_FRIEND_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserTypes.UN_FRIEND_SUCCESS: {
      // getCurrentSocket().
      return {
        ...state,
        isLoading: false,
        // listConversation: newListConversation,
      };
    }
    case UserTypes.UN_FRIEND_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- GET ALL FRIEND
    case UserTypes.GET_ALL_FRIEND_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserTypes.GET_ALL_FRIEND_SUCCESS: {
      return {
        ...state,
        loading: false,
        listFriend: action.payload,
      };
    }
    case UserTypes.GET_ALL_FRIEND_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- GET ALL PEOPLE REQUEST
    case UserTypes.GET_ALL_PEOPLE_REQUEST_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserTypes.GET_ALL_PEOPLE_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        peopleRequest: action.payload,
      };
    }
    case UserTypes.GET_ALL_PEOPLE_REQUEST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    // ------------- SAVE EMAIL USER
    case UserTypes.SAVE_EMAIL_USER: {
      return {
        ...state,
        emailUserResetPass: action.payload,
      };
    }

    // ------------- SAVE INFO USER
    case UserTypes.SAVE_INFO_USER: {
      return {
        ...state,
        userCurrent: action.payload,
      };
    }

    // ------------- DELETE USER STATE
    case UserTypes.CLEAR_USER_STATE: {
      return {};
    }

    default:
      return state;
  }
};
