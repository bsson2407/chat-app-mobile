import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';



export default function UpdatePass({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.txtOTP}>Đổi mật khẩu</Text>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontWeight:'bold'}}>Mật khẩu cũ:</Text>
          <TextInput style={styles.inputText}></TextInput>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontWeight:'bold'}}>Mật khẩu mới: </Text>
          <TextInput style={styles.inputText}></TextInput>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontWeight:'bold'}}>Nhập lại mật khẩu mới: </Text>
          <TextInput style={styles.inputText}></TextInput>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center',width:'100%'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Info')} style={styles.btnAll}>
            <Text>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Info')} style={styles.btnAll}>
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
  main:{
    width:'90%',
    height:300,
    backgroundColor:'white',
    borderRadius:30,
    justifyContent:'flex-start',
    borderWidth:1,
    alignItems:'flex-end'
  },
  btnAll:{
    width:'40%',
    height:40,
    backgroundColor:'#F0B7A4',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    margin:10
  },
  inputText:{
    width:'55%',
    height:40,
    backgroundColor:'white',
    borderRadius:20,
    marginBottom:20,
    paddingLeft:20,
    fontSize:20,
    borderBottomWidth:1
  },
  txtOTP:{
    width:'100%',
    textAlign:'center',
    fontWeight:'bold',
    fontSize:25,
    padding:10,
    
  }
});
