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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import Virus from '../assets/images/virus.svg';
import AuthContext from '../context/authContext';

/*
validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
        console.log("Email is Not Correct");
        this.setState({ email: text })
        return false;
    }
    else {
        this.setState({ email: text })
        console.log("Email is Correct");
    }
}
*/



const LoginScreen = ({navigation}) => {

    const [id, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = React.useContext(AuthContext);

    
    
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/login_img.jpg")} style={styles.backgroundImage}>
                <View style={styles.formContainer}>
                <KeyboardAwareScrollView>
                    <Text style={styles.name}>Covid Tracing App</Text>
                    <Image source={require("../assets/images/doge.jpg")} style={styles.logo} />
                    <View style={styles.formElement}>
                        <View style={styles.inputView}>
                            <TextInput style={styles.input}
                                placeholder="Email"
                                placeholderTextColor='gray'
                                value={id}
                                onChangeText={setEmail}
                                //onChangeText={(text) => this.validate(text)}
                                //value={this.state.email}
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
                        <TouchableOpacity style={styles.signInButton}
                            onPress={() => signIn({ id, password })}
                        >
                            <Text style={styles.signInText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formElement}>
                        <TouchableOpacity style={styles.signUpPageButton}
                            onPress={() => navigation.push('Register')}
                        >
                            <Text style={styles.signUpPageText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    </KeyboardAwareScrollView>
                </View>
            </ImageBackground>
        </View>
    );
}

export default LoginScreen;