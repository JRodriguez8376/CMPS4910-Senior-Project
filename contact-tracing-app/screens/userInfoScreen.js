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
import styles from './styles/testScreen.style.js';
import {retrieveUnsecured} from '../components/tokenAsync';
const UserInfoTab = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    let id = {}
    useEffect(() => {
        retrieveUnsecured('id')
        .then(resultID => {
            id = resultID
        }).catch(error => {
            console.log(error);
        });
        
        retrieveUnsecured('token')
            .then(result => {
                console.log("Retrieving: ", result);
                console.log("id is", id);
                fetch('http://localhost:3000/api/user/user', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${result}`,
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({"id": id})

                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log('JSON here we go babey: ');
                        console.log(json);
                        setData(json);
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    .finally(() => setLoading(false));
            })
            .catch(error => {
                console.log("Error in promise object retrieveTokenAsync():::", error);
            });
            
        /* Uncomment this code if testing on Web 

        fetch('http://localhost:3000/api/user/user', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(id)

        })
            .then((response) => response.json())
            .then((json) => {
                console.log('JSON here we go babey: ');
                console.log(json);
                setData(json);
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => setLoading(false));
         */

    }, []);

    return (
        console.log(data),
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