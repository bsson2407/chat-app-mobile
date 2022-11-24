import { Video } from 'expo-av';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../../redux/types/ActionTypes';
// import { RTCView, mediaDevices } from 'react-native-webrtc';
const VideoCall = ({ navigation }) => {
  const dispatch = useDispatch();
  const { call, peer, socket } = useSelector((state) => state);
  const { userCurrent } = useSelector((state) => state.user);
  const { chatWith } = useSelector((state) => state.chat);

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);

  const [answer, setAnswer] = useState(false);
  const youVideo = useRef();
  const otherVideo = useRef();
  const [tracks, setTracks] = useState(null);
  const [newCall, setNewCall] = useState(null);

  // useEffect(() => {
  //   let isFront = true;
  //   mediaDevices.enumerateDevices().then((sourceInfos) => {
  //     let videoSourceId;
  //     for (let i = 0; i < sourceInfos.length; i++) {
  //       const sourceInfo = sourceInfos[i];
  //       if (
  //         sourceInfo.kind == 'videoinput' &&
  //         sourceInfo.facing == (isFront ? 'front' : 'environment')
  //       ) {
  //         videoSourceId = sourceInfo.deviceId;
  //       }
  //     }
  //     mediaDevices
  //       .getUserMedia({
  //         audio: false,
  //         video: {
  //           mandatory: {
  //             minWidth: 500,
  //             minHeight: 300,
  //             minFrameRate: 30,
  //           },
  //           facingMode: isFront ? 'user' : 'environment',
  //           optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
  //         },
  //       })
  //       .then((stream) => {})
  //       .catch((error) => {
  //       });
  //   });
  // }, []);

  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();

    return () => setTotal(0);
  }, []);

  useEffect(() => {
    setSecond(total % 60);
    // setMins(parseInt(total / 60));
    // setHours(parseInt(total / 3600));
  }, [total]);

  const addCallMessage = useCallback(
    (call, times, disconnect) => {
      if (call.recipient !== userCurrent._id || disconnect) {
        // const data1 = getData(call.recipient,call.sender)
        //     const {member, _id} = data1
        // const data = {
        //   idConversation: chatWith.idConversation,
        //   sender: userCurrent._id,
        //   message: 'Call',
        //   type: 'CALL',
        // };
        // const data = {
        //   conversation: chatWith.idConversation,
        //   sender: auth.user,
        //   text: '',
        //   media: [],
        //   call: { video: call.video, times },
        // };
        // const member = currentConver.member;
        // dispatch(addMesage({ data, auth, socket, member }));
        // socket.emit('send_message', data);
      }
      // },[])
    },
    [dispatch, userCurrent, chatWith, socket]
  );

  const handleEndCall = () => {
    tracks && tracks.forEach((track) => track.stop());
    if (newCall) newCall.close();
    let times = answer ? total : 0;
    socket.emit('endCall', { ...call, times });

    // addCallMessage(call, times);
    dispatch({ type: ActionTypes.CALL, payload: null });
  };

  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        socket.emit('endCall', { ...call, times: 0 });
        // addCallMessage(call, 0);
        dispatch({ type: ActionTypes.CALL, payload: null });
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, answer, call, socket, addCallMessage]);

  useEffect(() => {
    socket.on('endCallToClient', (data) => {
      tracks && tracks.forEach((track) => track.stop());
      if (newCall) newCall.close();
      // addCallMessage(data, data.times);
      dispatch({ type: ActionTypes.CALL, payload: null });
    });

    return () => socket.off('endCallToClient');
  }, [socket, dispatch, tracks, addCallMessage, newCall]);

  // Stream Media
  const openStream = (video) => {
    const config = { audio: true, video };

    // if (navigator.mediaDevices === undefined) {
    //   navigator.mediaDevices = {};
    // }
    //  if (navigator.mediaDevices.getUserMedia === undefined) {
    //    navigator.mediaDevices.getUserMedia = function (constraints) {
    //      // First get ahold of the legacy getUserMedia, if present
    //      var getUserMedia =
    //        navigator. || navigator.mozGetUserMedia;

    //      // Some browsers just don't implement it - return a rejected promise with an error
    //      // to keep a consistent interface
    //      if (!getUserMedia) {
    //        return Promise.reject(
    //          new Error('getUserMedia is not implemented in this browser')
    //        );
    //      }

    //      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    //      return new Promise(function (resolve, reject) {
    //        getUserMedia.call(navigator, constraints, resolve, reject);
    //      });
    //    };
    //  }
    //  return mediaDevices.getUserMedia(config);
  };

  const playStream = (tag, stream) => {
    let video = tag;
    video.srcObject = stream;
    video.play();
  };

  // Answer Call
  const handleAnswer = () => {
    openStream(call.video).then((stream) => {
      playStream(youVideo.current, stream);
      const track = stream.getTracks();
      setTracks(track);

      const newCall = peer.call(call.peerId, stream);
      newCall.on('stream', function (remoteStream) {
        playStream(otherVideo.current, remoteStream);
      });
      setAnswer(true);
      setNewCall(newCall);
    });
  };

  useEffect(() => {
    peer.on('call', (newCall) => {
      openStream(call.video).then((stream) => {
        if (youVideo.current) {
          playStream(youVideo.current, stream);
        }
        const track = stream.getTracks();
        setTracks(track);

        newCall.answer(stream);
        newCall.on('stream', function (remoteStream) {
          if (otherVideo.current) {
            playStream(otherVideo.current, remoteStream);
          }
        });
        setAnswer(true);
        setNewCall(newCall);
      });
    });
    return () => peer.removeListener('call');
  }, [peer, call.video]);

  // Disconnect
  useEffect(() => {
    socket.on('callerDisconnect', () => {
      tracks && tracks.forEach((track) => track.stop());
      if (newCall) newCall.close();
      let times = answer ? total : 0;
      addCallMessage(call, times, true);

      dispatch({ type: ActionTypes.CALL, payload: null });

      // dispatch({
      //   type: GLOBALTYPES.ALERT,
      //   payload: { error: `The ${call.username} disconnect` },
      // });
    });

    return () => socket.off('callerDisconnect');
  }, [socket, tracks, dispatch, call, addCallMessage, answer, total, newCall]);

  // Play - Pause Audio
  const playAudio = (newAudio) => {
    newAudio.play();
  };

  const pauseAudio = (newAudio) => {
    newAudio.pause();
    newAudio.currentTime = 0;
  };

  //   useEffect(() => {
  //    let newAudio = new Audio('images/audio/ringring.mp3');
  //    if (answer) {
  //      pauseAudio(newAudio);
  //    } else {
  //      playAudio(newAudio);
  //    }

  //    return () => pauseAudio(newAudio);
  //  }, [answer]);
  const _endCall = () => {};
  return (
    <View>
      <View style={styles.container}>
        <View style={{ alignItems: 'center', flex: 1, top: '20%' }}>
          <Text style={{ fontSize: 18, marginTop: 15, color: 'white' }}>
            Thành Nhớ
          </Text>
        </View>

        <View style={styles.views}>
          <TouchableOpacity
            onPress={handleAnswer}
            style={styles.buttonAcceptCall}
          ></TouchableOpacity>

          <TouchableOpacity
            onPress={handleEndCall}
            style={styles.buttonCloseCall}
          ></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#3777F3',
  },
  views: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
    bottom: '40%',
  },
  buttonAcceptCall: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  buttonCloseCall: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export default VideoCall;
