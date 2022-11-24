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
import { dateUtils } from '../../redux/dateUtils';
import {
  deleteMessageAllMeRequest,
  getAllMessageByConversationRequest,
} from '../../redux/actions/ChatAction';
import { unFriendRequest } from '../../redux/actions/UserAction';

export default function InfoRoomChat({ navigation }) {
  const dispatch = useDispatch();
  const { friendProfile, userCurrent } = useSelector((state) => state.user);
  const dateOfBirth = new Date(friendProfile.dateOfBirth);
  const { chatWith, listMessage } = useSelector((state) => state.chat);
  const { socket } = useSelector((state) => state);

  const handleDeleteAll = () => {
    const data = {
      idConversation: chatWith.idConversation,
      userId: userCurrent._id,
    };
    dispatch(deleteMessageAllMeRequest(data));
    dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
  };

  const handleUnFriend = () => {
    const data = {
      idUser: userCurrent._id,
      idFriend: friendProfile._id,
      idConversation: chatWith.idConversation,
    };
    dispatch(unFriendRequest(data));
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <View style={styles.findBox}>
        <View style={styles.findBoxLeft}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons style={styles.iconStyple} name="arrow-back" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>Thông tin cá nhân</Text>
        </View>
      </View>
      <Image style={styles.avataRoom} source={{ uri: friendProfile.avatar }} />
      <View style={styles.infoRoom}>
        <Text style={styles.infoTxt}>Tên: {friendProfile.name}</Text>
        <Text style={styles.infoTxt}>Email: {friendProfile.email}</Text>
        <Text style={styles.infoTxt}>
          Ngày sinh:
          {dateUtils.transferDateString(
            dateOfBirth.getDate(),
            dateOfBirth.getMonth() + 1,
            dateOfBirth.getFullYear()
          )}
        </Text>
        <Text style={styles.infoTxt}>
          Giới tính: {friendProfile.gender ? 'Nữ' : 'Nam'}
        </Text>
      </View>
      <TouchableOpacity style={styles.btnAll}>
        <Text style={styles.btnTxt}>Ảnh</Text>
        <Ionicons style={styles.btnIcon} name="arrow-forward-ios" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAll}>
        <Text style={styles.btnTxt}>File</Text>
        <Ionicons style={styles.btnIcon} name="arrow-forward-ios" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnDanger}>
        <IoniconsTwo style={styles.btnDIcon} name="trash-bin-outline" />
        <Text style={styles.btnDTxt}>Xóa trò chuyện</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnDanger}
        onPress={() => handleUnFriend()}
      >
        <IoniconsTwo style={styles.btnDIcon} name="trash-bin" />
        <Text style={styles.btnDTxt}>Xóa bạn bè</Text>
      </TouchableOpacity>
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
  findBoxLeft: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconStyple: {
    fontSize: 45,
    marginLeft: 10,
    marginRight: 10,
  },
  avataRoom: {
    width: '50%',
    height: 200,
    alignSelf: 'center',
  },
  infoRoom: {
    marginLeft: 30,
    marginBottom: 10,
  },
  infoTxt: {
    fontSize: 15,
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
