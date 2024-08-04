import { ICONS_PATHS, MY_COLORS } from '@constants';
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
    <View style={[styles.header, {}]}>
      <TouchableOpacity onPress={onPressIcon}>
        <Image source={ICONS_PATHS.LOGO} />
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
    paddingVertical: adjust(6),
  },

  title: {
    color: 'white',
    fontSize: 20,
  },
  rightIcon: {
    width: adjust(40),
    height: adjust(40),
    borderRadius: adjust(20),
  },
});

export default MyHeader;