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
import IoniconsTwo from 'react-native-vector-icons/Ionicons';
import ItemFriend from '../Item/ItemFriend';
import ItemAddFriend from '../Item/itemAddFriend';
import Checkbox from 'expo-checkbox';

import anh from '../Item/anh1.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFriendRequest } from '../../redux/actions/UserAction';
import { addMemberToGroupRequest } from '../../redux/actions/ChatAction';

export default function UpdateInfoMemberGr({ navigation }) {
  const dispatch = useDispatch();

  const [checkList, setCheckList] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const memberInGroup = [];
  const initalFriend = [];

  const { chatWith } = useSelector((state) => state.chat);

  const { listFriend, userCurrent } = useSelector((state) => state.user);
  chatWith.members.filter((val) => {
    memberInGroup.push(val.idUser._id);
  });
  useEffect(() => {
    dispatch(getAllFriendRequest(userCurrent._id));
  }, []);

  const onSubmit = () => {
    const data = {
      idConversation: chatWith.idConversation,
      userId: userCurrent._id,
      newUserIds: checkList,
    };
    dispatch(addMemberToGroupRequest(data));
    // socket.emit('addMemberToGroup', data);
    // dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
    // dispatch(getUserByIdRequest(userCurrent._id));
    navigation.navigate('InfoMemberGr');
  };

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
  return (
    <View style={styles.container}>
      <View style={styles.findBox}>
        <TouchableOpacity onPress={() => navigation.navigate('InfoMemberGr')}>
          <Ionicons style={{ fontSize: 50 }} name="arrow-back" />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, marginLeft: 10 }}>
          Thêm thành viên nhóm
        </Text>
      </View>
      <FlatList
        key="*"
        contentContainerStyle={{ flexDirection: 'column-reverse' }}
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
                {memberInGroup.includes(item.idUser._id) ? (
                  <TouchableOpacity style={styles.checkBox}>
                    <Text>✔</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.checkBox}
                    onPress={() => handleChange(item.idUser._id)}
                  >
                    {checkList.includes(item.idUser._id) && <Text>✔</Text>}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      />

      {checkList.length >= 1 ? (
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={styles.btnCreatrGrBorder}
        >
          <Text style={styles.btnCreatrGr}>Thêm thành viên</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btnCreatrGrBorder} disabled>
          <Text style={styles.btnCreatGr}>Chưa chọn thành viên</Text>
        </TouchableOpacity>
      )}
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
  avataRoom: {
    width: '50%',
    height: 200,
    alignSelf: 'center',
  },
  infoRoom: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoTxt: {
    fontSize: 30,
    marginRight: 10,
  },
  btnAll: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f2f2f2',
    marginBottom: 2,
  },
  btnTxt: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  btnIcon: {
    fontSize: 30,
  },
  btnDanger: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  btnDTxt: {
    fontSize: 20,
    color: 'red',
  },
  btnDIcon: {
    fontSize: 20,
    color: 'red',
    marginRight: 15,
  },
  listFr: {
    width: '100%',
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

  checkBox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: 'green',
    alignItems: 'center',
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
  btnCreatrGrBorder: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
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
  btnCreatGr: {
    backgroundColor: '#FFF',
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
    width: '50%',
    textAlign: 'center',
    color: 'black',
  },
});
