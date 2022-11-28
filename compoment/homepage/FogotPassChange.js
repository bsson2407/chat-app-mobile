import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  loginUserRequest,
  updatePasswordRequest,
} from '../../redux/actions/UserAction';
import { useState } from 'react';

export default function FogotPassChange({ route, navigation }) {
  const dispatch = useDispatch();

  const [pass, setPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { email } = route.params;

  const onSubmit = () => {
    if (pass.trim() === repeatPass.trim()) {
      if (pass.length < 8) {
        setErrorMessage('Mật khẩu phải tối thiểu 8 kí tự');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        return;
      } else {
        const newData = {
          email: email.trim(),
          newPassword: pass.trim(),
        };
        dispatch(
          updatePasswordRequest(newData, () => {
            const dataLogin = {
              email: email.trim(),
              password: pass.trim(),
            };
            console.log('dataLogin', dataLogin);
            dispatch(
              loginUserRequest(dataLogin, () => {
                navigation.navigate('Home');
              })
            );
          })
        );
      }
    } else {
      setErrorMessage('Mật khẩu không khớp');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.txtOTP}>Đổi mật khẩu</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Mật khẩu mới: </Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(e) => setPass(e)}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Nhập lại mật khẩu mới: </Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(e) => setRepeatPass(e)}
          ></TextInput>
        </View>

        {errorMessage && (
          <View style={styles.txtRegex}>
            <Text style={styles.txtRegexVal}>{errorMessage}</Text>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <TouchableOpacity onPress={() => onSubmit()} style={styles.btnAll}>
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
    height: 240,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'flex-start',
    borderWidth: 1,
    alignItems: 'flex-end',
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
    width: '55%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 20,
    borderBottomWidth: 1,
  },
  txtOTP: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    padding: 10,
  },

  txtRegex: {
    width: '100%',
    marginTop: -20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  txtRegexVal: {
    fontSize: 10,
    color: 'red',
  },
});
