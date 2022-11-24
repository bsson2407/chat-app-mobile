import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import ItemFriend from '../Item/ItemFriend';
import ItemAddFriend from '../Item/itemAddFriend';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserRequest } from '../../redux/actions/UserAction';
import {
  isFriendAction,
  isMeAction,
  isMyRequestAction,
  isPeopleRequestAction,
  isStrangerAction,
} from '../../redux/actions/FriendAction';

export default function FindFriend({ navigation }) {
  const dispatch = useDispatch();

  const { isFriend, isStranger, isMyRequest, isPeopleRequest, isMe } =
    useSelector((state) => state.friend);
  const { resultSearch, error, userCurrent } = useSelector(
    (state) => state.user
  );
  const { socket } = useSelector((state) => state);

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (resultSearch) {
      const isFriend = userCurrent.friends.find(
        (x) => x.idUser === resultSearch._id
      );

      const requested = userCurrent.myRequest.find(
        (x) => x.idUser === resultSearch._id
      );
      const isPeopleRequest = userCurrent.peopleRequest.find(
        (x) => x.idUser === resultSearch._id
      );
      const isMe = resultSearch._id === userCurrent._id;

      if (isFriend) {
        dispatch(isFriendAction());
      } else if (requested) {
        dispatch(isMyRequestAction());
      } else if (isPeopleRequest) {
        dispatch(isPeopleRequestAction());
      } else if (isMe) {
        dispatch(isMeAction());
      } else {
        dispatch(isStrangerAction());
      }
    }
  }, [userCurrent, resultSearch]);

  useEffect(() => {
    socket.on('requestAddFriendToClient', () => {
      dispatch(isMyRequestAction());
    });
    return () => socket.off('requestAddFriendToClient');
  }, []);
  useEffect(() => {
    socket.on('deniedAddFriendToClient', () => {
      dispatch(isStrangerAction());
    });
    return () => socket.off('deniedAddFriendToClient');
  }, []);
  useEffect(() => {
    socket.on('acceptAddFriendToClient', () => {
      dispatch(isFriendAction());
    });
    return () => socket.off('acceptAddFriendToClient');
  }, []);

  useEffect(() => {
    socket.on('cancelRequestAddFriendToClient', () => {
      dispatch(isStrangerAction());
    });
    return () => socket.off('cancelRequestAddFriendToClient');
  }, []);

  const handleAddFriend = () => {
    const data = { userFrom: userCurrent._id, userTo: resultSearch._id };
    socket.emit('requestAddFriend', data);
  };

  const handleDeleteRequestFriend = () => {
    const data = { userFrom: userCurrent._id, userTo: resultSearch._id };
    socket.emit('cancelRequestAddFriend', data);
  };

  const onSubmit = () => {
    if (email === '') {
      return;
    }
    const data = { email: email };
    dispatch(searchUserRequest(data));
  };

  return (
    <View style={styles.container}>
      <View style={styles.findBox}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons style={styles.iconStyple} name="arrow-back" />
        </TouchableOpacity>

        <TextInput
          onChangeText={(e) => setEmail(e)}
          style={styles.myInput}
        ></TextInput>
        <TouchableOpacity onPress={onSubmit}>
          <Ionicons style={styles.iconStyple} name="person-search" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.listFriend}>
          {resultSearch && (
            <ItemAddFriend
              resultSearch={resultSearch}
              handleAddFriend={handleAddFriend}
              handleDeleteRequestFriend={handleDeleteRequestFriend}
            />
          )}
        </View>
      </ScrollView>
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
    fontSize: 45,
    marginLeft: 10,
    marginRight: 10,
  },
  myInput: {
    width: '65%',
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: 'white',
    fontSize: 20,
    color: 'white',
    padding: 0,
  },
});
