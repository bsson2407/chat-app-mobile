import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import { useRoute } from '@react-navigation/native';



export default function Hello({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.img}>
          <Image source={require('../img/anh1.png')}></Image>
        </View>
        <View style={styles.sayhello}>
          <Text style={styles.bigText}>Welcome to “HiChat”</Text>
          <Text style={styles.smallText}>The place where you
                                        {'\n'}will find friends
                                        {'\n'}to chat with</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btnGetStart}>
            <Text style={styles.texttn}>Get Started</Text>
        </TouchableOpacity>
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
  img:{
    flex:2,
    marginTop:100,
    marginBottom:50
  },
  sayhello:{
    flex:3,
    width:'100%',
    justifyContent:'center',
    backgroundColor:'rgba(132, 79, 80, 0.43)',
    alignItems:'center',
    borderTopLeftRadius:45,
    borderTopRightRadius:45,
    marginTop:10
  },
  bigText:{
    color:'white',
    fontSize: 37,
    fontWeight:'bold',
    marginBottom:14
  },
  smallText:{
    fontSize:25,
    color:'white',
    textAlign:'center',
    marginBottom:30
  },
  btnGetStart:{
    width:'80%',
    height:70,
    backgroundColor:'#F0B7A4',
    borderRadius:45,
    justifyContent:'center',
    alignItems:'center',
  },
  texttn:{
    color:'white',
    fontSize:30,
    fontWeight:'bold'
  }
});
