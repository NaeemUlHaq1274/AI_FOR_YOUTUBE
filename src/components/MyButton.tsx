import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { MY_COLORS } from '@constants';
import { adjust } from '@utils';

interface MyButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  btnType?: 'primary' | 'secondary';
  btnWidth?: string | number;
  iconPath?: ImageSourcePropType;
  textColor?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  title,
  onPress,
  style,
  btnType = 'primary',
  btnWidth,
  iconPath,
  textColor = MY_COLORS.WHITE,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, btnType === 'secondary' && styles.secondaryButton, { width: btnWidth }, style]}
      onPress={onPress}
    >
      {iconPath && <Image source={iconPath} style={styles.icon} />}
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: MY_COLORS.PRIMARY,
    padding: adjust(12),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: MY_COLORS.PRIMARY,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: adjust(12),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: adjust(20),
    height: adjust(20),
    marginRight: adjust(10),
  },
});

export default MyButton;
