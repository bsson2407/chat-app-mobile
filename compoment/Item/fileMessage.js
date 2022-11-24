import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

const FileMessage = ({ item }) => {
  const [pathFile, setPathFile] = useState('');
  useEffect(() => {
    setPathFile(item.urlLink.split('.')[item.urlLink.split('.').length - 1]);
  }, []);
  return (
    <View style={styles.listChatBorderSeft}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {pathFile === 'pdf' ? (
          <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={require('../../assets/icons/pdf_icon.png')}
          />
        ) : // <img src="images/icons/pdf_icon.png" alt="" />
        pathFile === 'doc' || pathFile === 'docx' ? (
          <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={require('../../assets/icons/word_icon.png')}
          />
        ) : pathFile === 'csv' || pathFile === 'xls' ? (
          <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={require('../../assets/icons/excel_icon.png')}
          />
        ) : pathFile === 'txt' ? (
          <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={require('../../assets/icons/txt_icon.png')}
          />
        ) : (
          <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={require('../../assets/icons/blank_icon.png')}
          />
        )}
        <Text>{item.message}</Text>
        <TouchableOpacity>
          <Ionicons
            style={{ fontSize: 25, marginLeft: 10 }}
            name="arrow-circle-down"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FileMessage;
