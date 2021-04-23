//Test screen for pulling data from API using authorized token

import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    NativeModules,
    StatusBar,
} from 'react-native';
import styles from './styles/userInfoScreen.style.js';
import { retrieveUnsecured } from '../components/tokenAsync';
import { getPostAPIData, postAPIData } from '../api/helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthContext from '../context/authContext';
const { BLE } = NativeModules;


const colorBox = (colorValue) => {

    switch (colorValue) {
        case 0: return '#00FF00';
        case 1: return 'yellow';
        case 2: return '#FF8C00';
        case 3: return '#B22222';
        default: return 'green';
    }
}



//Component for showing some unique user data
const ProfileData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const recommendText = () => {
        switch(data.threat_level) {
            case 0: {
                return <Text style={[styles.threatText]}>
                    Your Threat level is Green! 
                    You may continue to follow safe CDC guidelines on 
                    preventing COVID-19 from spreading!
                </Text>
            }
            case 1:
                {
                    return <Text style={[styles.threatText]}>
                        Your Threat level is Yellow. We have determined that you may have been 
                        in contact at some point with a COVID-19 source. 
                        We recommend following stricter CDC guidelines
                        and following stronger social distancing protocols. 

                    </Text>
                }
            case 2:
                {
                    return <Text style={[styles.threatText]}>
                        Your Threat level is ORANGE. We have determined that you have been in contact
                        with COVID-19. We STRONGLY recommend social distancing 
                        and staying at home as much as possible. Take the self-exam, and read
                        up possible COVID-19 symptoms to determine the best course of action.
                    </Text>
                }
            case 3:
                {
                    return <Text style={[styles.threatText]}>
                        Your Threat level is RED! There is a high possibility you may
                        or already have COVID-19, and we strongly recommend you get tested
                        and/or see a doctor if no symptoms have surfaced. As before, follow
                        CDC guidelines as much as possible!
                    </Text>
                }
        }
    }
    const ThreatBoxes = () => {

        switch (data.threat_level) {

            case 0:
                return (

                    <View style={[{ flexDirection: 'row' }]}>
                        <View style={[styles.threatBox, { backgroundColor: '#32CD32', borderColor: colorBox(data.threat_level) }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'yellow' }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'orange' }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'red' }]} />
                    </View>

                )
            case 1: {
                return (

                    <View style={[{ flexDirection: 'row' }]}>
                        <View style={[styles.threatBox, { backgroundColor: '#32CD32' }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'yellow', borderColor: colorBox(data.threat_level) }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'orange' }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'red' }]} />
                    </View>

                )
            }
            case 2:
                return (

                    <View style={[{ flexDirection: 'row' }]}>
                        <View style={[styles.threatBox, { backgroundColor: '#32CD32' }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'yellow' }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'orange', borderColor: colorBox(data.threat_level) }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'red' }]} />
                    </View>
                )
            case 3: {
                return (

                    <View style={[{ flexDirection: 'row' }]}>
                        <View style={[styles.threatBox, { backgroundColor: '#32CD32', }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'yellow' }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'orange' }]} />
                        <View style={[styles.threatBox, { backgroundColor: 'red', borderColor: colorBox(data.threat_level) }]} />
                    </View>
                )
            }
        }

    }
    useEffect(() => {
        /*
        Retrieve token id from storage, then auth token, then send POST request that
        returns data asynchronously
        */
        retrieveUnsecured('email')
            .then(email => {
                retrieveUnsecured('token')
                    .then(result => {
                        //console.log("Retrieving: ", result);
                        //console.log("id is", id);
                        //Send API request with ID and bearer token
                        getPostAPIData('/api/user/info', { "email": email }, result)
                            //If completed, setData to screen and take off loading screen
                            .then(result => {
                                setData(result);
                                console.log(data);
                            })
                            .then(() => setLoading(false))
                            .catch(error => {
                                console.error(error);
                            });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error("Error in promise object retrieveTokenAsync():::", error);
            });
    }, []);

    //Less than 7ft threat level 3 RED
    // >= 7ft AND less than 16, threat level 2 Yellow
    // Else threat level 1 Greem
    return (
        <View style={styles.userProfile}>

            <View style={styles.userProfileTitle}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                    User Profile
                </Text>
            </View>
            <View style={styles.userProfileItems}>

                <Text style={styles.userProfileItemText}>
                    Threat Level:
                    </Text>
                {ThreatBoxes()}
            </View>
            <View style={styles.userProfileBody}>

                {recommendText()}
            </View>
        </View>
    )
}

const UserInfo = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { signOut } = React.useContext(AuthContext);
    const advertise = () => {
        BLE.start();
    }
    const update = async () => {
        try {
            const updateData = await BLE.getContactInfo();
            console.log("BLE data update: ", updateData);
        } catch (err) {
            console.error(err)
        }
    }


    const logoutButton = () => {
        retrieveUnsecured('refresh')
            .then(refreshToken => {
                retrieveUnsecured('email')
                    .then(email => {
                        console.log("INFO: ", refreshToken, " ", email);
                        getPostAPIData('/api/auth/logout', { email: email, token: refreshToken })
                            .then(result => {
                                console.log("logout");
                                signOut();
                            }).catch(err => {
                                console.log("Failed to logout: ", err);
                            });
                    })
            });
    }

    useEffect(() => {
        /*
        Retrieve token id from storage, then auth token, then send POST request that
        returns data asynchronously
        */
        retrieveUnsecured('email')
            .then(email => {
                retrieveUnsecured('token')
                    .then(result => {
                        //console.log("Retrieving: ", result);
                        //console.log("id is", id);
                        //Send API request with ID and bearer token
                        getPostAPIData('/api/user/info', { "email": email }, result)
                            //If completed, setData to screen and take off loading screen
                            .then(result => setData(result))
                            .then(() => setLoading(false))
                            .catch(error => {
                                console.error(error);
                            });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error("Error in promise object retrieveTokenAsync():::", error);
            });
    }, []);

    //Set Bell Icon in top right of Header that navigates to Notification Screen (userNotificationScreen.js)
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 13 }}
                    //onPress={() => console.log("Bell Touched")}
                    onPress={() => navigation.push('UserNotification')}
                >
                    <Icon name="bell-o" size={22} color={"white"} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (



        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#ff0000"
                barStyle="light-content"
            />
            <ProfileData />

            <View style={styles.alertOthers}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', }}>
                    NOTIFY OTHERS
                </Text>
                <Text style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 16, color: 'black', }}>
                    Notify other users that you have contracted COVID-19.
                </Text>
                <Text style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 12, fontStyle: 'italic', color: 'black', }}>
                    Click "Notify Others" to begin notifying.
                </Text>
                <View style={styles.formElement}>
                    <TouchableOpacity style={styles.startAlert}
                        onPress={() => navigation.navigate('UserNotify')}
                    >
                        <Text style={{ fontSize: 16, color: 'white' }}>Notify Others</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/** Borrowing this page for the TEST Advertising button for the BLE mode 
            * DELETE later once we know its working on startup
            * 
            
            <TouchableOpacity style={styles.startAlert}
                onPress={advertise}
            >
                <Text style={{ fontSize: 16, color: 'white' }}>Start BLE</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.startAlert}
                onPress={update}
            >
                <Text style={{ fontSize: 16, color: 'white' }}>Update Console</Text>

            </TouchableOpacity>

            */}
            <TouchableOpacity style={styles.startAlert}
                title="Logout"
                onPress={logoutButton}
            >
                <Text style={{ fontSize: 16, color: 'white' }}>Logout</Text>

            </TouchableOpacity>

        </View>


    );
}

/*function geoFindMe() {
                const status = document.querySelector('#status');
                
                function success(position) {
                    const latitude = position.coords.latitiude;
                    const longitude = position.coords.longitude;
                    status.textContent = '';
                }
            
                function error() {
                    status.textContent = 'Unable to retrieve location';
                }
                if(!navigator.geolocation) {
                    status.textContent = 'Geolocation is not supported';
                } else {
                    status.textContent = 'locating...';
                    navigator.geolocation.getCurrentPosition(success, error);
                }
            }*/



export default UserInfo;