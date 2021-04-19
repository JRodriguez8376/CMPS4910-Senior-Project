import React, { useState, useEffect } from 'react';
import styles from './styles/registerScreen.style.js';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import Virus from '../assets/images/virus.svg';
import AuthContext from '../context/authContext';
import { Alert } from 'react-native';
import { getPostAPIData } from '../api/helpers';
import { requestFineLPermission, requestCoarseLPermission } from '../components/permissions.js';
import { saveUnsecured, retrieveUnsecured, removeUnsecured } from '../components/tokenAsync';
import Icon from 'react-native-vector-icons/FontAwesome5';

const IconDisplay = ({ pass }) => {
    if (pass == true) {
        return (
            <Icon name="eye-slash" size={15} color={"black"} />
        );
    }
    else {
        return (
            <Icon name="eye" size={15} color={"black"} />
        );
    }
}

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bday, setBday] = useState('');
    const [passReveal1, setReveal1] = useState(true);
    const [passReveal2, setReveal2] = useState(true);
    const { signUp } = React.useContext(AuthContext);
    const validateField = (fieldOriginal, fieldValidate) => {
        if (fieldOriginal === fieldValidate)
            return true;
        else
            return false
    }
    const submit = () => {
        if (!validateField(email, confirmEmail)) {
            Alert.alert(
                "Mismatching fields",
                "Email fields do not match",
                [
                    {
                        text: "Ok"
                    }
                ]
            );
        } else if (!validateField(password, confirmPassword)) {
            Alert.alert(
                "Mismatching fields",
                "Password fields do not match",
                [
                    {
                        text: "Ok"
                    }
                ]
            );
        } else if (email.length == 0 || password == 0) {
            Alert.alert(
                "Missing fields",
                "Empty Fields",
                [
                    {
                        text: "Ok"
                    }
                ]
            );

        } else {
            requestCoarseLPermission();
            requestFineLPermission();
            retrieveUnsecured('fbToken')
                .then(result => {
                    console.log(result);
                    getPostAPIData('/api/auth/signup', { email: email, password: password, fb_token: result })
                        .then(result => {
                            //Save token information for later
                            if (result != null) {
                                saveUnsecured('token', result.accessToken);
                                saveUnsecured('refresh', result.refreshToken);
                                saveUnsecured('email', email);
                                let token = result.accessToken;
                                signUp(token);
                            } else {
                                Alert.alert(
                                    "Invalid SignUp information!",
                                    "A user account cannot be created with that information",
                                    [
                                        {
                                            text: "Ok"
                                        }
                                    ]
                                );
                            }
                        }).catch((error) => {
                            console.error('Signup error: ', error);
                        });
                }).catch((error) => {
                    console.error("Failed to retrieve Firebase token", error);
                });
        }

    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/login_img.jpg")} style={styles.backgroundImage}>
                <KeyboardAwareScrollView
                    extraScrollHeight={15}
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    keyboardShouldPersistTaps='handled'
                >
                    <ScrollView>
                        <View style={styles.formContainer}>
                            <Text style={styles.name}>Covid Tracing App</Text>
                            <Image source={require("../assets/images/covid_launch.png")} style={styles.logo} />
                            <View style={styles.formElement}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.input}
                                        placeholder="Email"
                                        placeholderTextColor='gray'
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>
                            </View>
                            <View style={styles.formElement}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.input}
                                        placeholder="Confirm Email"
                                        placeholderTextColor='gray'
                                        value={confirmEmail}
                                        onChangeText={setConfirmEmail}
                                    />
                                </View>
                            </View>
                            <View style={styles.formElement}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor='gray'
                                        secureTextEntry={passReveal1}
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                    <View style={styles.revealIcon}>
                                        <TouchableOpacity
                                            onPress={() => setReveal1(!passReveal1)}
                                        >
                                            <IconDisplay pass={passReveal1} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.formElement}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.input}
                                        placeholder="Confirm Password"
                                        placeholderTextColor='gray'
                                        secureTextEntry={passReveal2}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                    />
                                    <View style={styles.revealIcon}>
                                        <TouchableOpacity
                                            onPress={() => setReveal2(!passReveal2)}
                                        >
                                            <IconDisplay pass={passReveal2} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.formElement}>
                                <TouchableOpacity style={styles.signUpButton}
                                    onPress={() => submit()}
                                >
                                    <Text style={styles.signUpText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.formElement}>
                                <TouchableOpacity style={styles.signInPageButton}
                                    onPress={() => navigation.push("Login")}
                                >
                                    <Text numberOfLines={1} style={styles.signInPageText}>Already have an account? Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
    );
}

export default RegisterScreen;