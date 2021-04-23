import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignedInNavigator from './tabNavigator';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import LoadingScreen from '../screens/loadingScreen';

import AuthContext from '../context/authContext';

import { clearAllKeys, retrieveMulti, retrieveUnsecured, saveUnsecured } from '../components/tokenAsync';
import { getPostAPIData } from '../api/helpers';
import { Alert } from 'react-native';
import { NativeModules } from 'react-native';
import { saveUUID } from '../components/BLEModule';
import { stopContacting } from '../components/backgroundIntervals';


const Stack = createStackNavigator();
const Navigation = () => {
    saveUUID();
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
                case 'SIGN_UP':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    //console.log("cocur");
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
                userToken = await AsyncStorage.getItem('token');

            } catch (e) {
                //console.log("Error in restoring token: RESTORE_TOKEN", e);
            }
            dispatch({ type: 'RESTORE_TOKEN', token: null});
            //Validate token here
            
        };
        bootstrapAsync();

        messaging().onNotificationOpenedApp(remoteMessage => {
            //console.log("Notification caused app to be opened from background state", remoteMessage.notification);

        });
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    //console.log('Notification caused app to open from quit state:', remoteMessage.notification);
                }
            });
        messaging().onMessage(async remoteMessage => {
            Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
        });
    }, []);
    const authContext = React.useMemo(
        () => (
            {
                signIn: async data => {
                    //send sign in data here                  
                    if (data != null) {
                        dispatch({ type: 'SIGN_IN', token: data });
                    } else {
                        dispatch({ type: 'SIGN_IN', token: null })
                    }

                },

                signOut: async data => {
                    //Send refresh token to database to relinquish
                    clearAllKeys()
                        .then(result => {
                            //console.log("Cleared keys!");
                        }).catch(error => {
                            //console.log("Error in clearing keys in SIGNOUT")
                        })
                        stopContacting();
                    dispatch({ type: 'SIGN_OUT', token: null })


                },
                // TO DO: Sign up creates new token
                signUp: async data => {
                    if (data != null) {
                        dispatch({ type: 'SIGN_UP', token: data });
                    } else {
                        dispatch({ type: 'SIGN_UP', token: null });
                    }
                },
            }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#ff0000',
                        },
                        //headerTintColor: '#fff',
                    }}
                >
                    {
                        state.isLoading ? (
                            <Stack.Screen
                                name="LoadingScreen"
                                component={LoadingScreen}
                                options={{
                                    title: 'My home',
                                    headerShown: false,
                                }}
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