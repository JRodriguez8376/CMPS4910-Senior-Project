import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    NavigationContainer,

} from '@react-navigation/native';
import {
    createStackNavigator
} from '@react-navigation/stack';
import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';

import { FlatList, State } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';
import Navigation from './navigation/stackNavigator';


const App = () => {
    return(


        <Navigation/>

        
    )
}
export default App;