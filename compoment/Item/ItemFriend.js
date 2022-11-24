import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

import anh from './anh1.png'



export default function ItemFriend() {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.imgStyple}>
                    <Image style={styles.myImg} source={require('./anh1.png')}></Image>
                </View>
                <View style={styles.myValue}>
                    <View style={styles.myName}>
                        <Text style={styles.nameName}>Name</Text>
                        <Text style={styles.time}>time</Text>
                    </View>
                    <View style={styles.mess}>
                        <View style={{ width: '90%', flexDirection: 'row' }}>
                            <Text style={styles.user}>Ban:</Text>
                            <Text style={styles.messVal}>ACB</Text>
                        </View>
                        <View style={styles.nofi}>
                            <Text style={styles.nofiTxt}>N</Text>
                        </View>
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
        padding: 10
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
        borderColor: 'grey'
    },
    myName: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameName: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '80%'
    },
    time: {
        fontSize: 15,
        color: 'grey',
        textAlign:'right',
        width:'20%'
    },

    mess: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    user: {
        fontSize: 15,
        color: 'grey',
        marginRight: 5,
    },
    messVal: {
        fontSize: 15,
        color: 'grey'
    },
    nofi: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 90
    },
    nofiTxt: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center'
    }
});
