import React from "react";
import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import HotspotScreen from '../screens/hotspotScreen';
import TestScreen from '../screens/testScreen';
import UserInfoTab from '../screens/userInfoScreen';


// Thanks to: 
// https://stackoverflow.com/questions/61025437/how-to-combine-stacknavigator-and-tabnavigator-in-react-navigation-5
// For helping me with Tab Navigation that is nested inside a 
// Stack Navigation for Auth flow, see the StackNavigator to see the 
// SignedInNavigator Object passed in
const Tab = createBottomTabNavigator();
const SignedInNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Hotspot"
                component={HotspotScreen}
            />
            <Tab.Screen
                name="Test tab"
                component={TestScreen}
            />
            <Tab.Screen
                name="User info Test tab"
                component={UserInfoTab}
            />
        </Tab.Navigator>
    )
}
export default SignedInNavigator;