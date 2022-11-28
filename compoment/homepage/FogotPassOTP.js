import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { checkOtpRequest } from '../../redux/actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function FogotPassOTP({ route, navigation }) {
  const dispatch = useDispatch();
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const user = useSelector((state) => state.user);
  const { error } = user;
  const getOtpValue = async () => {
    const data = {
      email: email,
      otp: otp.trim(),
    };
    await dispatch(
      checkOtpRequest(data, () => {
        navigation.navigate('FogotPassChange', { email: email.trim() });
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
          <Text style={{ fontWeight: 'bold' }}>Nhập mã: </Text>
          <TextInput
            onChangeText={(e) => setOtp(e)}
            style={styles.inputText}
          ></TextInput>
        </View>
        <View style={styles.txtRegex}>
          <Text style={styles.txtRegexVal}>ABC</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.btnAll}>
            <Text>Gửi lại</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => getOtpValue()} style={styles.btnAll}>
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

  txtRegex: {
    width: '100%',
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtRegexVal: {
    fontSize: 10,
    color: 'red',
  },
});
