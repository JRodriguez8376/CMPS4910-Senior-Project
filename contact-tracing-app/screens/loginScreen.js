import React, { useState, useEffect } from 'react';
import styles from './styles/loginScreen.style.js';
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
const LoginScreen = () => {

    const [id, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = React.useContext(AuthContext);
    
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/login_img1.jpg")} style={styles.backgroundImage}>
                <View style={styles.formContainer}>
                    <View style={styles.name}>Covid Tracing App</View>
                <Image source={require("../assets/images/doge.jpg")} style={styles.logo} />
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
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formElement}>
                    <TouchableOpacity style={styles.registerButton}
                        onPress={() => signIn({ id, password })}
                    >
                        <Text style={styles.registerText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        </View>

    );
}

export default LoginScreen;