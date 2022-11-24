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
import { useDispatch, useSelector } from 'react-redux';
import { getAllPeopleRequestRequest } from '../../redux/actions/UserAction';
import { useEffect } from 'react';

const AddFriend = () => {
  const dispatch = useDispatch();

  const { userCurrent, peopleRequest } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllPeopleRequestRequest(userCurrent._id));
    return () => {};
  }, [userCurrent]);

  const handleAcceptFriend = (item) => {
    const data = { userFrom: userCurrent._id, userTo: item.idUser._id };
    socket.emit('acceptAddFriend', data);

    // dispatch(getUserByIdRequest(item.idUser._id));
  };

  const handleDontAcceptFriend = (item) => {
    const data = { userFrom: userCurrent._id, userTo: item.idUser._id };
    socket.emit('deniedAddFriend', data);

    // dispatch(getUserByIdRequest(item.idUser._id));
  };
  return (
    <View style={styles.container}>
      <View style={styles.findBox}></View>
      <View style={styles.listAddFr}>
        <Text style={styles.listAddFrTxt}>Danh sách kết bạn</Text>
        <FlatList
          data={peopleRequest}
          numColumns={1}
          keyExtractor={(index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity>
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
                    <TouchableOpacity
                      style={styles.btnAddX}
                      onPress={() => handleDontAcceptFriend(item)}
                    >
                      <Text style={styles.btnAddTxtX}>Từ chối</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnAdd}
                      onPress={() => handleAcceptFriend(item)}
                    >
                      <Text style={styles.btnAddTxt}>Chấp nhận</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
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
  listAddFr: {
    height: 290,
    marginBottom: 10,
  },
  listAddFrTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  listDanhBa: {
    height: 240,
  },
  listDanhBaTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  itemListAddFr: {
    height: 200,
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
    width: '70%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameName: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '60%',
  },
  btnAdd: {
    backgroundColor: '#F0B7A4',
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  btnAddX: {
    backgroundColor: 'white',
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    borderWidth: 1,
    borderColor: 'grey',
  },
  btnAddXX: {
    backgroundColor: 'white',
    width: '70%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'grey',
  },
  btnAddTxt: {
    color: 'white',
  },
});

export default AddFriend;
