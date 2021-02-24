//Test screen for pulling data from API using authorized token

import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import styles from './styles/testScreen.style.js';
import { retrieveUnsecured } from '../components/tokenAsync';
import { getPostAPIData } from '../api/helpers';
const UserInfoTab = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        /*
        Retrieve token id from storage, then auth token, then send POST request that
        returns data asynchronously
        */
        retrieveUnsecured('id')
            .then(id => {
                retrieveUnsecured('token')
                    .then(result => {
                        //console.log("Retrieving: ", result);
                        //console.log("id is", id);
                        //Send API request with ID and bearer token
                        getPostAPIData('/api/user/user', { "id": id }, result)
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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

    );
}

export default UserInfoTab;