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
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  changeLeaderRequest,
  kickMemberOutGroupRequest,
} from '../../redux/actions/ChatAction';

export default function InfoMemberGr({ navigation }) {
  const dispatch = useDispatch();
  const { chatWith } = useSelector((state) => state.chat);
  const { userCurrent } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showId, setShowId] = useState('');

  const handleChangeLeaderGroup = (e) => {
    const data = {
      idConversation: chatWith.idConversation,
      // userId: userCurrent._id,
      idNewLeader: e,
    };
    // socket.emit(data.deleteUserId);
    dispatch(changeLeaderRequest(data));
    // dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
    // dispatch(getUserByIdRequest(userCurrent._id));
  };

  const handleDeleteMemberOutGroup = (e) => {
    const data = {
      idConversation: chatWith.idConversation,
      userId: userCurrent._id,
      deleteUserId: e,
    };

    dispatch(kickMemberOutGroupRequest(data));
    // socket.emit(data.deleteUserId);
    // dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
    // dispatch(getUserByIdRequest(userCurrent._id));
  };
  return (
    <View style={styles.container}>
      <View style={styles.findBox}>
        <TouchableOpacity onPress={() => navigation.navigate('InfoGrChat')}>
          <Ionicons style={{ fontSize: 50 }} name="arrow-back" />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, marginLeft: 10 }}>Thành viên nhóm</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateInfoMemberGr')}
        >
          <Ionicons
            style={{ fontSize: 50, marginLeft: 50 }}
            name="person-add-alt-1"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        key="*"
        data={chatWith.members}
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
                {chatWith.leaderId === item.idUser._id ? (
                  <Text style={{ fontSize: 14, color: 'grey' }}>
                    Nhóm trưởng
                  </Text>
                ) : (
                  chatWith.leaderId === userCurrent._id && (
                    <>
                      <TouchableOpacity
                        onPress={() => handleChangeLeaderGroup(item.idUser._id)}
                      >
                        <Ionicons
                          style={{ fontSize: 40 }}
                          name="person-pin-circle"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          handleDeleteMemberOutGroup(item.idUser._id)
                        }
                      >
                        <Ionicons
                          style={{ fontSize: 40, color: 'red' }}
                          name="person-remove"
                        />
                      </TouchableOpacity>
                    </>
                  )
                )}
              </View>
            </View>
          </View>
        )}
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
});
