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
  const [inputHeight, setInputHeight] = useState<number>(hp('7%')); // Initial height

  const handleContentSizeChange = (contentHeight: number) => {
    setInputHeight(contentHeight + adjust(20)); // Adjust height with some padding
  };

  const styles = myStyles(inputHeight);
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
        onContentSizeChange={(e) => handleContentSizeChange(e.nativeEvent.contentSize.height)}
      />
    </View>
  );
};

const myStyles = (height: number) =>
  StyleSheet.create({
    container: {

    },
    input: {
      paddingHorizontal: 10,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: MY_COLORS.TXT_DIM,
      borderRadius: 12,
      color: 'black',
      marginTop: 2,
    },
    txt: { marginTop: 0 },
  });

export default App;
