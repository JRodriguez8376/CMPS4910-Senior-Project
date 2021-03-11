import React from "react";
import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import HotspotScreen from '../screens/hotspotScreen';
import TestStartScreen from '../screens/testStartScreen';
import TestScreen from '../screens/testScreen';
import TestResultsScreen from '../screens/testResultsScreen';
import UserInfoTab from '../screens/userInfoScreen';
import { createStackNavigator } from "@react-navigation/stack";


// Thanks to: 
// https://stackoverflow.com/questions/61025437/how-to-combine-stacknavigator-and-tabnavigator-in-react-navigation-5
// For helping me with Tab Navigation that is nested inside a 
// Stack Navigation for Auth flow, see the StackNavigator to see the 
// SignedInNavigator Object passed in
const Tab = createBottomTabNavigator();
//const Stack = createStackNavigator();
const SignedInNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Hotspot"
                component={HotspotScreen}
            />
            <Tab.Screen
                name="Test tab"
                component={TestScreenBoi}
                
            />
            <Tab.Screen
                name="User info Test tab"
                component={UserInfoTab}
            />
        </Tab.Navigator>
    )
}
export default SignedInNavigator;


const Stack = createStackNavigator();
const TestScreenBoi = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ff0000',
                },
                headerTintColor: 'white',
                headerLeft: null,
                headerTitleAlign: 'center',
                //headerTintColor: '#fff',
            }}
        >
            <Stack.Screen
                name="TestStart"
                component={TestStartScreen}
                options={{
                    title: 'Self Evaluation',
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="TestScreen"
                component={TestScreen}
                options={{
                    title: 'Self Evaluation',
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="TestResults"
                component={TestResultsScreen}
                options={{
                    title: 'Self Evaluation',
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}