import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  checkOtpRequest,
  loginUserRequest,
} from '../../redux/actions/UserAction';
export default function Verify({ navigation }) {
  const dispatch = useDispatch();
  const [time, setTime] = useState(60);
  const [otp, setOtp] = useState('');
  const user = useSelector((state) => state.user);
  const { error } = user;
  const { password, email } = route.params;
  const getOtpValue = async () => {
    const data = {
      email: email.trim(),
      otp: otp.trim(),
    };
    const dataLogin = {
      email: email.trim(),
      password: password.trim(),
    };

    await dispatch(
      checkOtpRequest(data, () => {
        dispatch(
          loginUserRequest(dataLogin, () => {
            navigation.navigate('Hello');
          })
        );
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.txtOTP}>Xác nhận mã OTP</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Nhập mã: </Text>
          <TextInput style={styles.inputText}></TextInput>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.btnAll}
          >
            <Text>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={getOtpValue} style={styles.btnAll}>
            <Text>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0B7A4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width: '90%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    borderWidth: 1,
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
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 20,
    borderBottomWidth: 1,
  },
  txtOTP: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
