import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

// Stack Screens
import Hello from './compoment/Hello';
import Login from './compoment/Login';
import Register from './compoment/Register';
import Verify from './compoment/small/verify';
import ChatBox from './compoment/homepage/ChatBox';
import FindFriend from './compoment/homepage/FindFriend';
import UpdateInfo from './compoment/small/UpdateInfo';
import UpdatePass from './compoment/small/UpdatePassword';
import AddItemGr from './compoment/Item/AddItemGr';

// Tab Screens
import HomeScreen from './compoment/homepage/Home';
import AddFriendScreen from './compoment/homepage/AddFriend';
import AddGroupScreen from './compoment/homepage/AddGroup';
import InfoUserScreen from './compoment/homepage/InfoUser';
import InfoRoomChat from './compoment/homepage/InfoRoomChat';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByIdRequest } from './redux/actions/UserAction';
import FriendTab from './compoment/homepage/FriendTab';
import UpdateInfoGrChat from './compoment/homepage/UpdateInfoGr';
import InfoGrChat from './compoment/homepage/InfoGrChat';
import InfoMemberGr from './compoment/homepage/InfoMemberGr';
import UpdateInfoMemberGr from './compoment/homepage/UpdadeInfoMemberGr';
import SendCall from './compoment/homepage/callVideo/sendCall';
import VideoCall from './compoment/homepage/callVideo/videoCall';
import Peer from 'peerjs';
import { ActionTypes } from './redux/types/ActionTypes';
import FogotPassEmail from './compoment/homepage/FogotPassEmail';
import FogotPassOTP from './compoment/homepage/FogotPassOTP';
import FogotPassChange from './compoment/homepage/FogotPassChange';

// Tab Screen names
const homeName = 'Home';
const addFriendName = 'Friend';
const addGroupName = 'Group';
const infoUserName = 'Info';
const friendTabName = 'FriendTab';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function Root() {
  const dispatch = useDispatch();
  const { user, call, socket } = useSelector((state) => state);

  useEffect(() => {
    socket.on('callUserToClient', (data) => {
      dispatch({ type: ActionTypes.CALL, payload: data });
    });

    return () => socket.off('callUserToClient');
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const newPeer = new Peer('', {
        path: '/',
        secure: false,
        config: {
          iceServers: [
            { urls: ['stun:ss-turn2.xirsys.com'] },
            {
              username:
                'Awknma80yWxQgb3VQgBrQs_iNy-vaysOaDBOZ4xcA2GOLjY_ve-TdzjeCRZWrbrlAAAAAGGac750dWFuYW5oMjU4MjAwMA==',
              credential: '19d8e05c-4ae8-11ec-af6d-0242ac140004',
              urls: [
                'turn:ss-turn2.xirsys.com:80?transport=udp',
                'turn:ss-turn2.xirsys.com:3478?transport=udp',
                'turn:ss-turn2.xirsys.com:80?transport=tcp',
                'turn:ss-turn2.xirsys.com:3478?transport=tcp',
                'turns:ss-turn2.xirsys.com:443?transport=tcp',
                'turns:ss-turn2.xirsys.com:5349?transport=tcp',
              ],
            },
          ],
        },
      });
      dispatch({ type: ActionTypes.PEER, payload: newPeer });
    }
  }, [dispatch, user]);
  return (
    <NavigationContainer>
      {call && <VideoCall />}
      <TabHomeTest />
    </NavigationContainer>
  );
}

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={'Login'}
  >
    <Stack.Screen name="Hello" component={Hello} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Verify" component={Verify} />
    <Stack.Screen name="ChatBox" component={ChatBox} />
    <Stack.Screen name="UpdateInfo" component={UpdateInfo} />
    <Stack.Screen name="UpdateInfoGrChat" component={UpdateInfoGrChat} />
    <Stack.Screen name="UpdatePass" component={UpdatePass} />
    <Stack.Screen name="AddItemGr" component={AddItemGr} />
    <Stack.Screen name="FindFriend" component={FindFriend} />
    <Stack.Screen name="InfoRoomChat" component={InfoRoomChat} />
    <Stack.Screen name="InfoGrChat" component={InfoGrChat} />
    <Stack.Screen name="InfoMemberGr" component={InfoMemberGr} />
    <Stack.Screen name="UpdateInfoMemberGr" component={UpdateInfoMemberGr} />
    <Stack.Screen name="SendCall" component={SendCall} />
    <Stack.Screen name="VideoCall" component={VideoCall} />
    <Stack.Screen name="FogotPassEmail" component={FogotPassEmail} />
    <Stack.Screen name="FogotPassOTP" component={FogotPassOTP} />
    <Stack.Screen name="FogotPassChange" component={FogotPassChange} />
  </Stack.Navigator>
);

const TabHomeTest = () => (
  <Tab.Navigator
    initialRouteName={'Start'}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;

        if (rn === homeName) {
          iconName = 'chat';
        } else if (rn === addFriendName) {
          iconName = 'person-add';
        } else if (rn === addGroupName) {
          iconName = 'group-add';
        } else if (rn === infoUserName) {
          iconName = 'person';
        } else if (rn === friendTabName) {
          iconName = 'person';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    screenOptionss={{
      activeTintColor: '#F0B7A4',
      inactiveTintColor: 'grey',
      labelStyle: { paddingBottom: 10, fontSize: 10 },
      style: { padding: 10, height: 70 },
    }}
  >
    <Tab.Screen
      name={'Start'}
      component={StackNavigator}
      options={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => {
          'null';
        },
        tabBarStyle: { display: 'none' },
        tabBarButton: () => {
          'null';
        },
      }}
    />
    <Tab.Screen
      name={'FindFriend'}
      component={FindFriend}
      options={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => {
          'null';
        },
        tabBarStyle: { display: 'none' },
        tabBarButton: () => {
          'null';
        },
      }}
    />
    <Tab.Screen
      name={homeName}
      component={HomeScreen}
      options={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => {
          'null';
        },
      }}
    />
    <Tab.Screen
      name={addFriendName}
      component={AddFriendScreen}
      options={{
        headerShown: false,
        tabBarLabel: () => {
          'null';
        },
      }}
    />
    <Tab.Screen
      name={friendTabName}
      component={FriendTab}
      options={{
        headerShown: false,
        tabBarLabel: () => {
          'null';
        },
      }}
    />
    <Tab.Screen
      name={addGroupName}
      component={AddGroupScreen}
      options={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => {
          'null';
        },
      }}
    />
    <Tab.Screen
      name={infoUserName}
      component={InfoUserScreen}
      options={{
        headerShown: false,
        tabBarLabel: () => {
          'null';
        },
      }}
    />
  </Tab.Navigator>
);
