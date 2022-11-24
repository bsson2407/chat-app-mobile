import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

import anh from './anh1.png';
import { useSelector } from 'react-redux';

export default function ItemAddFriend({
  resultSearch,
  handleDeleteRequestFriend,
  handleAddFriend,
}) {
  const { isFriend, isStranger, isMyRequest, isPeopleRequest, isMe } =
    useSelector((state) => state.friend);
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.imgStyple}>
          <Image
            style={styles.myImg}
            source={{ uri: resultSearch.avatar }}
          ></Image>
        </View>
        <View style={styles.myValue}>
          <View style={styles.myName}>
            <Text style={styles.nameName}>{resultSearch.name}</Text>
            {isFriend ? (
              <Text style={styles.btnAddTxt}>Bạn bè</Text>
            ) : isStranger ? (
              <TouchableOpacity style={styles.btnAdd} onPress={handleAddFriend}>
                <Text style={styles.btnAddTxt}>Kết Bạn</Text>
              </TouchableOpacity>
            ) : isMyRequest ? (
              <TouchableOpacity
                style={styles.btnAdd}
                onPress={handleDeleteRequestFriend}
              >
                <Text style={styles.btnAddTxt}>Hủy lời mời kết bạn</Text>
              </TouchableOpacity>
            ) : isPeopleRequest ? (
              <>
                <Text>Từ chối</Text> <Text>Chấp nhận</Text>
              </>
            ) : isMe ? (
              ''
            ) : (
              ''
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
  imgStyple: {
    width: '25%',
    height: 70,
  },
  myValue: {
    width: '75%',
    height: 70,
  },
  myImg: {
    width: 70,
    height: 70,
    borderRadius: 90,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  myName: {
    width: '70%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameName: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
  },
  btnAdd: {
    backgroundColor: '#F0B7A4',
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
  },
  btnAddTxt: {
    color: 'white',
  },
});
