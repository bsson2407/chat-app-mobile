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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUserState,
  getUserByIdRequest,
  loginUserRequest,
} from '../redux/actions/UserAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { error } = user;
  const handleClearUserState = () => {
    dispatch(clearUserState());
  };
  const onSubmit = () => {
    // dispatch
    // loginUse
    const data = {
      email: email.trim(),
      password: password.trim(),
    };
    dispatch(
      // loginAction(data)
      loginUserRequest(data, () => {
        navigation.navigate('Home');
      })
    );
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
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
        style={styles.inputText}
        placeholder={'Nhập email'}
      ></TextInput>
      <TextInput
        value={password}
        secureTextEntry={true}
        onChangeText={(value) => {
          setPassword(value);
        }}
        style={styles.inputText}
        placeholder={'Nhập mật khẩu'}
      ></TextInput>
      <View style={styles.txtRegex}>
        <Text style={styles.txtRegexVal}>{error}</Text>
      </View>
      <TouchableOpacity
        style={styles.txtquenmk}
        onPress={() => {
          handleClearUserState();
          navigation.navigate('FogotPassEmail');
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnAll} onPress={onSubmit}>
        <Text>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style={styles.txtOr}>________________ OR _________________</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.btnAll}
      >
        <Text>Đăng ký</Text>
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
  txtRegex: {
    width: '100%',
  },
  txtRegexVal: {
    fontSize: 15,
    color: 'red',
    marginLeft: 50,
    marginTop: -10,
  },
  btnAll: {
    width: '80%',
    height: 70,
    backgroundColor: 'rgba(132, 79, 80, 0.43)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  inputText: {
    width: '80%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 20,
  },
  txtquenmk: {
    width: '80%',
    alignItems: 'flex-end',
  },
  txtOr: {
    color: 'white',
    fontWeight: 'bold',
  },
});
