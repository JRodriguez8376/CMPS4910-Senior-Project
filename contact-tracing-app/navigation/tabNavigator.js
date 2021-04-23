import React from "react";
import { TouchableOpacity } from 'react-native';
import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import HotspotScreen from '../screens/hotspotScreen';
import TestStartScreen from '../screens/testStartScreen';
import TestScreen from '../screens/testScreen';
import TestResultsScreen from '../screens/testResultsScreen';
import UserInfo from '../screens/userInfoScreen';
import UserNotify from '../screens/userNotifyScreen';
import UserNotification from '../screens/userNotificationScreen';
import ResourcesTips from '../screens/resourcesTips';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import {addBLEStartListener, removeBLEStartListener} from '../components/BLEModule';
import BackgroundTimer from 'react-native-background-timer';
import {addNewContact, updateContactList} from '../components/contact';
import {NativeModules} from 'react-native';
const {BLE} = NativeModules;
import {startContacting} from '../components/backgroundIntervals';

//import updateContactList from './components/contact';

// Thanks to: 
// https://stackoverflow.com/questions/61025437/how-to-combine-stacknavigator-and-tabnavigator-in-react-navigation-5
// For helping me with Tab Navigation that is nested inside a 
// Stack Navigation for Auth flow, see the StackNavigator to see the 
// SignedInNavigator Object passed in
const Tab = createBottomTabNavigator();

const SignedInNavigator = () => {
    //bakcground geolocation
    startContacting();
    /*
    const intervalId = BackgroundTimer.setInterval(() => {
        //BLE.checkBLE();
        //If New data from BLE.getContactInfo(), 
        BLE.start();
        updateContactList();
        
        BLE.getTestContactInfo()
        .then(results => {
            let keys = Object.keys(results)
            for(var i = 0; i < keys.length; i++) {
                let value = results[keys[i]];
                //console.log(`VALUE ${value} AT KEY: ${keys[i]}`)
                addNewContact(keys[i], value*1000)
            }
            //console.log(keys[0], "_", keys[1]);
        }).catch(error => {
            console.log("getContactInfo recieved no info!");
        })
        console.log('tic');
    }, 10000);
*/
    addBLEStartListener();
    return (
        <Tab.Navigator
            initialRouteName="User info"
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
                //headerLeft: null,
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
            <Stack.Screen
                name="UserNotification"
                component={UserNotification}
                options={{
                    title: 'Notifications',
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}