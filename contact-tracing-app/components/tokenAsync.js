import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

let token = {}
const saveTokenAsync = async (accessToken) => {
    try {
        await SecureStore.setItemAsync(
            'token',
            accessToken
        );
    } catch (error) {
        console.log("Error in saving Access Token: ", error);
    }
}

const retrieveTokenAsync = async () => {
    try {
        return (
            SecureStore.getItemAsync('token')
        );
    } catch (error) {
        console.log("Error in retrieving Access Token");
    }
}
const saveUnsecured = async (key, value) => {
    try {
        console.log(`Saving:${key} : ${value}`);
        await AsyncStorage.setItem(
            key,
            value
        );
    } catch (error) {
        console.log("Error in saving Access Token: ", error);
    }
}

const retrieveUnsecured = async (key) => {
    try {
        return(await AsyncStorage.getItem(key)
        );

    } catch (error) {
        console.log("Error in retrieving Access Token");
    }
}

export {
    saveTokenAsync,
    retrieveTokenAsync,
    saveUnsecured,
    retrieveUnsecured,
};