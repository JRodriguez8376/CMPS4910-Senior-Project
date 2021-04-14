//Test screen for pulling data from API using authorized token

import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
    NativeModules,
    TextInput,
} from 'react-native';
import styles from './styles/userNotifyScreen.style.js';
import { retrieveUnsecured } from '../components/tokenAsync';
import { getPostAPIData, postAPIData } from '../api/helpers';
import Icon from 'react-native-vector-icons/FontAwesome5';

var howitworksTXT = "The “Notify Other” feature will send a mass notification to all users "
        + "that you have come in possible contact with that they have come in possible contact "
        + "with someone who is caring the COVID-19 virus. This notification is anonymous and "
        + "will not tell other users who the carrier is, this keeps you and other users’ "
        + "identities safe.\n\n"
        + "The idea of this feature is to allow users to receive warnings that they may have "
        + "encountered an individual caring the COVID-19 virus and then they can take "
        + "precautions about what to do next with this information.";

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

/*
const sendNotify = ({pass}) => {
    console.log("Notify Button Pressed ")
    retrieveUnsecured('email')
        .then(email => {
            retrieveUnsecured('token')
                .then(result => {
                    console.log("Email: ", email)
                    console.log("Password: ", pass)
                    console.log("Token: ", result)
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });
}
*/
const UserNotify = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [password, setPassword] = useState('');
    const [inputText, setInputText] = useState(["Password", "gray"])
    const [passReveal, setReveal] = useState(true);
    
    const sendNotify = () => {
        console.log("Notify Button Pressed ")
        if (password != "") {
            retrieveUnsecured('email')
                .then(email => {
                    retrieveUnsecured('token')
                        .then(token => {
                            postAPIData('/api/user/verification', { 
                                "email": email, 
                                "password": password 
                            }, token)
                        })
                        .catch(error => {
                            console.log("Catch Token Error")
                            console.error(error);
                        });
                })
                .catch(error => {
                    console.log("Catch EmailError")
                    console.error(error);
                });
            setInputText(["Password", "gray"])
        }
        else {
            setInputText(["Input Password","red"])
        }
    }



    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#ff0000"
                barStyle="light-content" 
            />
            <View style={styles.userInfo}>
            </View>
            <View style = {styles.alertOthers}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black',}}>
                    Begin Notifying
                </Text>
                {/*<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 16}}>
                    Notify other users that you have contracted COVID-19.
                </Text>*/}
                    
                <Text style={styles.noteText}>
                    Do not use this feature unless you have contracted the COVID-19 virus. 
                </Text>
                <View style={styles.confirmationBox}>
                    <Text style={styles.passwordText}>
                        Enter Password to Proceed
                    </Text>
                    <View style={styles.formElement}>
                        <View style={styles.inputView}>
                            <TextInput style={styles.input}
                                placeholder={inputText[0]}
                                placeholderTextColor={inputText[1]}
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
                    <View style={styles.notifyButton}>
                        <TouchableOpacity style={styles.startAlert}
                            //onPress={() => navigation.navigate('UserInfo')}
                            onPress={() => sendNotify()}
                        >
                            <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold',}}>Notify Others</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cancelElement}>
                    <TouchableOpacity style={styles.cancelButton}
                        onPress={() => navigation.navigate('UserInfo')}
                    >
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'red'}}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    
                    {/*Debug<Text style={{color: 'blue', fontSize: 16, fontWeight: 'bold'}}>Hi: {testSum}</Text>
                    <Text style={{color: 'blue', fontSize: 16, fontWeight: 'bold'}}>Hi: {answer}</Text>*/}
                </View>
                <Text style={styles.noteText}>
                    Click "Cancel" to cancel.
                </Text>
            </View>
            <View style={styles.howitworksTextBox}>
                <Text style={styles.howitworksTitleText}>
                    How it Works:
                </Text>
                <Text style={styles.howitworksText}>
                    {howitworksTXT}
                </Text>
            </View>

            
        </View>
    
    
    );
}

export default UserNotify;