import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SignedInNavigator from './tabNavigator';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import LoadingScreen from '../screens/loadingScreen';

import AuthContext from '../context/authContext';

import { saveUnsecured } from '../components/tokenAsync';
import { api } from '../api/constants';
import { getPostAPIData } from '../api/helpers';

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
                    getPostAPIData('/api/auth/login', data)
                        .then(result => {
                            //console.log(result);
                            //Save token information for later
                            if (result != null) {
                                saveUnsecured('token', result.accessToken);
                                saveUnsecured('id', data.id);
                                accessToken = result.accessToken;
                                dispatch({ type: 'SIGN_IN', token: accessToken });
                            } else {
                                dispatch({ type: 'SIGN_IN', token: null });
                            }
                            
                        }).catch((error) => {
                            console.error('Login error: ', error);
                        });
                },
                //TO DO: Sign out relinquishes token
                signOut: () => dispatch({ type: 'SIGN_OUT' }),
                // TO DO: Sign up creates new token
                signUp: async data => {
                    getPostAPIData('/api/auth/signup', data)
                        .then(result => {
                            //console.log(result);
                            //Save token information for later
                            //if (result != null) {
                                saveUnsecured('token', result.accessToken);
                                saveUnsecured('id', data.id);
                                accessToken = result.accessToken;
                                dispatch({ type: 'SIGN_IN', token: accessToken });
                            //} else {
                            //    dispatch({ type: 'SIGN_IN', token: null });
                            //}
                        
                        }).catch((error) => {
                            console.error('Sign Up error: ', error);
                        });
                        
                    //dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
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
                            <>
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={RegisterScreen}
                                options={{
                                    headerShown: false
                                }}
                            />

                            </>
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