

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
    <TouchableOpacity style={[styles.btnStyle, style, { ...backgroundColor,padding:paddingVertical}]} onPress={onPress} disabled={disabled} >
      {iconPath && <Image source={iconPath} resizeMode='contain' />}
      <MyText p color={textColor}>{title}</MyText>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({
  btnStyle: { width: "100%", borderRadius: 8, justifyContent: "center", flexDirection: "row", gap: 12, alignItems: "center" }
})
// import React, { useMemo } from 'react';
// import { TouchableOpacity, Text, StyleSheet, Image, ImageSourcePropType, View } from 'react-native';
// import { MY_COLORS } from '@constants';
// import { adjust } from '@utils';

// interface MyButtonProps {
//   title: string;
//   onPress: () => void;
//   style?: object;
//   btnType?: 'primary' | 'secondary';
//   btnWidth?: string | number;
//   iconPath?: ImageSourcePropType;
//   iconPosition?: 'left' | 'right';
//   textColor?: string;
//   justifyContent?: 'center' | 'space-between';
//   disabled?: boolean;
//   iconSize?: number;
// }

// const MyButton: React.FC<MyButtonProps> = ({
//   title,
//   onPress,
//   style,
//   btnType = 'primary',
//   btnWidth,
//   iconPath,
//   iconPosition = 'left',
//   textColor = MY_COLORS.WHITE,
//   justifyContent = 'center',
//   disabled = false,
//   iconSize = 16,
// }) => {
//   const buttonStyle = useMemo(() => [
//     styles.button,
//     btnType === 'secondary' && styles.secondaryButton,
//     { width: btnWidth },
//     disabled && styles.disabledButton,
//     style,
//   ], [btnType, btnWidth, disabled, style]);

//   const contentContainerStyle = useMemo(() => [
//     styles.contentContainer,
//     { justifyContent },
//   ], [justifyContent]);

//   const textStyle = useMemo(() => [
//     styles.buttonText,
//     { color: disabled ? MY_COLORS.DARK_GRAY : textColor },
//   ], [textColor, disabled]);

//   const iconStyle = useMemo(() => [
//     styles.icon,
//     { width: adjust(iconSize), height: adjust(iconSize) },
//   ], [iconSize]);

//   const renderIcon = () => (
//     iconPath && <Image source={iconPath} style={iconStyle} />
//   );

//   return (
//     <TouchableOpacity
//       style={buttonStyle}
//       onPress={onPress}
//       disabled={disabled}
//     >
//       <View style={contentContainerStyle}>
//         {iconPosition === 'left' && renderIcon()}
//         <Text style={textStyle}>{title}</Text>
//         {iconPosition === 'right' && renderIcon()}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: MY_COLORS.PRIMARY,
//     padding: adjust(8),
//     borderRadius: 8,
//   },
//   secondaryButton: {
//     borderColor: MY_COLORS.PRIMARY,
//     borderWidth: 1,
//     backgroundColor: 'transparent',
//   },
//   disabledButton: {
//     opacity: 0.5,
//   },
//   contentContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     fontSize: adjust(12),
//     textAlign: 'center',
//   },
//   icon: {
//     marginHorizontal: adjust(6),
//   },
// });

// export default MyButton;
