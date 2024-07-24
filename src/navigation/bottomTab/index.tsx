import { SCREEN_NAMES, STACK_NAMES } from '@constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Dashboard, SubscriptionScreen } from '@screens';
import React from 'react';
import { HomeStack } from '../stack';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name={STACK_NAMES.HOME_STACK} component={HomeStack} />
                <Tab.Screen name={SCREEN_NAMES.HOME_LOADING_SCREEN} component={SubscriptionScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomTabNavigation;
