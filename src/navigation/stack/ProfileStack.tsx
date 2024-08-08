import { SCREEN_NAMES } from '@constants';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileDashboard, SubscriptionScreen } from '@screens';
import React from 'react';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAMES.SUBSCRIPTION_SCREEN}>
      <Stack.Screen name={SCREEN_NAMES.PROFILE_DASHBOARD_SCREEN} component={ProfileDashboard} options={{ headerShown: false }} />
      <Stack.Screen name={SCREEN_NAMES.SUBSCRIPTION_SCREEN} component={SubscriptionScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
