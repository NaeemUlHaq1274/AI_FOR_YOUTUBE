import { MY_COLORS } from '@constants';
import { adjust, hp } from '@utils';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View } from 'react-native';
import MyText from './MyText';

interface AppProps extends TextInputProps {
  label?: string;
  value?: string;
  placeholder: string;
  style?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
}

const App: React.FC<AppProps> = ({
  label,
  value,
  placeholder,
  style,
  onChangeText,
}) => {

  const styles = myStyles();
  return (
    <View style={styles.container}>
      {label && <MyText p color={MY_COLORS.TXT_DIM} style={styles.txt}>{label}</MyText>}
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor={MY_COLORS.TXT_DIM}
        value={value}
        onChangeText={onChangeText}
        multiline // Enable multiline to allow for dynamic height adjustment
      />
    </View>
  );
};

const myStyles = () =>
  StyleSheet.create({
    container: {

    },
    input: {
      paddingHorizontal: adjust(10),
      borderWidth: 1,
      borderColor: MY_COLORS.TXT_DIM,
      borderRadius: 12,
      color: 'black',
    },
    txt: { marginTop: 0 },
  });

export default App;
