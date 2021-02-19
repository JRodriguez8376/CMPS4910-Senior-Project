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
const RegisterScreen = ({navigation}) => {

    const [id, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp } = React.useContext(AuthContext);
    
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
                                value={id}
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
                        <TouchableOpacity style={styles.loginButton}
                            onPress={() => signUp({ id, password })}
                        >
                            <Text style={styles.loginText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formElement}>
                        <TouchableOpacity style={styles.registerButton}
                            onPress={() => navigation.push("Login")}
                        >
                            <Text numberOfLines={1} style={styles.registerText}>Already have an account? Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export default RegisterScreen;