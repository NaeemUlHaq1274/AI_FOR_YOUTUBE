

import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MY_COLORS } from '@constants';
import MyText from './MyText';
import { adjust } from '@utils';

interface MyButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  btnType?: 'primary' | 'secondary';
  iconPath?: ImageSourcePropType;
  disabled?: boolean;
  textColor?: string;
}


const MyButton: React.FC<MyButtonProps> = ({
  title,
  onPress,
  style,
  btnType = 'primary',
  iconPath,
  disabled = false,
  textColor = btnType === "primary" ? MY_COLORS.WHITE : MY_COLORS.PRIMARY
}) => {

  const backgroundColor = btnType === "primary" ? { backgroundColor: MY_COLORS.PRIMARY } : { backgroundColor: "transparent", borderColor: MY_COLORS.PRIMARY, borderWidth: 1 }

  const paddingVertical = iconPath ? adjust(11) : adjust(12)

  return (
    <TouchableOpacity style={[styles.btnStyle, style, { ...backgroundColor, padding: paddingVertical }]} onPress={onPress} disabled={disabled} >
      {iconPath && <Image source={iconPath} resizeMode='contain' />}
      <MyText p color={textColor}>{title}</MyText>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({
  btnStyle: { width: "100%", borderRadius: 8, justifyContent: "center", flexDirection: "row", gap: 12, alignItems: "center" }
})