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
import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

import * as ImagePicker from 'expo-image-picker';

export default function UpdateInfoGrChat({ navigation }) {
  const [img, setImg] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.txtOTP}>Cập nhật thông tin</Text>

        <TouchableOpacity onPress={pickImage}>
          <Image style={styles.infoImgUpdate} source={{ uri: img }} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Tên:</Text>
          <TextInput style={styles.inputText}></TextInput>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('InfoGrChat')}
            style={styles.btnAll}
          >
            <Text>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('InfoGrChat')}
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
    height: 300,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'flex-start',
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
    width: '70%',
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
    fontSize: 25,
    padding: 10,
  },
  infoImgUpdate: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
