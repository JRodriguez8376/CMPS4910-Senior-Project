import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import BackgroundTimer from 'react-native-background-timer';
import React, {useRef, useState, useEffect} from "react";
import {AppState, Stylesheet, Text, View} from "react-native";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Recieved message in background");
})
registerRootComponent(App);

const intervalId = BackgroundTimer.setInterval(() => {
    BLE.checkBLE();
    console.log('tic');
}, 900000);
BackgroundTimer.clearInterval(intervalId);

