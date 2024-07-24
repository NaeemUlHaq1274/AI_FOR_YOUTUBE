import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import { SubscriptionScreen } from '@screens';
import { SCREEN_NAMES, STACK_NAMES } from '@constants';
import { HomeStack } from '../stack';

const Drawer = createDrawerNavigator();

const DrawerNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator backBehavior='initialRoute' initialRouteName={STACK_NAMES.HOME_STACK} drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name={STACK_NAMES.HOME_STACK} component={HomeStack} options={{headerShown:false}} />
        <Drawer.Screen name={SCREEN_NAMES.SUBSCRIPTION_SCREEN} component={SubscriptionScreen} options={{headerShown:false}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
