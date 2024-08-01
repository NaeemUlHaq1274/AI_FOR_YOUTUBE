import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, ImageSourcePropType, View } from 'react-native';
import { MY_COLORS } from '@constants';
import { adjust } from '@utils';

interface MyButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  btnType?: 'primary' | 'secondary';
  btnWidth?: string | number;
  iconPath?: ImageSourcePropType;
  iconPosition?: 'left' | 'right';
  textColor?: string;
  justifyContent?: 'center' | 'space-between';
}

const MyButton: React.FC<MyButtonProps> = ({
  title,
  onPress,
  style,
  btnType = 'primary',
  btnWidth,
  iconPath,
  iconPosition = 'left',
  textColor = MY_COLORS.WHITE,
  justifyContent = 'center',
}) => {
  const renderIcon = () => (
    iconPath && <Image source={iconPath} style={styles.icon} />
  );

  return (
    <TouchableOpacity
      style={[styles.button, btnType === 'secondary' && styles.secondaryButton, { width: btnWidth }, style]}
      onPress={onPress}
    >
      <View style={[styles.contentContainer, { justifyContent }]}>
        {iconPosition === 'left' && renderIcon()}
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
        {iconPosition === 'right' && renderIcon()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: MY_COLORS.PRIMARY,
    padding: adjust(8),
    borderRadius: 8,
  },
  secondaryButton: {
    borderColor: MY_COLORS.PRIMARY,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: adjust(12),
    textAlign: 'center',
  },
  icon: {
    width: adjust(16),
    height: adjust(16),
    marginHorizontal: adjust(6),
  },
});

export default MyButton;