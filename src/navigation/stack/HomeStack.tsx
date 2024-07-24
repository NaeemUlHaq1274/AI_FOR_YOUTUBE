import { SCREEN_NAMES } from '@constants';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard } from '@screens';
import React from 'react';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAMES.DASHBOARD_SCREEN}>
      <Stack.Screen name={SCREEN_NAMES.DASHBOARD_SCREEN} component={Dashboard} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
