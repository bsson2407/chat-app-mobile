import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  FlatList,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { Video } from 'expo-av';
import anh from '../Item/anh1.png';
import React, { useCallback, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import ImageView from 'react-native-image-viewing';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAllConversationByUserRequest,
  getAllMessageByConversationRequest,
  pushNewMesssgeToListMessage,
  recallAMesssgeToListMessage,
  sendFileRequest,
  sendImagesRequest,
  sendMessagesRequest,
} from '../../redux/actions/ChatAction';
import FileMessage from '../Item/fileMessage';
import { getFriendByIdRequest } from '../../redux/actions/UserAction';
import { ActionTypes } from '../../redux/types/ActionTypes';

const ChatBox = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { socket, peer } = useSelector((state) => state);
  const { userCurrent } = useSelector((state) => state.user);
  const { chatWith, listMessage } = useSelector((state) => state.chat);

  const [message, setMessage] = useState('');
  useEffect(() => {
    // socket.on('seen_message', () => {
    dispatch(getAllMessageByConversationRequest(chatWith.idConversation));

    // });
  }, [chatWith]);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
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
    dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
  }, []);
  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      console.log('newMessage');
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === newMessage.idConversation) {
        dispatch(pushNewMesssgeToListMessage(newMessage));
      }
    });

    return () => socket.off('newMessage');
  }, []);

  useEffect(() => {
    if (chatWith.type === 'single')
      dispatch(getFriendByIdRequest(chatWith.idUser._id));
  }, []);

  useEffect(() => {
    socket.on('recall_message', (recallMessage) => {
      dispatch(recallAMesssgeToListMessage(recallMessage));
      dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });
    console.log('result,', result.canceled);
    if (!result.canceled) {
      let formData = new FormData();
      formData.append('idSender', userCurrent._id);
      formData.append('idConversation', chatWith.idConversation);

      for (const fileImage of result.assets) {
        if (fileImage) {
          let localUri = fileImage.uri;
          // setPhotoShow(localUri);
          let filename = localUri.split('/').pop();

          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          formData.append('files', { uri: localUri, name: filename, type });
        }
      }

      await dispatch(sendImagesRequest(formData));
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('result,', result.canceled);
    if (!result.canceled) {
      let formData = new FormData();
      formData.append('idSender', userCurrent._id);
      formData.append('idConversation', chatWith.idConversation);

      let localUri = result.assets[0].uri;
      // setPhotoShow(localUri);
      let filename = localUri.split('/').pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      // const pathName =
      //   fileImage.uri.split('.')[fileImage.uri.split('.').length - 1];
      // const dataImg = {
      //   uri: fileImage.uri,
      //   type: `${fileImage.type}/${pathName}`,
      //   name: fileImage.uri.split('/')[fileImage.uri.split('/').length - 1],
      // };
      formData.append('file', { uri: localUri, name: filename, type });

      await dispatch(sendFileRequest(formData));
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // setMyDoc(result.uri);
    let formData = new FormData();
    formData.append('idSender', userCurrent._id);
    formData.append('idConversation', chatWith.idConversation);

    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    formData.append('file', {
      uri: localUri,
      name: result.name,
      type: result.mimeType,
    });

    await dispatch(sendFileRequest(formData));
  };
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState('');

  const handleViewingImage = (link) => {
    setVisible(true);
    setUrl(link);
    return;
  };
  const renderMessageMe = (item) => {
    const date = new Date(item.createdAt);
    const flag = item.deleteBy?.findIndex(
      (userIdele) => userIdele == userCurrent._id
    );
    return (
      <View>
        {flag === -1 ? (
          <View style={styles.listChatSeft}>
            {visible ? (
              <ImageView
                images={[{ uri: url }]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setVisible(false)}
              />
            ) : (
              ''
            )}
            <View style={styles.listChatBorderSeft}>
              {item.type === 'TEXT' ? (
                <Text style={styles.listChatTxt}>{item.message}</Text>
              ) : item.type === 'IMAGE' ? (
                <View>
                  {item.urlImage.map((url, index) => {
                    return (
                      <TouchableOpacity
                        key={url}
                        onPress={() => handleViewingImage(url)}
                      >
                        <Image
                          style={styles.listChatSendImg}
                          source={{ uri: url }}
                          resizeMode="contain"
                          key={index}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : item.type === 'VIDEO' ? (
                <Video
                  ref={video}
                  style={styles.listChatSendImg}
                  source={{
                    uri: `${item.urlLink}`,
                  }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
              ) : item.type === 'FILE' ? (
                <FileMessage item={item} />
              ) : item.type === 'RECALL' ? (
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 14,
                    paddingTop: 8,
                    fontStyle: 'italic',
                  }}
                >
                  Tin nhắn đã được thu hồi
                </Text>
              ) : (
                ''
              )}
            </View>
          </View>
        ) : (
          ''
        )}
      </View>
    );
  };

  const renderMessageForGroup = (item) => {
    const flag = item.deleteBy?.findIndex(
      (userIdele) => userIdele == userCurrent._id
    );
    const chatGroupUser = chatWith.members.find(
      (itemUser) =>
        // itemUser.idUser._id === item.sender;
        item.sender === itemUser.idUser._id
    );
    return (
      <View>
        {chatGroupUser ? (
          <View style={styles.listChat}>
            {visible ? (
              <ImageView
                images={[{ uri: url }]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setVisible(false)}
              />
            ) : (
              ''
            )}
            <View style={styles.listChatImg}>
              <Image
                style={styles.listChatImgX}
                source={{ uri: chatGroupUser.idUser.avatar }}
              />
            </View>
            <View style={styles.listChatBorder}>
              {item.type === 'TEXT' ? (
                <Text style={styles.listChatTxt}>{item.message}</Text>
              ) : item.type === 'IMAGE' ? (
                <View>
                  {item.urlImage.map((url, index) => {
                    return (
                      <TouchableOpacity
                        key={url}
                        onPress={() => handleViewingImage(url)}
                      >
                        <Image
                          style={styles.listChatSendImg}
                          source={{ uri: url }}
                          resizeMode="contain"
                          key={index}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : item.type === 'VIDEO' ? (
                <Video
                  ref={video}
                  style={styles.listChatSendImg}
                  source={{
                    uri: `${item.urlLink}`,
                  }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
              ) : item.type === 'FILE' ? (
                <FileMessage item={item} />
              ) : item.type === 'RECALL' ? (
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 14,
                    paddingTop: 8,
                    fontStyle: 'italic',
                  }}
                >
                  Tin nhắn đã được thu hồi
                </Text>
              ) : (
                ''
              )}
            </View>
          </View>
        ) : (
          ''
        )}
      </View>
    );
  };

  const renderMessageForSingle = (item) => {
    const flag = item.deleteBy?.findIndex(
      (userIdele) => userIdele == userCurrent._id
    );
    return (
      <View>
        {flag === -1 ? (
          <View style={styles.listChat}>
            {visible ? (
              <ImageView
                images={[{ uri: url }]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setVisible(false)}
              />
            ) : (
              ''
            )}
            <View style={styles.listChatImg}>
              <Image
                style={styles.listChatImgX}
                source={{ uri: chatWith.idUser.avatar }}
              />
            </View>
            <View style={styles.listChatBorder}>
              {item.type === 'TEXT' ? (
                <Text style={styles.listChatTxt}>{item.message}</Text>
              ) : item.type === 'IMAGE' ? (
                <View>
                  {item.urlImage.map((url, index) => {
                    return (
                      <TouchableOpacity
                        key={url}
                        onPress={() => handleViewingImage(url)}
                      >
                        <Image
                          style={styles.listChatSendImg}
                          source={{ uri: url }}
                          resizeMode="contain"
                          key={index}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : item.type === 'VIDEO' ? (
                <Video
                  ref={video}
                  style={styles.listChatSendImg}
                  source={{
                    uri: `${item.urlLink}`,
                  }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
              ) : item.type === 'FILE' ? (
                <FileMessage item={item} />
              ) : item.type === 'RECALL' ? (
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 14,
                    paddingTop: 8,
                    fontStyle: 'italic',
                  }}
                >
                  Tin nhắn đã được thu hồi
                </Text>
              ) : (
                ''
              )}
            </View>
          </View>
        ) : (
          ''
        )}
      </View>
    );
  };

  const onSubmit = async () => {
    if (message !== '') {
      const data = {
        idConversation: chatWith.idConversation,
        idSender: userCurrent._id,
        message: message,
      };
      setMessage('');
      await dispatch(sendMessagesRequest(data));
    }
  };

  return (
    <View style={styles.container}>
      {/*chat header*/}

      <View style={styles.findBox}>
        <View style={styles.findBoxLeft}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons style={styles.iconStyple} name="arrow-back" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>
            {chatWith.type === 'single' ? chatWith.idUser.name : chatWith.name}
          </Text>
        </View>
        <View style={styles.findBoxRight}>
          {chatWith.type === 'single' && (
            <TouchableOpacity
              onPress={() => navigation.navigate('InfoRoomChat')}
            >
              <Ionicons style={styles.iconStyple} name="menu" />
            </TouchableOpacity>
          )}
          {chatWith.type === 'group' && (
            <TouchableOpacity onPress={() => navigation.navigate('InfoGrChat')}>
              <Ionicons style={styles.iconStyple} name="menu" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/*chat main*/}
      <FlatList
        key="*"
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{ flexDirection: 'column-reverse' }}
        inverted
        data={listMessage}
        numColumns={1}
        initialNumToRender={100}
        keyExtractor={listMessage._id}
        renderItem={({ item }) => (
          <View>
            {item.type === 'NOTIFY' ? (
              <View
                style={{
                  width: '100%',
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{ height: 2, backgroundColor: 'grey', flex: 1 }}
                ></View>
                <Text
                  style={{
                    height: 30,
                    backgroundColor: 'grey',
                    borderRadius: 50,
                    fontSize: 10,
                    color: 'white',
                    paddingTop: 8,
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  {item.message}
                </Text>
                <View
                  style={{ height: 2, backgroundColor: 'grey', flex: 1 }}
                ></View>
              </View>
            ) : item.sender === userCurrent._id ? (
              renderMessageMe(item)
            ) : chatWith.type === 'single' ? (
              renderMessageForSingle(item)
            ) : (
              renderMessageForGroup(item)
            )}
          </View>
        )}
      />
      {/*chat footer*/}
      <KeyboardAvoidingView style={styles.inputView}>
        <TouchableOpacity onPress={() => pickDocument()}>
          <Ionicons style={styles.iconStypleS} name="attach-file" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage()}>
          <Ionicons style={styles.iconStypleS} name="image" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickVideo()}>
          <Ionicons style={styles.iconStypleS} name="video-library" />
        </TouchableOpacity>
        <TextInput
          style={styles.myInput}
          value={message}
          onChangeText={(e) => setMessage(e)}
        ></TextInput>
        <TouchableOpacity onPress={() => onSubmit()}>
          <Ionicons style={styles.iconStypleS} name="send" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  findBox: {
    width: '100%',
    backgroundColor: '#F0B7A4',
    height: 70,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  iconStyple: {
    fontSize: 45,
    marginLeft: 10,
    marginRight: 10,
  },
  myInput: {
    width: '50%',
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: 'white',
    fontSize: 20,
    color: 'white',
    padding: 0,
  },
  inputView: {
    backgroundColor: '#F0B7A4',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  findBoxRight: {
    width: '30%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
    flexDirection: 'row',
  },
  findBoxLeft: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconStypleS: {
    fontSize: 30,
    marginLeft: 10,
    marginRight: 10,
    color: 'grey',
  },
  listChat: {
    width: '60%',
    maxWidth: '80%',
    marginBottom: 10,

    flexDirection: 'row',
  },
  listChatImg: {
    width: 60,
  },
  listChatImgX: {
    width: 50,
    height: 50,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'grey',
  },
  listChatBorder: {
    marginLeft: 20,
  },
  listChatBorder: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  listChatTxt: {
    fontSize: 15,
  },
  listChatTime: {
    color: 'grey',
    marginLeft: 10,
  },
  listChatSendImg: {
    width: 230,
    height: 350,
  },
  listChatSendImgs: {
    width: 133,
    height: 180,
    margin: 2,
  },
  listChatSendVideo: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  //seft
  listChatSeft: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    marginLeft: 150,
    marginBottom: 10,
  },
  listChatBorderSeft: {
    borderWidth: 1,
    borderColor: '#F0B7A4',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 7,
    backgroundColor: '#F0B7A4',
    marginRight: 5,
  },
  iconStypleX: {
    fontSize: 45,
  },
});
export default ChatBox;
