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
import { useDispatch, useSelector } from 'react-redux';
import {
  changeAvatarGroupRequest,
  changeNameGroupRequest,
} from '../../redux/actions/ChatAction';

export default function UpdateInfoGrChat({ navigation }) {
  const dispatch = useDispatch();

  const { chatWith } = useSelector((state) => state.chat);
  const { userCurrent } = useSelector((state) => state.user);
  const [img, setImg] = useState(null);
  const [result, setResult] = useState(null);
  const [name, setName] = useState(chatWith.name);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setResult(result.assets[0]);

    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };

  const onSubmit = async () => {
    if (img) {
      const formData = new FormData();
      formData.append('idUser', userCurrent._id);
      formData.append('idConversation', chatWith.idConversation);
      let localUri = result.uri;
      // setPhotoShow(localUri);
      let filename = localUri.split('/').pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append('image', { uri: localUri, name: filename, type });
      await dispatch(changeAvatarGroupRequest(formData));
      // await dispatch(getUserByIdRequest(userCurrent._id));
    }

    const data = {
      nameGroup: name,
      idConversation: chatWith.idConversation,
      idUser: userCurrent._id,
    };

    if (data) {
      await dispatch(changeNameGroupRequest(data));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.txtOTP}>Cập nhật thông tin nhóm</Text>

        <TouchableOpacity onPress={pickImage}>
          {img ? (
            <Image style={styles.infoImgUpdate} source={{ uri: img }} />
          ) : (
            <Image
              style={styles.infoImgUpdate}
              source={{ uri: chatWith.avatar }}
            />
          )}
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Tên:</Text>
          <TextInput
            onChangeText={(e) => setName(e)}
            defaultValue={chatWith.name}
            style={styles.inputText}
          ></TextInput>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('InfoGrChat')}
            style={styles.btnAll}
          >
            <Text>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onSubmit();
              navigation.navigate('InfoGrChat');
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
