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
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  getEmailRequest,
  registerUserRequest,
  saveEmailUser,
} from '../redux/actions/UserAction';
export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    const flag = { email: email.trim() };
    const data = {
      email: email.trim(),
      password: pass.trim(),
      name: name.trim(),
    };

    if (pass === rePass) {
      dispatch(
        registerUserRequest(data, () => {
          dispatch(getEmailRequest(flag));

          // dispatch(saveEmailUser(flag));

          // setCountDown(true);

          navigation.navigate('Verify', { password: pass, email: email });
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 150,
          height: 150,
          marginBottom: 30,
          borderRadius: 50,
        }}
        source={require('../assets/logo.png')}
      />
      <TextInput
        style={styles.inputText}
        onChangeText={(value) => setName(value)}
        placeholder={'Nhập Tên của bạn'}
      ></TextInput>
      <TextInput
        style={styles.inputText}
        onChangeText={(value) => setEmail(value)}
        placeholder={'Nhập Email của bạn'}
      ></TextInput>
      <TextInput
        style={styles.inputText}
        onChangeText={(value) => setPass(value)}
        placeholder={'Nhập mật khẩu của bạn'}
      ></TextInput>
      <TextInput
        style={styles.inputText}
        onChangeText={(value) => setRePass(value)}
        placeholder={'Xác nhận lại mật khẩu'}
      ></TextInput>
      <TouchableOpacity onPress={onSubmit} style={styles.btnAll}>
        <Text>Đăng kí</Text>
      </TouchableOpacity>
      <Text style={styles.txtOr}>________________ OR _________________</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.btnAll}
      >
        <Text>Đăng nhập</Text>
      </TouchableOpacity>
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
  bigText: {
    marginTop: 30,
    color: 'white',
    fontSize: 37,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
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
  inputText: {
    width: '80%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 10,
    paddingLeft: 20,
    fontSize: 20,
  },
});
