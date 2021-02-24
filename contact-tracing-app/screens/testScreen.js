import React, { useState, useEffect } from 'react';
import styles from './styles/testScreen.style.js';
import {
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import { fetchTestData } from '../api/helpers';
import { FlatList, State } from 'react-native-gesture-handler';
//Fetch Requests
// Example code from: https://reactnative.dev/docs/network
//Just testing fetching data from my Node server
const TestScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchTestData()
            .then(result => {
                console.log(result)
                setData(result);
            }).then(() => {
                setLoading(false);
            });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text >
                Test Placeholder
            </Text>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ device_id }, index) => device_id.toString()}
                    renderItem={({ item }) => (
                        <Text>User ID: {item.device_id}, Device Type: {item.user_type}</Text>
                    )}
                />
            )}
        </View>

    );

}
export default TestScreen;