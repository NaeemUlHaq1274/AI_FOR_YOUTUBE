import { SCREEN_NAMES } from '@constants';
import { createStackNavigator } from '@react-navigation/stack';
import { SavedDashboard } from '@screens';
import React from 'react';

const Stack = createStackNavigator();

const SavedStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAMES.SAVED_DASHBOARD_SCREEN}>
      <Stack.Screen name={SCREEN_NAMES.SAVED_DASHBOARD_SCREEN} component={SavedDashboard} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default SavedStack;
