import { MY_COLORS } from '@constants';
import { adjust, hp } from '@utils';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View } from 'react-native';
import MyText from './MyText';

interface AppProps extends TextInputProps {
  value?: string;
  placeholder: string;
  style?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
}

const App: React.FC<AppProps> = ({
  value,
  placeholder,
  style,
  onChangeText,
}) => {

  const styles = myStyles();
  return (
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor={MY_COLORS.TXT_DIM}
        value={value}
        onChangeText={onChangeText}
        multiline
      />
  );
};

const myStyles = () =>
  StyleSheet.create({
    input: {
      backgroundColor:MY_COLORS.BLACK,
      paddingHorizontal: adjust(10),
      borderRadius: 8,
      color: MY_COLORS.WHITE,
      height:hp(16),
      textAlignVertical: 'top', // Align text vertically at the top
      textAlign: 'left', // Align text horizontally at the left
      padding: adjust(8), // Remove any default padding
      margin: 0, // Remove any default margin
      fontSize:adjust(14)
    },
  });

export default App;
