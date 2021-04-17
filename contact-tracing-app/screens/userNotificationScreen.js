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
        time: "test1"
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
const NOTIFICATION2 = "You have been in possible contact with someone who has contracted COVID-19. "


const TimeDisplay = ({timeOfNotif}) => {
    var dateCurrent = Date.now()
    var dateDifference = Math.round((dateCurrent - timeOfNotif) / 1000) //Remove milliseconds
    //console.log("dateCurrent: ", dateCurrent)
    //Converts to Seconds
    if (dateDifference < 60) {
        return (
            <Text style={styles.notificationTime}>
                {dateDifference} s
            </Text>
        )
    }
    //Converts to Minutes
    else if (dateDifference >= 60 && dateDifference < 3600) {
        return (
            <Text style={styles.notificationTime}>
                {Math.round(dateDifference/60)} min
            </Text>
        )
    }
    //Converts to Hours
    else if (dateDifference >= 3600 && dateDifference < 86400) {
        return (
            <Text style={styles.notificationTime}>
                {Math.round(dateDifference/3600)} hr
            </Text>
        )
    }
    //Converts to Days
    else {
        return (
            <Text style={styles.notificationTime}>
                {Math.round(dateDifference/86400)} days
            </Text>
        )
    }
}

const UserNotification = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);  
    const [timeStamps, setTimeStamp] = useState([]);

    const PostNotifications = () => {
        //console.log("timeStamps: ", timeStamps)
        if (Object.keys(timeStamps) == 0) {
            //console.log("EMPTY OBJECT")
            return (
                <Text style={styles.emptyNotificationsText}>
                    You currently have not recieved any notifications.
                </Text>
            )
        } 
        else {
            return (
                timeStamps.reverse().map((time, index) => (
                    <View style={styles.shadownotificationBox}
                        key={index}
                    >
                        <View style={styles.notificationBox}>
                            <Text style={styles.notificationText}>
                                {NOTIFICATION}
                            </Text>
                            <TimeDisplay timeOfNotif={time.date_time_recieved}/>
                        </View>
                    </View>
                ))
            )
        }

    }

    useEffect(() => {
        /*
        Retrieve token id from storage, then auth token, then send POST request that
        returns data asynchronously
        */
        retrieveUnsecured('email')
            .then(email => {
                retrieveUnsecured('token')
                    .then(token => {
                        //console.log("Retrieving: ", result);
                        //console.log("id is", id);
                        //Send API request with ID and bearer token
                        getPostAPIData('/api/user/notification', { "email": email }, token)
                            //If completed, setData to screen and take off loading screen
                            .then(result => setTimeStamp(result))
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

    //console.log("Time Stamps: ", timeStamps)

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#ff0000"
                barStyle="light-content" 
            />
            <ScrollView>
                {/* 
                {isLoading ? <ActivityIndicator /> : (
                    timeStamps.reverse().map((time, index) => (
                        <View style={styles.shadownotificationBox}
                            key={index}
                        >
                            <View style={styles.notificationBox}>
                                <Text style={styles.notificationText}>
                                    {NOTIFICATION}
                                </Text>
                                <TimeDisplay timeOfNotif={time.date_time_recieved}/>
                            </View>
                        </View>
                    ))
                )}
                */}
                {isLoading ? <ActivityIndicator /> : (
                    <PostNotifications/>
                )}

            </ScrollView>
        </View>
    );
}

export default UserNotification;