import { SCREEN_NAMES } from '@constants';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateDashboard } from '@screens';
import React from 'react';

const Stack = createStackNavigator();

const CreateStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAMES.CREATE_DASHBOARD_SCREEN}>
      <Stack.Screen name={SCREEN_NAMES.CREATE_DASHBOARD_SCREEN} component={CreateDashboard} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default CreateStack;
