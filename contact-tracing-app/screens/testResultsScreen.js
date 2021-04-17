import React, { useState, useEffect } from 'react';
import styles from './styles/testResultsScreen.style.js';
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

var disclaimerTxt = "The self-evaluation test is designed to give "
            + "advice to a user if they may need to go visit a doctor or get test "
            + "for COVID-19. Any results given are not certain facts that a user "
            + "may be sick/infected and should do further research or go see a "
            + "doctor if they have more concerns about their condition. Our goal "
            + "is giving users a source for additional advice on their next steps.";

var answer = "";
const adviceAnswer = (amount) => {
    if (amount == 0) {
        answer = "No risk of COVID-19.";
    }
    else if (amount < 6) {
        answer = "Symptoms appear mild. If symptoms persist for more than 48 hours, "
            + "reevaluate yourself or see a doctor.";
    }
    else if (6 < amount && amount < 10) {
        answer = "Symptoms are higher than normal. Recommend to follow CDC COVID-19 guidelines. "
        + "If symptoms persist for more than 48 hours, "
        + "reevaluate yourself or see a doctor.";
    }
    else {
        answer = "You have a high probability of having COVID-19. You may want to go see a doctor or get a COVID-19 test.";
    }
};

const TestResultsScreen = ({route, navigation}) => {
    const { testSum, otherParam } = route.params;

    adviceAnswer(testSum);
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#ff0000"
                barStyle="light-content" 
            />
            {/*<View style={{justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#FF0000', width: '100%', height: 25}}>
                <Text >
                    Test Placeholder
                </Text>
            </View>*/}

            <View style={styles.answerBox}>
                <Text style={styles.answerText}>{answer}</Text>
            </View>
            <View style={styles.formElement}>
                <TouchableOpacity style={styles.backButton}
                    onPress={() => navigation.navigate('TestStart')}
                >
                    <Text style={{fontSize: 15, color: 'white'}}>Go Back to Main Screen</Text>
                </TouchableOpacity>
                {/*Debug<Text style={{color: 'blue', fontSize: 16, fontWeight: 'bold'}}>Hi: {testSum}</Text>
                <Text style={{color: 'blue', fontSize: 16, fontWeight: 'bold'}}>Hi: {answer}</Text>*/}
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
export default TestResultsScreen;