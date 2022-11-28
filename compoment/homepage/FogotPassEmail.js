import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  clearUserState,
  getEmailRequest,
  saveEmailUser,
} from '../../redux/actions/UserAction';

export default function FogotPassEmail({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const onSubmit = async () => {
    await dispatch(clearUserState());

    await dispatch(getEmailRequest({ email }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.txtOTP}>Nhập Email của bạn</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextInput
            onChangeText={(e) => setEmail(e)}
            style={styles.inputText}
          ></TextInput>
        </View>
        <View style={styles.txtRegex}>
          <Text style={styles.txtRegexVal}>ABC</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              onSubmit();
              navigation.navigate('FogotPassOTP', { email: email.trim() });
            }}
            style={styles.btnAll}
          >
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
    height: 170,
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
    marginRight: 20,
  },
  txtRegexVal: {
    fontSize: 10,
    color: 'red',
  },
});
