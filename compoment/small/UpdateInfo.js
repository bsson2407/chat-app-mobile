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
import { dateUtils } from '../../redux/dateUtils';
import {
  updateAvatarRequest,
  updateProfileRequest,
} from '../../redux/actions/UserAction';

export default function UpdateInfo({ navigation }) {
  const dispatch = useDispatch();
  const { userCurrent } = useSelector((state) => state.user);
  const dateOfBirth = new Date(userCurrent.dateOfBirth);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [myDate, SetMyDate] = useState(
    dateUtils.transferDateString(
      dateOfBirth.getDate(),
      dateOfBirth.getMonth() + 1,
      dateOfBirth.getFullYear()
    )
  );

  const [dateUpdate, setDateUpdate] = useState(userCurrent.dateOfBirth);
  const [name, setName] = useState(userCurrent.name);
  const [gender, setGender] = useState(userCurrent.gender);
  const [avatar, setAvatar] = useState(userCurrent.avatar);
  const [result, setResult] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dateOfBirth = new Date(date);
    setDateUpdate(date);
    SetMyDate(
      dateUtils.transferDateString(
        dateOfBirth.getDate(),
        dateOfBirth.getMonth() + 1,
        dateOfBirth.getFullYear()
      )
    );
    hideDatePicker();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    setAvatar(result.assets[0].uri);
    setResult(result.assets[0]);
  };
  const onSubmit = async () => {
    if (result) {
      const formData = new FormData();
      formData.append('_id', userCurrent._id);
      let localUri = result.uri;
      // setPhotoShow(localUri);
      let filename = localUri.split('/').pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append('image', { uri: localUri, name: filename, type });
      await dispatch(updateAvatarRequest(formData));
    }

    const data = {
      name: name,
      _id: userCurrent._id,
      gender: gender,
      dateOfBirth: dateUpdate,
    };
    if (data) {
      await dispatch(updateProfileRequest(data));
    }

    navigation.navigate('Info');
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.txtOTP}>Cập nhật thông tin</Text>
        <TouchableOpacity onPress={pickImage}>
          <Image style={styles.infoImgUpdate} source={{ uri: avatar }} />
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
            style={styles.inputText}
            defaultValue={name}
            onChangeText={(e) => setName(e)}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Ngày sinh: </Text>

          <TouchableOpacity onPress={showDatePicker}>
            <Ionicons style={{ fontSize: 30 }} name="date-range" />
          </TouchableOpacity>
          <Text>{myDate}</Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Giới tính: </Text>
          <View style={styles.myValue}>
            <View style={styles.myName}>
              <Text style={styles.nameName}>Nam</Text>
              <TouchableOpacity
                style={styles.checkBox}
                onPress={() => setGender(false)}
              >
                {!gender && <Text>✔</Text>}
              </TouchableOpacity>
            </View>
            <View style={styles.myName}>
              <Text style={styles.nameName}>Nữ</Text>
              <TouchableOpacity
                style={styles.checkBox}
                onPress={() => setGender(true)}
              >
                {gender && <Text>✔</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
  myValue: {
    width: 100,
    height: 70,
    flexDirection: 'row',
  },
  myName: {
    width: '70%',
    height: '100%',
    flexDirection: 'row',

    alignItems: 'center',
  },
  nameName: {
    fontSize: 10,
  },
  checkBox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: 'green',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F0B7A4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width: '90%',
    height: 400,
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
  infoImgUpdate: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 90,
  },
  txtOTP: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    padding: 10,
  },
});
