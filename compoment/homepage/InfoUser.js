import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import anh from '../Item/anh1.png';
import { useSelector } from 'react-redux';
import { dateUtils } from '../../redux/dateUtils';
import { removeItem } from '../../redux/asyncStore';

export default function InfoUser({ navigation }) {
  const { userCurrent } = useSelector((state) => state.user);
  const dateOfBirth = new Date(userCurrent.dateOfBirth);
  return (
    <View style={styles.container}>
      <View style={styles.findBox}></View>
      <View style={styles.myImgBorder}>
        <Image style={styles.myImg} source={{ uri: userCurrent.avatar }} />
        <Text style={styles.myEmail}>{userCurrent.email}</Text>
      </View>
      <View style={styles.myInfo}>
        <View style={styles.myInfoTxt}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.myLabel}>Tên:</Text>
            <Text style={styles.myValueInfo}>{userCurrent.name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.myLabel}>Ngày sinh:</Text>
            <Text style={styles.myValueInfo}>
              {dateUtils.transferDateString(
                dateOfBirth.getDate(),
                dateOfBirth.getMonth() + 1,
                dateOfBirth.getFullYear()
              )}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.myLabel}>Giới tính:</Text>
            <Text style={styles.myValueInfo}>
              {userCurrent.gender ? 'Nữ' : 'Nam'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateInfo')}
          style={styles.btnAll}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
              style={{ marginLeft: 20, marginRight: 70, fontSize: 20 }}
              name="border-color"
            />
            <Text>Cập nhật thông tin</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdatePass')}
          style={styles.btnAll}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
              style={{ marginLeft: 20, marginRight: 70, fontSize: 20 }}
              name="lock"
            />
            <Text>Đỏi mật khẩu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            removeItem('token');
            removeItem('refeshToken');
            navigation.navigate('Hello');
          }}
          style={styles.btnAll}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
              style={{ marginLeft: 20, marginRight: 70, fontSize: 20 }}
              name="logout"
            />
            <Text>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  btnAll: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(132, 79, 80, 0.43)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  myInfo: {
    width: '100%',
    height: 400,
    alignItems: 'center',
    backgroundColor: '#F0B7A4',
  },
  myImgBorder: {
    width: '100%',
    height: 230,
    backgroundColor: ' #3333ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myImg: {
    width: 150,
    height: 150,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'grey',
  },
  myName: {
    color: 'white',
    fontSize: 40,
  },
  myEmail: {
    color: 'white',
  },
  myInfoTxt: {
    width: '100%',
    margin: 10,
    justifyContent: 'center',
    borderColor: 'green',
    borderBottomWidth: 1,
    padding: 10,
  },
  myLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 50,
    width: '30%',
  },
  myValueInfo: {
    fontSize: 20,
  },
});
