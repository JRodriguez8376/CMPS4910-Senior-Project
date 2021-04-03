//Test screen for pulling data from API using authorized token

import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    NativeModules
} from 'react-native';
import styles from './styles/userInfoScreen.style.js';
import { retrieveUnsecured } from '../components/tokenAsync';
import { getPostAPIData } from '../api/helpers';
const {BLEPeripheralModule} = NativeModules;
const UserInfo = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const advertise = () => {
        BLEPeripheralModule.startAdapter("THIS IS NOT WARZONE");
    }

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
                <View style = {styles.alertOthers}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        NOTIFY OTHERS
                    </Text>
                    <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 16}}>
                        Notify other users that you have contracted COVID-19.
                    </Text>
                    <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 12, fontStyle: 'italic',}}>
                        Click "Notify Others" to begin notifying.
                    </Text>
                    <View style={styles.formElement}>
                        <TouchableOpacity style={styles.startAlert}
                            onPress={() => navigation.navigate('UserNotify')}
                        >
                        <Text style={{fontSize: 16, color: 'white'}}>Notify Others</Text>
                    </TouchableOpacity>
                </View>

                {/** Borrowing this page for the TEST Advertising button for the BLE mode 
            * DELETE later once we know its working on startup
            * 
            */}
            <TouchableOpacity style ={styles.startAlert}
                title="Click to start advertising BLE"
                onPress={advertise}
            />
            </View>
            
        </View>

    );
}

export default UserInfo;