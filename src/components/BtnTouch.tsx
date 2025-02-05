import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
  background: string;
  title: string;
}

export const BtnTouch = ({ onPress, background = 'pink', title }: Props) => {

  return (
    <View>
      <TouchableOpacity
      onPress={ onPress }
      >
        <View
          style={{
            ...style.btnContainer,
            backgroundColor: background
          }}
        >
          <Text
            style={ style.btnTitle }
          >
            { title }
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  btnContainer: {
    marginBottom: 10,
    marginLeft: 10, 
    marginRight: 10,
    marginTop: 10,
    width: 120,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
  },
  btnTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})