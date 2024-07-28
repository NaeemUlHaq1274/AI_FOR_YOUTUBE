import { STACK_NAMES } from '@constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { CreateStack } from '../stack';
import SavedStack from '../stack/SavedStack';
import ProfileStack from '../stack/ProfileStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name={STACK_NAMES.CREATE_STACK} component={CreateStack} />
            <Tab.Screen name={STACK_NAMES.SAVED_STACK} component={SavedStack} />
            <Tab.Screen name={STACK_NAMES.PROFILE_STACK} component={ProfileStack} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;
