import {NativeEventEmitter, NativeModules} from 'react-native';
import { saveUnsecured } from './tokenAsync';
const { BLE } = NativeModules;

let eventListener = null;
const addBLEStartListener = () => {
    const eventEmitter = new NativeEventEmitter(NativeModules.BLE);
    eventListener = eventEmitter.addListener('BLEStartDone', (event) => {
        //console.log("Event recieved: BLEStart", event);
    });
}
const removeBLEStartListener = () => {
    eventListener.remove();
}

const saveUUID = () => {
        BLE.getUserUUID()
        .then(result => {
            //console.log("User UUID", result);
            saveUnsecured('bt_uuid', result);
            return result;
        }).catch(err => {
            //console.log("Failed to get UUID");
        });
}

export {
    addBLEStartListener,
    removeBLEStartListener,
    saveUUID
}