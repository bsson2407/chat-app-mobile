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
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import ItemFriend from '../Item/ItemFriend';
import ItemAddFriend from '../Item/itemAddFriend';
import Checkbox from 'expo-checkbox';

import anh from '../Item/anh1.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConversationByUserRequest } from '../../redux/actions/ChatAction';
import { useEffect } from 'react';

export default function FriendTab({ navigation }) {
  const dispatch = useDispatch();
  const { userCurrent } = useSelector((state) => state.user);
  const { listConversation } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getAllConversationByUserRequest(userCurrent._id));
  }, [userCurrent]);
  return (
    <View style={styles.container}>
      <View style={styles.findBox}>
        <Ionicons style={styles.iconStyple} name="search" />
        <TextInput style={styles.myInput}></TextInput>
      </View>

      <FlatList
        data={listConversation}
        numColumns={1}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) =>
          item.type === 'single' && (
            <TouchableOpacity
              onPress={() => navigation.navigate('', { message: item.name })}
            >
              <View style={styles.container2}>
                <View style={styles.imgStyple}>
                  <Image
                    style={styles.myImg}
                    source={{ uri: item.idUser.avatar }}
                  ></Image>
                </View>
                <View style={styles.myValue}>
                  <View style={styles.myName}>
                    <Text style={styles.nameName}>{item.idUser.name}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
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
    justifyContent: 'center',
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
    width: '81%',
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
