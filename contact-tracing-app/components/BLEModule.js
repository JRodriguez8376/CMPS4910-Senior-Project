import {NativeEventEmitter, NativeModules} from 'react-native';
const { BLE } = NativeModules;

let eventListener = null;
const addBLEStartListener = () => {
    const eventEmitter = new NativeEventEmitter(NativeModules.BLE);
    eventListener = eventEmitter.addListener('BLEStartDone', (event) => {
        console.log("Event recieved: BLEStart", event);
    });
}
const removeBLEStartListener = () => {
    eventListener.remove();
}

export {
    addBLEStartListener,
    removeBLEStartListener
}