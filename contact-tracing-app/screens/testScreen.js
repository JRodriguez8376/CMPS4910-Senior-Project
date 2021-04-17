import React, { useState, useEffect } from 'react';
import styles from './styles/testScreen.style.js';
import {
    SafeAreaView,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
//import { RadioButton } from 'react-native-paper';
import { fetchTestData } from '../api/helpers';
import { FlatList, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

// Will probably need to add font "FontAwesome" whem exporting out of expo.

//import TestScreen from '../screens/loginScreen';

const myIcon = <Icon name="rocket" size={30} color="#900" />;

//Fetch Requests
// Example code from: https://reactnative.dev/docs/network
//Just testing fetching data from my Node server

const QuestionData = [ 
    {
        id: 1,
        num: 1,
        title: "Fever or chills",
        val: 1,
    },
    {
        id: 2,
        num: 2,
        title: "Cough",
        val: 4,
    },
    {
        id: 3,
        num: 3,
        title: "Shortness of breath or difficulty breathing",
        val: 10,
    },
    {
        id: 4,
        num: 4,
        title: "Fatigue",
        val: 4,
    },
    {
        id: 5,
        num: 5,
        title: "Muscle or body aches",
        val: 1,
    },
    {
        id: 6,
        num: 6,
        title: "Headache",
        val: 1,
    },
    {
        id: 7,
        num: 7,
        title: "New loss of taste or smell",
        val: 10,
    },
    {
        id: 8,
        num: 8,
        title: "Sore throat",
        val: 2,
    },
    {
        id: 9,
        num: 9,
        title: "Congestion or runny nose",
        val: 1,
    },
    {
        id: 10,
        num: 10,
        title: "Nausea or vomitting",
        val: 1,
    },
    {
        id: 11,
        num: 11,
        title: "Diarrhea",
        val: 1,
    },
];
var yesArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


const SampleArr = [
    "Q1: .....",
    "Q2: .....",
    "Q3: .....",
];

let counter = 0;
const globalVar = {
    counter
};
const sumArr = () => {
    //counter = yesArr.reduce((a,b) => a + b, 0)
    for (var i = 0; i < 11; i++) {
        if (yesArr[i] == 1) {
            counter += QuestionData[i].val;
        }
    }
    //console.log(yesArr);
    console.log("sumArr(): counter: %d", counter);
    return counter;
};
const resetArr = () => {
    for (var i = 0; i < yesArr.length; i++) {
        yesArr[i] = 0;
    }
    counter = 0;
};
const setCounter = (index, amount) => {
    let num = Object.values(index);
    yesArr[num-1] = amount;
    //console.log(amount);
    //console.log(index);
    //console.log(num);
    //console.log(yesArr);
};

var radio_props = [
    {label: 'Yes    ', value: 1 },
    {label: 'No', value: 0 }
];

const Item = ({ title, num }) => (
    <View style={styles.items}>
        <View style={{position: 'absolute', left: 10, top: 10,}}>
            <Icon name="question-circle-o" size={30} color="#F00" /> 
        </View>
        <Text style={styles.title}>{title} </Text>
        <RadioForm
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#FF0000'}
            selectedButtonColor={'#FF0000'}
            animation={true}
            radio_props={radio_props}
            initial={-1}
            onPress={(value) => setCounter({num}, value)}
            buttonSize={12}
            isSelected={true}
        />
    </View>

);

const renderItem = ({ item }) => (
    <Item title={item.title} 
        num={item.num}
    />

);

//onPress={() => setSum(sumArr())}
const TestScreen = ({navigation}) => {
    //const [isLoading, setLoading] = useState(true);
    //const [data, setData] = useState([]);
    //const [sum, setSum] = useState(0);
    resetArr();
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#ff0000"
                barStyle="light-content" 
            />
            {/*<View style={{justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#FF0000', width: '100%', height: 25}}>
                
            </View>*/}
            
            <View style={styles.questionCard}>
                <FlatList
                    data={QuestionData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ListHeaderComponent={
                        <View style={styles.items}>
                            <Text style={styles.titleHeader}>Have you experienced any of the following symptoms in the past 48 hours?</Text>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={styles.showResults}>
                            <TouchableOpacity style={styles.resultsButton}
                                onPress={() => {
                                    navigation.navigate('TestResults', {
                                    testSum: sumArr(),
                                    otherParam: 'anything you want here',
                                    });
                                    resetArr();
                                }}
                            >
                                <Text style={{fontSize: 16, color: 'white'}}>Show Results</Text>
                            </TouchableOpacity>
                            {/*Debug<Text style={{fontSize: 15, fontWeight: 'bold'}}>{sum}</Text>*/}
                        </View>
                    }
                />
            </View>
        </View>

    );

}
export default TestScreen;