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
import {
  deleteGroupRequest,
  deleteMessageAllMeRequest,
  leaveGroupRequest,
} from '../../redux/actions/ChatAction';

export default function InfoGrChat({ navigation }) {
  const dispatch = useDispatch();
  const { userCurrent } = useSelector((state) => state.user);
  const { chatWith, listMessage } = useSelector((state) => state.chat);

  const handleDeleteAll = () => {
    const data = {
      idConversation: chatWith.idConversation,
      userId: userCurrent._id,
    };
    dispatch(deleteMessageAllMeRequest(data));
    // dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
  };

  const handleDeleteGroup = () => {
    const data = {
      idConversation: chatWith.idConversation,
    };
    dispatch(deleteGroupRequest(data));
    navigation.navigate('Home');
  };

  const handleLeaveGroup = () => {
    const data = {
      conversation: chatWith,
      idConversation: chatWith.idConversation,
      userId: userCurrent._id,
    };
    // dispatch(showOptionGroupProfile(false));
    dispatch(leaveGroupRequest(data));
    navigation.navigate('Home');

    // dispatch(getConversationByIdRequest(userCurrent._id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.findBox}>
        <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
          <Ionicons style={{ fontSize: 50 }} name="arrow-back" />
        </TouchableOpacity>
      </View>
      <Image style={styles.avataRoom} source={{ uri: chatWith.avatar }} />
      <View style={styles.infoRoom}>
        <Text style={styles.infoTxt}>{chatWith.name} </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateInfoGrChat')}
        >
          <IoniconsTwo style={styles.btnIcon} name="pencil" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btnAll}
        onPress={() => navigation.navigate('InfoMemberGr')}
      >
        <Text style={styles.btnTxt}>
          Thành viên nhóm{' '}
          <Text style={{ color: 'grey' }}>({chatWith.members.length})</Text>
        </Text>
        <Ionicons style={styles.btnIcon} name="arrow-forward-ios" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAll}>
        <Text style={styles.btnTxt}>Ảnh</Text>
        <Ionicons style={styles.btnIcon} name="arrow-forward-ios" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAll}>
        <Text style={styles.btnTxt}>File</Text>
        <Ionicons style={styles.btnIcon} name="arrow-forward-ios" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnDanger}
        onPress={() => handleDeleteAll()}
      >
        <IoniconsTwo style={styles.btnDIcon} name="trash-bin-outline" />
        <Text style={styles.btnDTxt}>Xóa cuộc trò chuyện</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnDanger}
        onPress={() => handleLeaveGroup()}
      >
        <Ionicons style={styles.btnDIcon} name="exit-to-app" />
        <Text style={styles.btnDTxt}>Rời khỏi nhóm</Text>
      </TouchableOpacity>
      {chatWith.leaderId === userCurrent._id && (
        <TouchableOpacity
          style={styles.btnDanger}
          onPress={() => handleDeleteGroup()}
        >
          <Ionicons style={styles.btnDIcon} name="exit-to-app" />
          <Text style={styles.btnDTxt}>Giải tán nhóm</Text>
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
    borderRadius: 90,
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
});
