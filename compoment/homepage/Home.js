import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import ItemFriend from '../Item/ItemFriend';
import ItemAddFriend from '../Item/itemAddFriend';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllConversationByUserRequest,
  getAllMessageByConversationRequest,
  saveInfoChatWith,
} from '../../redux/actions/ChatAction';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getNewTokenRequest,
  getUserByIdRequest,
} from '../../redux/actions/UserAction';
import { getItem } from '../../redux/asyncStore';
import jwt_decode from 'jwt-decode';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { chatWith, listConversation } = useSelector((state) => state.chat);
  const { userCurrent } = useSelector((state) => state.user);

  const { socket } = useSelector((state) => state);
  const [tokenLocalStorage, setTokenLocalStorage] = useState('');
  const [refeshTokenLocalStorage, setRefeshTokenLocalStorage] = useState('');
  useEffect(() => {
    getItem('token').then((token) => {
      setTokenLocalStorage(token);
    });
    getItem('refeshToken').then((refeshToken) => {
      setRefeshTokenLocalStorage(refeshToken);
    });
  }, []);

  useEffect(() => {
    const getToken = async () => {
      if (tokenLocalStorage === null || refeshTokenLocalStorage === null) {
        navigation.navigate('Login');
        // history.push('/login');
      } else {
        console.log(1);
        const token = tokenLocalStorage.slice(1, tokenLocalStorage.length - 1);
        const refeshToken = refeshTokenLocalStorage.slice(
          1,
          tokenLocalStorage.length - 1
        );

        const decoded = jwt_decode(token);
        dispatch(getUserByIdRequest(decoded._id));
        if (decoded.exp < Date.now() / 1000) {
          dispatch(getNewTokenRequest({ refeshToken }));
        }
      }
    };

    return async () => {
      await getToken();
    };
  }, []);

  useEffect(() => {
    const arrIdConversation = [];
    listConversation.map((item) => arrIdConversation.push(item._id));
    socket.emit('join_all_conversation', arrIdConversation);
    return () => {};
  }, [listConversation]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    dispatch(getAllConversationByUserRequest(userCurrent._id));
    return () => {};
  }, [userCurrent]);
  const wait = (timeout) => {
    // Defined the timeout function for testing purpose
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    // const timer = setTimeout(() => {
    //   setIsRefreshing(true);
    // }, 1000).then(() => setIsRefreshing(false));
    // return () => clearTimeout(timer);
    setIsRefreshing(true);
    wait(2000).then(() => setIsRefreshing(false));
    dispatch(getAllConversationByUserRequest(userCurrent._id));
  }, []);

  useEffect(() => {
    // ------ JOIN ROOM
    socket.emit('join_room', userCurrent);
  }, [userCurrent]);
  useEffect(() => {
    socket.on('requestAddFriendToClient', (data) => {
      dispatch(getUserByIdRequest(userCurrent._id));
      return () => socket.off('requestAddFriendToClient');
    });
  }, [userCurrent]);

  useEffect(() => {
    socket.on('deniedAddFriendToClient', (data) => {
      dispatch(getUserByIdRequest(userCurrent._id));
    });
    return () => socket.off('deniedAddFriendToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('acceptAddFriendToClient', (data) => {
      dispatch(getUserByIdRequest(userCurrent._id));
    });
    return () => socket.off('acceptAddFriendToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('cancelRequestAddFriendToClient', (data) => {
      dispatch(getUserByIdRequest(userCurrent._id));
    });
    return () => socket.off('cancelRequestAddFriendToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('changeAvatarGroupToClient', (data) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));

      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });

    return () => socket.off('changeAvatarGroupToClient');
  }, [userCurrent, chatWith]);

  useEffect(() => {
    socket.on('changeNameGroupToClient', (data) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });

    return () => socket.off('changeNameGroupToClient');
  }, [userCurrent, chatWith]);
  useEffect(() => {
    socket.on('changeLeaderToClient', (data) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });

    return () => socket.off('changeLeaderToClient');
  }, [userCurrent, chatWith]);

  useEffect(() => {
    socket.on('deleteGroupToClient', (data) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });

    return () => socket.off('deleteGroupToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('leaveGroupToClient', (data) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });

    return () => socket.off('leaveGroupToClient');
  }, [userCurrent, chatWith]);

  useEffect(() => {
    socket.on('kickMemberOutGroupToClient', (data) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });

    return () => socket.off('kickMemberOutGroupToClient');
  }, [userCurrent, chatWith]);

  useEffect(() => {
    socket.on('kickMemberOutGroupToDeleteUser', (data) => {
      dispatch(getAllConversationByUserRequest(data));
    });
    return () => socket.off('kickMemberOutGroupToDeleteUser');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('unFriendToClient', (data) => {
      console.log('unFriendToClient');
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      dispatch(getUserByIdRequest(userCurrent._id));
    });

    return () => socket.off('unFriendToClient');
  }, [userCurrent]);
  useEffect(() => {
    socket.on('addMemberToGroupToClient', (data) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });
    return () => socket.off('addMemberToGroupToClient');
  }, [userCurrent, chatWith]);

  useEffect(() => {
    socket.on('createGroupToClient', (data) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });
    return () => socket.off('createGroupToClient');
  }, [userCurrent]);

  const handleChat = (item, conversation) => {
    const newStateChatWith = {
      _id: '',
      idUser: item.idUser,
      idConversation: conversation._id,
      type: 'single',
    };

    dispatch(getAllMessageByConversationRequest(conversation._id));
    dispatch(saveInfoChatWith(newStateChatWith));
  };

  const handleChatGroup = (item) => {
    const newStateChatGroup = {
      _id: '',
      name: item.name,
      avatar: item.avatar,
      leaderId: item.leaderId,
      members: item.members,
      idConversation: item._id,
      type: 'group',
    };

    dispatch(getAllMessageByConversationRequest(item._id));
    dispatch(saveInfoChatWith(newStateChatGroup));
  };

  const renderSingleConversation = (conversation) => {
    const chatWithUser = conversation.members.filter(
      (item) => item.idUser._id !== userCurrent._id
    )[0];

    const flag = conversation.lastMessage
      ? conversation.lastMessage.seen.includes(userCurrent._id)
      : false;
    return (
      <TouchableOpacity
        onPress={() => {
          handleChat(chatWithUser, conversation);
          navigation.navigate('ChatBox');
        }}
      >
        <View style={styles.container2}>
          <View style={styles.imgStyple}>
            <Image
              style={styles.myImg}
              source={{ uri: chatWithUser.idUser.avatar }}
            ></Image>
          </View>
          <View style={styles.myValue}>
            <View style={styles.myName}>
              <Text style={styles.nameName}>{chatWithUser.idUser.name}</Text>
            </View>
            <View style={styles.mess}>
              {conversation.lastMessage ? (
                conversation.lastMessage.sender === userCurrent._id ? (
                  <View>
                    <View style={{ width: '90%', flexDirection: 'row' }}>
                      <Text style={styles.user}>Bạn:</Text>
                      <Text style={styles.messVal}>
                        {conversation.lastMessage.message}
                      </Text>
                    </View>
                    <View style={styles.nofi}>
                      <Text style={styles.nofiTxt}>N</Text>
                    </View>
                  </View>
                ) : conversation.lastMessage ? (
                  <View style={{ width: '90%', flexDirection: 'row' }}>
                    <Text style={styles.messVal}>
                      {conversation.lastMessage.message}
                    </Text>
                  </View>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              {!conversation.lastMessage ? (
                <View style={styles.nofi}>
                  <Text style={styles.nofiTxt}>N</Text>
                </View>
              ) : (
                ''
              )}
              {/*<View style={{ width: '90%', flexDirection: 'row' }}>
                <Text style={styles.user}>Ban:</Text>
                <Text style={styles.messVal}>{item.text}</Text>
              </View>
              <View style={styles.nofi}>
                <Text style={styles.nofiTxt}>N</Text>
              </View>*/}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGroupConversation = (conversation) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleChatGroup(conversation);
          navigation.navigate('ChatBox');
        }}
      >
        <View style={styles.container2}>
          <View style={styles.imgStyple}>
            <Image
              style={styles.myImg}
              source={{ uri: conversation.avatar }}
            ></Image>
          </View>
          <View style={styles.myValue}>
            <View style={styles.myName}>
              <Text style={styles.nameName}>{conversation.name}</Text>
            </View>
            <View style={styles.mess}>
              {conversation.lastMessage ? (
                conversation.lastMessage.sender === userCurrent._id ? (
                  <View>
                    <View style={{ width: '90%', flexDirection: 'row' }}>
                      <Text style={styles.user}>Bạn:</Text>
                      <Text style={styles.messVal}>
                        {conversation.lastMessage.message}
                      </Text>
                    </View>
                    <View style={styles.nofi}>
                      <Text style={styles.nofiTxt}>N</Text>
                    </View>
                  </View>
                ) : conversation.lastMessage ? (
                  <View style={{ width: '90%', flexDirection: 'row' }}>
                    <Text style={styles.messVal}>
                      {conversation.lastMessage.message}
                    </Text>
                  </View>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              {!conversation.lastMessage ? (
                <View style={styles.nofi}>
                  <Text style={styles.nofiTxt}>N</Text>
                </View>
              ) : (
                ''
              )}
              {/*<View style={{ width: '90%', flexDirection: 'row' }}>
                <Text style={styles.user}>Ban:</Text>
                <Text style={styles.messVal}>{item.text}</Text>
              </View>
              <View style={styles.nofi}>
                <Text style={styles.nofiTxt}>N</Text>
              </View>*/}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.findBox}>
        <Ionicons style={styles.iconStyple} name="find-replace" />
        <TextInput
          style={styles.myInput}
          onPressIn={() => navigation.navigate('FindFriend')}
        ></TextInput>
        <TouchableOpacity onPress={() => navigation.navigate('AddItemGr')}>
          <Ionicons style={styles.iconStyple} name="add-circle" />
        </TouchableOpacity>
      </View>

      <FlatList
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        key="*"
        data={listConversation}
        numColumns={1}
        keyExtractor={listConversation._id}
        renderItem={({ item }) =>
          (item.type === 'single' && renderSingleConversation(item)) ||
          (item.type === 'group' && renderGroupConversation(item))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  findBox: {
    width: '100%',
    backgroundColor: '#F0B7A4',
    height: 70,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  listFriend: {
    width: '100%',
    height: '90%',
  },
  iconStyple: {
    fontSize: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  myInput: {
    width: '60%',
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: 'white',
    fontSize: 20,
    color: 'white',
    padding: 0,
  },

  container2: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
  imgStyple: {
    width: '25%',
    height: 70,
  },
  myValue: {
    width: '75%',
    height: 70,
  },
  myImg: {
    width: 70,
    height: 70,
    borderRadius: 90,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  myName: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameName: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '80%',
  },
  time: {
    fontSize: 15,
    color: 'grey',
    textAlign: 'right',
    width: '20%',
  },

  mess: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    fontSize: 15,
    color: 'grey',
    marginRight: 5,
  },
  messVal: {
    fontSize: 15,
    color: 'grey',
  },
  nofi: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
  },
  nofiTxt: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});
