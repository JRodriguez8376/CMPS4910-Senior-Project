import 'react-native-gesture-handler';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    NavigationContainer,

} from '@react-navigation/native';
import {
    createStackNavigator
} from '@react-navigation/stack';
import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';

import { FlatList, State } from 'react-native-gesture-handler';
import { acc } from 'react-native-reanimated';
// Test Variables(DELETE LATER)

let accessToken = {};
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

const AuthContext = React.createContext();
const LoadingScreen = () => {
    return (
        <View>
            <Text> This is a loading screen</Text>
        </View>
    );
}
var savedID = 0;
const LoginScreen = ({ navigation }) => {
    const [id, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = React.useContext(AuthContext);
    return (

        <View style={styles.container}>
            {/*<ImageBackground source={require("./assets/images/backgroundLogin.jpg")} style={styles.backgroundImage}>*/}
            <View style={styles.formContainer}>
                <Image source={require("./assets/images/testIllya.jpg")} style={styles.logo} />
                <View style={styles.formElement}>
                    <Text style={styles.paragraph}> Email</Text>
                </View>
                <View style={styles.formElement}>
                    <View style={styles.inputView}>
                        <TextInput style={styles.input}
                            placeholder="johndoe@gmail.com"
                            placeholderTextColor='gray'
                            value={id}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>
                <View style={styles.formElement}>
                    <Text style={styles.paragraph}> Password</Text>
                </View>
                <View style={styles.formElement}>
                    <View style={styles.inputView}>
                        <TextInput style={styles.input}
                            placeholder="Password"
                            placeholderTextColor='gray'
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>
                <View style={styles.formElement}>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={() => signIn({ id, password })}
                    >
                        <Text style={styles.buttonText}> Login </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/*</ ImageBackground> */}
        </View>

    );
}
const HotspotScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text >
                Hotspot Map Placeholder
            </Text>
        </View>

    );

}
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const UserInfoTab = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        var id = { "id": savedID };
        console.log(savedID);
        console.log(id);
        /*
        If testing this on a real device, uncomment this code
        Caused by lack of support from expo-secure-store for web clients,
        should work on mobile
        
        retrieveTokenAsync()
            .then(result => {
                console.log("Retrieving: ", result);
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
            })
            .catch(error => {
                console.log("Error in promise object retrieveTokenAsync():::", error);
            });
            */
        /* Uncomment this code if testing on Web */

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
        /* */

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
/*
https://reactnavigation.org/docs/auth-flow/
Modified(And will expand upon to suit our needs) code from the documents on React Navigation
to use in this project below
*/

const App = ({ navigation }) => {
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

                    fetch('http://localhost:3000/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                    })
                        .then(response => response.json())
                        .then(data => {
                            saveTokenAsync(data.accessToken);
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
// Thanks to: 
// https://stackoverflow.com/questions/61025437/how-to-combine-stacknavigator-and-tabnavigator-in-react-navigation-5
// For helping me with Tab Navigation that is nested inside a 
// Stack Navigation for Auth flow, see the StackNavigator to see the 
// SignedInNavigator Object passed in
const SignedInNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Hotspot"
                component={HotspotScreen}
            />
            <Tab.Screen
                name="Test tab"
                component={TestScreen}
            />
            <Tab.Screen
                name="User info Test tab"
                component={UserInfoTab}
            />
        </Tab.Navigator>
    )
}

export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'stretch'
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        paddingBottom: 100,
        alignItems: 'stretch'
    },
    formElement: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 20
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    inputView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    input: {
        fontSize: 24,
        borderBottomWidth: 1,
        borderColor: 'gray',

    },
    loginButton: {
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',

        fontSize: 30,
    },
    titles: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    paragraph: {

        fontSize: 18,
        color: 'white',
        textAlign: 'left',
        justifyContent: 'center',
    },

    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
        margin: 100
    }
});