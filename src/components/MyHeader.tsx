import React, { FC } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyText from './MyText';
import { IMAGES_PATHS, MY_COLORS } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '@utils';

interface MyHeaderProps {
  color?: string;
  title: string;
  iconPath?: any;
  onPressIcon?: any;
}

const MyHeader: FC<MyHeaderProps> = ({ color = MY_COLORS.PRIMARY, title, iconPath, onPressIcon }) => {
  const insets = useSafeAreaInsets();
  const styles = myStyles(insets);
  const { goBack } = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: color }]}>
      <TouchableOpacity onPress={() => onPressIcon()}>
        <Image source={IMAGES_PATHS.MENU} style={styles.iconContainer} />
      </TouchableOpacity>
      <MyText p bold color={color === MY_COLORS.PRIMARY ? 'white' : color === 'transparent' ? 'white' : 'black'}>
        {title}
      </MyText>
    </View>
  );
};

const myStyles = (insets: any) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: insets.top + 10,
      paddingBottom: 20,
    },
    iconContainer: {
      height: hp('2.5%'),
      width: hp('2.5%'),
      resizeMode: 'contain',
      marginRight: wp('5%'),
    },
  });

export default MyHeader;