import React, { useState, useEffect } from 'react';
import styles from './styles/testScreen.style.js';
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
import { FlatList, State } from 'react-native-gesture-handler';
//Fetch Requests
// Example code from: https://reactnative.dev/docs/network
//Just testing fetching data from my Node server
const TestScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/test/users')
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