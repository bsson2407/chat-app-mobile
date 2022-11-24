import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

import anh from '../../img/anh1.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllFriendRequest } from '../../redux/actions/UserAction';
import { FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import { createGroupRequest } from '../../redux/actions/ChatAction';

export default function AddItemGr({ navigation }) {
  const dispatch = useDispatch();
  const initalFriend = [];

  const [checkList, setCheckList] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const { listFriend, userCurrent } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllFriendRequest(userCurrent._id));
  }, []);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const value = event;
    const index = checkList.findIndex((element) => element === value);
    let checkListTemp = [...checkList];
    let itemSelectedTemp = [...itemSelected];

    // nếu như đã có
    if (index !== -1) {
      itemSelectedTemp = itemSelectedTemp.filter(
        (element) => element._id !== value
      );

      checkListTemp = checkListTemp.filter((element) => element !== value);

      // chưa có
    } else {
      checkListTemp.push(value);
      const index = initalFriend.findIndex((element) => element._id === value);

      if (index !== -1) {
        itemSelectedTemp.push(initalFriend[index]);
      }
    }

    setCheckList(checkListTemp);
    setItemSelected(itemSelectedTemp);
  };
  const [nameGroup, setNameGroup] = useState('');

  const onSubmit = () => {
    if (nameGroup === '') {
      setError('Chưa nhập tên nhóm');
      return;
    }
    const data = {
      userIdSelf: userCurrent._id,
      nameGroup,
      userIds: checkList,
    };
    dispatch(createGroupRequest(data));
    // dispatch(getAllConversationByUserRequest(userCurrent._id));
    // dispatch(getUserByIdRequest(userCurrent._id));

    // socket.emit('createGroup', data);
    navigation.navigate('Home');
    // dispatch(searchUserRequest(data));
  };
  return (
    <View style={styles.container}>
      <View style={styles.findBox}>
        <View style={{ width: '50%' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons style={styles.iconStyple} name="arrow-back" />
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%', alignItems: 'flex-end' }}>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoGr}>
        <Text style={styles.txtLabel}>Tên nhóm</Text>
        <TextInput
          style={styles.myInput}
          onChangeText={(e) => setNameGroup(e)}
        />
        <View style={styles.txtRegex}>
          <Text style={styles.txtRegexVal}>{error}</Text>
        </View>

        <Text style={styles.txtLabel}>Danh sách bạn</Text>
        <FlatList
          key="*"
          contentContainerStyle={{ flexDirection: 'column-reverse' }}
          inverted
          data={listFriend}
          numColumns={1}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
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
                    style={styles.checkBox}
                    onPress={() => handleChange(item.idUser._id)}
                  >
                    {checkList.includes(item.idUser._id) && <Text>✔</Text>}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      {checkList.length >= 2 ? (
        <TouchableOpacity
          style={styles.btnCreatrGrBorder}
          onPress={() => onSubmit()}
        >
          <Text style={styles.btnCreatrGr}>Tạo Nhóm</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.btnCreatGr}>Chưa đủ thành viên</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: 'green',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
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
  btnCreatrGrBorder: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  btnCreatGr: {
    backgroundColor: '#FFF',
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
    width: '50%',
    textAlign: 'center',
    color: 'black',
  },
  btnCreatrGr: {
    backgroundColor: '#F0B7A4',
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
    width: '50%',
    textAlign: 'center',
    color: 'white',
  },
  btnAll: {
    width: '40%',
    height: 40,
    backgroundColor: '#F0B7A4',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  inputText: {
    width: '70%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 20,
    borderBottomWidth: 1,
  },
  txtOTP: {
    fontWeight: 'bold',
    fontSize: 25,
    padding: 10,
  },
  iconStyple: {
    fontSize: 45,
    marginLeft: 10,
    marginRight: 10,
  },
  infoGr: {
    width: '100%',
  },
  txtLabel: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  myInput: {
    width: '95%',
    height: 40,
    borderBottomWidth: 1,
    margin: 10,
    fontSize: 20,
  },
  txtRegex: {
    width: '100%',
  },
  txtRegexVal: {
    fontSize: 15,
    color: 'red',
    marginLeft: 20,
    marginTop: -10,
  },

  listFr: {
    width: '100%',
    height: 400,
    backgroundColor: 'white',
  },

  container2: {
    width: '100%',
    height: 90,
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
    width: '100%',
  },
  btnAdd: {
    backgroundColor: '#F0B7A4',
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
  },
  btnAddTxt: {
    color: 'white',
  },
  myCheckBox: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    marginLeft: 40,
    borderRadius: 90,
  },
});
