import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';

export const BottomText = ({sendButtOnPress, galleryImageonPress}) => {
  const [text, onChangeText] = React.useState('');
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        zIndex: 40,
        marginLeft: 12,
        marginBottom: 8,
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#fff',
          borderRadius: 70,
          width: '80%',
          display: 'flex',
          flexDirection: 'row',
          height: 45,
        }}>
        <TouchableOpacity
          onPress={() => galleryImageonPress()}
          style={{
            marginLeft: 6,
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 25, height: 25, backgroundColor: 'white'}}
            source={require('../assests/gallery.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={{marginLeft: 8}}
          placeholder="Add a caption..."
          onChangeText={onChangeText}
          value={text}
        />
      </View>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TouchableOpacity
          onPress={() => sendButtOnPress()}
          style={{
            zIndex: 50,
            borderRadius: 40,
            // borderWidth: 1,
            // borderColor: '#000',
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#21998b',
            width: '10%',
            width: 48,
            height: 48,
          }}>
          <Image
            style={{
              resizeMode: 'contain',
            }}
            source={require('../assests/plane.png')}
          />
        </TouchableOpacity>
        <Text
          style={{color: '#fff', width: 140, right: 60, top: 4, fontSize: 12}}>
          {'>  Status (Contacts)'}
        </Text>
      </View>
    </View>
  );
};
