//Test screen for pulling data from API using authorized token

import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    NativeModules,
    StatusBar,
    
} from 'react-native';
import styles from './styles/userNotificationScreen.style.js';
import { retrieveUnsecured } from '../components/tokenAsync';
import { getPostAPIData } from '../api/helpers';
import { ScrollView } from 'react-native-gesture-handler';

var timeStamp = [
    {
        time: "test1 test1 test1"
    }, 
    {
        time: "test2"
    },
    {
        time: "test3"
    },
    {
        time: "test4"
    },
    {
        time: "test5"
    },
    {
        time: "test6"
    },
    {
        time: "test7"
    },
    {
        time: "test8"
    },
    {
        time: "test9"
    },
    {
        time: "test10"
    },
]

const NOTIFICATION = "You have been in possible contact with someone who has contracted COVID-19. "

const UserNotification = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);  


    useEffect(() => {
        /*
        Retrieve token id from storage, then auth token, then send POST request that
        returns data asynchronously
        */
        retrieveUnsecured('email')
            .then(email => {
                retrieveUnsecured('token')
                    .then(result => {
                        //console.log("Retrieving: ", result);
                        //console.log("id is", id);
                        //Send API request with ID and bearer token
                        getPostAPIData('/api/user/user', { "email": email }, result)
                            //If completed, setData to screen and take off loading screen
                            .then(result => setData(result))
                            .then(() => setLoading(false))
                            .catch(error => {
                                console.error(error);
                            });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error("Error in promise object retrieveTokenAsync():::", error);
            });

    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#ff0000"
                barStyle="light-content" 
            />
            <ScrollView>
                <View style={styles.userInfo}>
                    <Text >
                        User Info Placeholder
                    </Text>
                    {isLoading ? <ActivityIndicator /> : (
                        <View>
                            <Text>Device ID: {data.device_id}</Text>
                            <Text>User Type: {data.user_type}</Text>
                            <Text>Email: {data.email}</Text>
                            <Text>Password: {data.passwrd}</Text>
                        </View>
                    )}
                </View>
                
                {
                    timeStamp.map((time, index) => (
                        <View style={styles.shadownotificationBox}
                            key={index}
                        >
                            <View style={styles.notificationBox}>
                                <Text style={styles.notificationText}>
                                    {NOTIFICATION}
                                </Text>
                                <Text style={styles.notificationTime}>
                                    {time.time}
                                </Text>
                            </View>
                            
                        </View>
                    ))
                }
                
                {/*
                <View style = {styles.alertOthers}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black',}}>
                        NOTIFY OTHERS
                    </Text>
                    <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 16, color: 'black',}}>
                        Notify other users that you have contracted COVID-19.
                    </Text>
                    <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 12, fontStyle: 'italic', color: 'black',}}>
                        Click "Notify Others" to begin notifying.
                    </Text>
                    <View style={styles.formElement}>
                        <TouchableOpacity style={styles.startAlert}
                            onPress={() => navigation.navigate('UserNotify')}
                        >
                        <Text style={{fontSize: 16, color: 'white'}}>Notify Others</Text>
                    </TouchableOpacity>
                    </View>  
                </View>
                */}
            </ScrollView>
        </View>
    );
}

export default UserNotification;