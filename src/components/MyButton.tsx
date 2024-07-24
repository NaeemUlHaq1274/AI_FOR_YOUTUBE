import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Image } from 'react-native';
import { IMAGES_PATHS, LAYOUT, MY_COLORS } from '@constants';
import MyText from './MyText';
import { adjust, hp, wp } from '@utils';

interface MyButtonProps {
  onPress: () => void;
  title: string;
  btnType?: 'white' | 'secondary';
  iconPath?: any;
  secondaryColor?: string;
  style?: ViewStyle;
  btnWidth?: any,
}

const MyButton: React.FC<MyButtonProps> = ({
  onPress,
  title,
  btnType = 'white',
  iconPath,
  btnWidth,
  style
}) => {
  const styles = myStyles(btnType, btnWidth);
  return (
    <TouchableOpacity style={[styles.button, LAYOUT.SHADOW, style]} onPress={onPress}>
      {iconPath && <Image source={iconPath} />}
      <MyText p color={btnType === 'white' ? 'black' : 'white'}>
        {title}
      </MyText>
    </TouchableOpacity>
  );
};

const myStyles = (btnType: string, btnWidth: any = wp("40%")) =>
  StyleSheet.create({
    button: {
      flexDirection: "row",
      gap: 10,
      width: btnWidth,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginVertical: 10,
      height: hp('6%'), // Adjust height as needed
      backgroundColor:
        btnType === 'white' ? "white" : MY_COLORS.SECONDARY,
    },
  });

export default MyButton;