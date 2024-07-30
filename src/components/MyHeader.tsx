import { ICONS_PATHS } from '@constants';
import { adjust } from '@utils';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType, StyleSheet } from 'react-native';
interface MyHeaderProps {
  color: string;
  title: string;
  iconPath: ImageSourcePropType;
  onPressIcon: () => void;
  rightIcon?: ImageSourcePropType;
}

const MyHeader: React.FC<MyHeaderProps> = ({ color, title, iconPath, onPressIcon, rightIcon }) => {
  return (
    <View style={[styles.header, { backgroundColor: color }]}>
      <TouchableOpacity onPress={onPressIcon}>
        <Image source={ICONS_PATHS.LOGO} style={styles.icon} />
      </TouchableOpacity>
      {rightIcon && <Image source={rightIcon} style={styles.rightIcon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: adjust(10),
  },
  icon: {
    width: adjust(130),
    height: adjust(40),
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  rightIcon: {
    width: adjust(40),
    height: adjust(40),
    borderRadius: 15,
  },
});

export default MyHeader;