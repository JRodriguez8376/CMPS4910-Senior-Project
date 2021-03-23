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
    ActivityIndicator
} from 'react-native';

//import Virus from '../assets/images/virus.svg';
import AuthContext from '../context/authContext';
import { Alert } from 'react-native';
const RegisterScreen = ({navigation}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bday, setBday] = useState('');
    const { signUp } = React.useContext(AuthContext);
    const validateField = (fieldOriginal, fieldValidate) => {
        if(fieldOriginal === fieldValidate) 
            return true;
        else
            return false
    }
    const submit = () => {
        setBday('');
        if(!validateField(email, confirmEmail)) {
            Alert.alert(
                "Mismatching fields",
                "Email fields do not match",
                [
                    {
                        text: "Ok"
                    }
                ]
            );
        } else if(!validateField(password, confirmPassword)) {
            Alert.alert(
                "Mismatching fields",
                "Password fields do not match",
                [
                    {
                        text: "Ok"
                    }
                ]
            );
        } else {
            signUp({ email, password});
        }
        
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/login_img.jpg")} style={styles.backgroundImage}>
                <View style={styles.formContainer}>
                    <Text style={styles.name}>Covid Tracing App</Text>
                    <Image source={require("../assets/images/doge.jpg")} style={styles.logo} />
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
                                placeholder="Password"
                                placeholderTextColor='gray'
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
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
                                placeholder="Confirm Password"
                                placeholderTextColor='gray'
                                secureTextEntry={true}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
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
            </ImageBackground>
        </View>
    );
}

export default RegisterScreen;