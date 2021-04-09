
import { PermissionsAndroid  } from "react-native";

const requestCoarseLPermission = async () => {
    try {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
                title: "Coarse Location",
                message:
                "Contact Tracing Requires Location",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use Location!");
    } else {
        console.log("Permission denied");
    }
    } catch (err) {
        console.warn(err);
    }
}
const requestFineLPermission = async () => {
    try {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Fine Location",
                message:
                "Contact Tracing Requires Location",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use Location!");
    } else {
        console.log("Permission denied");
    }
    } catch (err) {
        console.warn(err);
    }
}

export  {
    requestCoarseLPermission,
    requestFineLPermission
}
