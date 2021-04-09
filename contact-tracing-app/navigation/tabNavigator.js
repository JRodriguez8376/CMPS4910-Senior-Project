import React from "react";
import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import HotspotScreen from '../screens/hotspotScreen';
import TestStartScreen from '../screens/testStartScreen';
import TestScreen from '../screens/testScreen';
import TestResultsScreen from '../screens/testResultsScreen';
import UserInfo from '../screens/userInfoScreen';
import UserNotify from '../screens/userNotifyScreen';
import ResourcesTips from '../screens/resourcesTips';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import {addBLEStartListener, removeBLEStartListener} from '../components/BLEModule';

// Thanks to: 
// https://stackoverflow.com/questions/61025437/how-to-combine-stacknavigator-and-tabnavigator-in-react-navigation-5
// For helping me with Tab Navigation that is nested inside a 
// Stack Navigation for Auth flow, see the StackNavigator to see the 
// SignedInNavigator Object passed in
const Tab = createBottomTabNavigator();

const SignedInNavigator = () => {
    addBLEStartListener();
    return (
        <Tab.Navigator
            initialRouteName="Path-o-Gen"
            tabBarOptions={{
                activeTintColor: '#ffffff',
                activeBackgroundColor: '#ff0000',
                inactiveTintColor: '#ff0000',
                inactiveBackgroundColor: '#ffffff',
                keyboardHidesTabBar: true,
            }}
        >
            <Tab.Screen
                name="Hotspot"
                component={HotspotScreen}
                options={{
                    tabBarLabel: "Hotspot",
                    tabBarIcon: ({color, size}) => (
                        <Icon name="map-o" size={size} color={color} /> 
                    ),
                }}
            />
            <Tab.Screen
                name="Test tab"
                component={TestScreenBoi}
                options={{
                    tabBarLabel: "Self Exam",
                    tabBarIcon: ({color, size}) => (
                        <Icon name="check" size={size} color={color} /> 
                    ),
                }}
            />
            <Tab.Screen
                name="User info"
                component={UserTabs}
                options={{
                    tabBarLabel: "User",
                    tabBarIcon: ({color, size}) => (
                        <Icon name="user-circle-o" size={size} color={color} /> 
                    ),
                }}
            />
            <Tab.Screen
                name="Resources and Tips tab"
                component={ResourcesTipsboi}
                options={{
                    tabBarLabel: "Resoruces & Tips",
                    tabBarIcon: ({color, size}) => (
                        <Icon name="info-circle" size={size} color={color} /> 
                    ),
                }}
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

const ResourcesTipsboi = () => {
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
    name="ResourcesTips"
    component={ResourcesTips}
    options={{
        title: 'Resources and Tips',
        headerShown: true,
    }}
    />
    </Stack.Navigator>
    )
}

const UserTabs = () => {
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
                name="UserInfo"
                component={UserInfo}
                options={{
                    title: 'Account Info',
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="UserNotify"
                component={UserNotify}
                options={{
                    title: 'Notify Others',
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}