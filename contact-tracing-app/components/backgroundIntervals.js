

import BackgroundTimer from 'react-native-background-timer';
import {addNewContact, updateContactList, stopHandler} from '../components/contact';
import {NativeModules} from 'react-native';
const {BLE} = NativeModules;

var intervalId;
const startContacting = () => { 
    intervalId = BackgroundTimer.setInterval(() => {
        //BLE.checkBLE();
        //If New data from BLE.getContactInfo(), 
        BLE.start();
        updateContactList();
        
        BLE.getContactInfo()
        .then(results => {
            //console.log("THIS IS RESULTS:");
            //console.log(results);
            let keys = Object.keys(results)
            for(var i = 0; i < keys.length; i++) {
                let value = results[keys[i]];
                console.log(`Recieved and Processing BLE UserUUID: ${keys[i]} with Timestamp: ${new Date (parseInt(value))}`)
                addNewContact(keys[i], value)
            }
            //console.log(keys[0], "_", keys[1]);
        }).catch(error => {
            //console.log("getContactInfo recieved no info!");
            //console.log(error);
        })
        //console.log('tic');
        updateContactList();
    }, 10000);
}

const stopContacting = () => {
    BackgroundTimer.clearInterval(intervalId);
    stopHandler();
}
export {
    startContacting,
    stopContacting
}
