import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { MyText } from '@components';
import { DASHBOARD_IMAGES_PATH, IMAGES_PATHS, MY_COLORS, SCREEN_NAMES, STACK_NAMES } from '@constants';
import { useNavigation } from '@react-navigation/native';

interface DrawerProps {
  state: any;
  navigation: any;
  descriptors: any;
}
interface DrawerLabelProps {
  label: string;
  focused: boolean;
  ImagePath:any;
}

const DrawerContent: React.FC<DrawerProps> = (props) => {
  const activeRouteName = props.state.routes[props.state.index].name;
  const { navigate }: any = useNavigation();
  const itemStyle = {borderLeftWidth:4, paddingLeft:10, borderColor:MY_COLORS.PRIMARY}
  // console.log({name: props.state.routes[props.state.index].name});
  // console.log({index: props.state.index});

  return (
    <View style={styles.container}>
      <DrawerContentScrollView style={{margin:0,padding:0}} >
        <DrawerHeader />
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem activeBackgroundColor={"white"} pressColor={"white"} style={[{borderRadius:0,paddingLeft:14,marginHorizontal: 0},activeRouteName ==  STACK_NAMES.HOME_STACK? itemStyle: {}]} focused={activeRouteName == STACK_NAMES.HOME_STACK} label={({ focused }) => <DrawerLabel ImagePath={focused ? IMAGES_PATHS.BLACK_FEEDBACK : IMAGES_PATHS.BLACK_FEEDBACK} label='Home'  focused={focused} />} onPress={() => navigate(STACK_NAMES.HOME_STACK)} />
        <DrawerItem activeBackgroundColor={"white"} pressColor={"white"} style={[{borderRadius:0,paddingLeft:14,marginHorizontal: 0},activeRouteName == SCREEN_NAMES.SUBSCRIPTION_SCREEN? itemStyle: {}]}  focused={activeRouteName == SCREEN_NAMES.SUBSCRIPTION_SCREEN} label={({ focused }) => <DrawerLabel ImagePath={focused ? IMAGES_PATHS.BLACK_FEEDBACK : IMAGES_PATHS.BLACK_FEEDBACK} label='Subscription'  focused={focused} />} onPress={() => navigate(SCREEN_NAMES.SUBSCRIPTION_SCREEN)} />
        <DrawerItem activeBackgroundColor={"white"} pressColor={"white"} style={{borderRadius:0,marginHorizontal: 0, paddingLeft:14,paddingVertical:0}} label={({ focused }) => <DrawerLabel ImagePath={focused ? IMAGES_PATHS.BLACK_FEEDBACK : IMAGES_PATHS.BLACK_FEEDBACK} label='Privacy'  focused={focused} />} onPress={() => { }} />
        <DrawerItem activeBackgroundColor={"white"} pressColor={"white"} style={{borderRadius:0,marginHorizontal: 0, paddingLeft:14}} label={({ focused }) => <DrawerLabel ImagePath={focused ? IMAGES_PATHS.BLACK_FEEDBACK : IMAGES_PATHS.BLACK_FEEDBACK} label='Terms' focused={focused} />} onPress={() => { }} />
        <DrawerItem activeBackgroundColor={"white"} pressColor={"white"} style={{borderRadius:0,marginHorizontal: 0, paddingLeft:14}} label={({ focused }) => <DrawerLabel ImagePath={focused ? IMAGES_PATHS.BLACK_FEEDBACK : IMAGES_PATHS.BLACK_FEEDBACK} label='Feedback'  focused={focused} />} onPress={() => { }} />
        <DrawerItem activeBackgroundColor={"white"} pressColor={"white"} style={{borderRadius:0,marginHorizontal: 0, paddingLeft:14}} label={({ focused }) => <DrawerLabel ImagePath={focused ? IMAGES_PATHS.BLACK_FEEDBACK : IMAGES_PATHS.BLACK_FEEDBACK} label='Tell a friend' focused={focused} />} onPress={() => { }} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    borderRadius:50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default DrawerContent;





const DrawerLabel: React.FC<DrawerLabelProps> = ({ label, focused, ImagePath }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
      <Image source={{}} />
      <MyText bold color={focused? MY_COLORS.PRIMARY:MY_COLORS.TXT_SECONDARY}>{label}</MyText>
    </View>
  );
};

const DrawerHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Image source={{}} />
    </View>
  );
};
