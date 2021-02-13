import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SignedInNavigator from './tabNavigator';
import LoginScreen from '../screens/loginScreen';
import LoadingScreen from '../screens/loadingScreen';

import AuthContext from '../context/authContext';

import {saveUnsecured} from '../components/tokenAsync';
import {api} from '../api/constants';
let savedID = {};
let accessToken = {};
const Stack = createStackNavigator();
const Navigation = () => {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );
    React.useEffect(() => {

        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken');

            } catch (e) {
                //restore failed token later once I know what I am doing fully
            }
            //Validate token here
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        bootstrapAsync();

    }, []);
    const authContext = React.useMemo(
        () => (

            {

                signIn: async data => {
                    //send sign in data here
                    savedID = data.id

                    fetch(api+'/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                    })
                        .then(response => response.json())
                        .then(data => {
                            //use saveTokenAsync when testing on real device, saveTokenAsync
                            // does not work on React Native Web
                            saveUnsecured('token', data.accessToken);
                            saveUnsecured('id', savedID);
                            accessToken = data.accessToken;
                            console.log("Success: ", data);

                        })
                        .catch((error) => {
                            console.error('Error: ', error);
                        });
                    dispatch({ type: 'SIGN_IN', token: accessToken });
                },
                signOut: () => dispatch({ type: 'SIGN_OUT' }),
                signUp: async data => {
                    dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
                },
            }),
        []
    );


    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        state.isLoading ? (
                            <Stack.Screen
                                name="LoadingScreen"
                                component={LoadingScreen}
                            />
                        ) : state.userToken == null ? (
                            // No authenticated token
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{
                                    headerShown: false
                                }}
                            />
                        ) : (
                                    <Stack.Screen
                                        name="SignedIn"
                                        component={SignedInNavigator}
                                        options={{
                                            headerShown: false
                                        }}
                                    />
                                )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>

    );
}


export default Navigation;