//Test screen for pulling data from API using authorized token

import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import styles from './styles/userNotifyScreen.style.js';
import { retrieveUnsecured } from '../components/tokenAsync';
import { getPostAPIData } from '../api/helpers';

var howitworksTXT = "The “Notify Other” feature will send a mass notification to all users "
        + "that you have come in possible contact with that they have come in possible contact "
        + "with someone who is caring the COVID-19 virus. This notification is anonymous and "
        + "will not tell other users who the carrier is, this keeps you and other users’ "
        + "identities safe.\n\n"
        + "The idea of this feature is to allow users to receive warnings that they may have "
        + "encountered an individual caring the COVID-19 virus and then they can take "
        + "precautions about what to do next with this information.";

const UserNotify = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

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
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black',}}>
                    Begin Notifying
                </Text>
                {/*<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 16}}>
                    Notify other users that you have contracted COVID-19.
                </Text>*/}
                    
                <View style={styles.notifyButton}>
                    <TouchableOpacity style={styles.startAlert}
                        onPress={() => navigation.navigate('UserInfo')}
                    >
                        <Text style={{fontSize: 16, color: 'white'}}>Notify Others</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.noteText}>
                    Do not use this feature unless you have contracted the COVID-19 virus. 
                </Text>
            </View>
            <View style={styles.formElement}>
                <TouchableOpacity style={styles.cancelButton}
                    onPress={() => navigation.navigate('UserInfo')}
                >
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                
                {/*Debug<Text style={{color: 'blue', fontSize: 16, fontWeight: 'bold'}}>Hi: {testSum}</Text>
                <Text style={{color: 'blue', fontSize: 16, fontWeight: 'bold'}}>Hi: {answer}</Text>*/}
            </View>
            <Text style={styles.noteText}>
                Click "Cancel" to cancel.
            </Text>
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