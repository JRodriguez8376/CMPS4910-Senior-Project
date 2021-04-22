import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import BackgroundTimer from 'react-native-background-timer';
import React, { useRef, useState, useEffect } from "react";
import { AppState, Stylesheet, Text, View } from "react-native";
import {addNewContact, updateContactList} from './components/contact'
import { NativeModules } from 'react-native';
const {BLE} = NativeModules


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Recieved message in background");
})
registerRootComponent(App);

const intervalId = BackgroundTimer.setInterval(() => {
    //BLE.checkBLE();
    //If New data from BLE.getContactInfo(), 
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
    })
    console.log('tic');
}, 10000);


/*const AppStateboi = () => {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        AppState.addEventListener("change", _handlAppChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    const _handleAppStateChange = (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState == "active") {
            console.log("App is in foreground");
            ble.start();
        }
    }
}*/

