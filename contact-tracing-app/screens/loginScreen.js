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
    ActivityIndicator,
    StatusBar,
    ScrollView,
    PermissionsAndroid
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Alert } from 'react-native';
import AuthContext from '../context/authContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {requestFineLPermission, requestCoarseLPermission} from '../components/permissions.js';
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

const IconDisplay = ({pass}) => {
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

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passReveal, setReveal] = useState(true);
    const { signIn } = React.useContext(AuthContext);
    const submit = () => {
        if(email.length == 0 || password.length == 0) {
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
            signIn({ email, password })
        }
    }
    
    
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#f2f2f2"
                barStyle="dark-content" />
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
                        <Image source={require("../assets/images/doge.jpg")} style={styles.logo} />
                        <View style={styles.formElement}>
                            <View style={styles.inputView}>
                                <TextInput style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor='gray'
                                    value={email}
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
                                    secureTextEntry={passReveal}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <View style={styles.revealIcon}>
                                    <TouchableOpacity
                                        onPress={() => setReveal(!passReveal)}
                                    >
                                        <IconDisplay pass={passReveal} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.formElement}>
                            <TouchableOpacity style={styles.signInButton}
                                onPress={() => submit()}
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
                        
                    </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
    );
}

export default LoginScreen;