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
import { updatePasswordRequest } from '../../redux/actions/UserAction';

export default function UpdatePass({ navigation }) {
  const dispatch = useDispatch();
  const { userCurrent } = useSelector((state) => state.user);
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  console.log('newPass', newPass);
  console.log('repeatPass', repeatPass);
  const onSubmit = async () => {
    console.log('userCurrent.password', userCurrent.password);

    if (pass === userCurrent.password) {
      if (newPass === repeatPass) {
        if (newPass.length < 8) {
          setErrorMessage('Mật khẩu phải tối thiểu 8 kí tự');
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
          return;
        } else {
          if (newPass === userCurrent.password) {
            setErrorMessage('Không nhập mật khẩu cũ');
            setTimeout(() => {
              setErrorMessage('');
            }, 2000);
          } else {
            const newData = {
              email: userCurrent.email,
              newPassword: newPass,
            };
            dispatch(updatePasswordRequest(newData, () => {}));
          }
        }
      } else {
        setErrorMessage('Mật khẩu không khớp');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      }
    } else {
      setErrorMessage('Sai mật khẩu hiện tại');
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
          <Text style={{ fontWeight: 'bold' }}>Mật khẩu hiện tại:</Text>
          <TextInput
            onChangeText={(e) => setPass(e)}
            style={styles.inputText}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Mật khẩu mới: </Text>
          <TextInput
            onChangeText={(e) => setNewPass(e)}
            style={styles.inputText}
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
            onChangeText={(e) => setRepeatPass(e)}
            style={styles.inputText}
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
          <TouchableOpacity
            onPress={() => navigation.navigate('Info')}
            style={styles.btnAll}
          >
            <Text>Hủy</Text>
          </TouchableOpacity>
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
    height: 300,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'flex-start',
    borderWidth: 1,
    alignItems: 'flex-end',
  },
  txtRegex: {
    width: '100%',
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 120,
    marginBottom: 2,
  },
  txtRegexVal: {
    fontSize: 13,
    color: 'red',
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
});
