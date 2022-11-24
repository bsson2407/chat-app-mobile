import { Video } from 'expo-av';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function SendCall({ navigation }) {
  const _endCall = () => {
    navigation.goBack();
  };
  const video = React.useRef();
  return (
    <View>
      <Video
        ref={video.current}
        style={styles.listChatSendImg}
        useNativeControls
        resizeMode="contain"
        //  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

      <TouchableOpacity
        onPress={_endCall}
        style={styles.buttonCall}
      ></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listChatSendImg: {
    height: '50%',
    width: '100%',
    borderWidth: 1,
  },

  buttonCall: {
    bottom: '20%',
    marginTop: 10,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
export default SendCall;
