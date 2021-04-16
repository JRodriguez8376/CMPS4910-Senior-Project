import React, { useState, useEffect } from 'react';
import styles from './styles/testStartScreen.style.js';
import {
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { fetchTestData } from '../api/helpers';
import { FlatList, State } from 'react-native-gesture-handler';
//Fetch Requests
// Example code from: https://reactnative.dev/docs/network
//Just testing fetching data from my Node server
var infoText = "The following self-evaluation test will give you non-medical "
            + "opinion if you should go visit a medical professional or possibly "
            + "take a COVID-19 test.";

var infoTextBot = "Click the Button Below to Begin";

var disclaimerTxt = "The self-evaluation test is designed to give "
            + "advice to a user if they may need to go visit a doctor or get test "
            + "for COVID-19. Any results given are not certain facts that a user "
            + "may be sick/infected and should do further research or go see a "
            + "doctor if they have more concerns about their condition. Our goal "
            + "is giving users a source for additional advice on their next steps.";
/*
var answer = "";
const adviceAnswer = (amount) => {
    if (amount < 1) {
        answer = "You are clear.";
    }
    else if (0 < amount && amount < 4) {
        answer = "You may want to go see a doctor or get a COVID-19 test."
    }
    else {
        answer = "You may want to go see a doctor or get a COVID-19 test."
    }
};
*/
const TestStartScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#ff0000"
                barStyle="light-content" 
            />
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>{infoText}</Text>
                <Text style={styles.infoText1}>{infoTextBot}</Text>
            </View>
            <View style={styles.formElement}>
                <TouchableOpacity style={styles.backButton}
                    onPress={() => navigation.navigate('TestScreen')}
                >
                    <Text style={{fontSize: 15, color: 'white'}}>Start Self Examination</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.disclaimerTextBox}>
                <Text style={styles.disclaimerTitleText}>
                    Disclaimer:
                </Text>
                <Text style={styles.disclaimerText}>
                    {disclaimerTxt}
                </Text>
            </View>
            
        </View>
    );

}
export default TestStartScreen;