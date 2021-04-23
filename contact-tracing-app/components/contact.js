import { retrieveUnsecured, saveUnsecured } from './tokenAsync';
import { getPostAPIData } from '../api/helpers';
import BackgroundGeoLocation from '@darron1217/react-native-background-geolocation';
import BackgroundTimer from 'react-native-background-timer';


BackgroundGeoLocation.configure({
    desiredAccuracy: BackgroundGeoLocation.HIGH_ACCURACY,
    notificationTitle: 'Background Location is on',
    notificationText: 'enabled',
    startOnBoot: false,
    interval: 10000,
    fastestInterval: 5000,
    stopOnStillActivity: false,
    locationProvider: BackgroundGeoLocation.ACTIVITY_PROVIDER

});

var contact_point = [];
let stopTimer = false;
//Check if contact list already exists, if so update contact_point variable
const updateContactList = () => {
    retrieveUnsecured('contact')
        .then(result => {
            //Already a list of people to contact
            contact_point = JSON.parse(result);
            console.log("Getting list: ", contact_point);
        }).catch(error => {
            //No list in that key spot
            contact_point = [];
        });
}

//Adds new contact and sends to server if new contact, otherwise checks time comparison
//if > 15 mins, send to server, if < 15 mins do nothing
const addNewContact = (id, time) => {

    let iterator = searchJSON(contact_point, id);
    if (iterator != -1) {
        if (Math.abs(contact_point[iterator].time_met - time) >= 900000) {
            console.log("Time value: ", Math.abs(contact_point[iterator].time_met - time))
            contact_point[iterator].time_met = time;
            console.log("It's been past 15 mins");
            saveUnsecured('contact', JSON.stringify(contact_point));

            //Get location at this instant
            locationHandler(id, time);

            //send data to server
            //postContactInfo(id, time, latitude, longitude);
        } else {
            console.log("15 minutes hasn't passed since they were last seen");
        }
    } else {
        let time_met = time;
        contact_point.push({
            id: id,
            time_met: time_met
        });
        //Get current user location
        //send data to server
        console.log("NEW");
        locationHandler(id, time);
        saveUnsecured('contact', JSON.stringify(contact_point));
    }
}
//Checks if contact id exists at that spot
const searchJSON = (json, value) => {
    for (let i = 0; i < json.length; i++) {
        if (json[i].id != null && json[i].id == value) {
            //console.log("Existing Value: ", json[i].id);
            //console.log("Value: ", value, " | ", json[i].time_met);
            //console.log("Returning i:", i);
            return i;
        }
    }
    return -1;
}
// Sends data to server
const postContactInfo = (id, time, latitude, longitude) => {
    retrieveUnsecured('token')
        .then(token => {
            retrieveUnsecured('bt_uuid')
                .then(result => {
                    getPostAPIData('/hotspot/newcontact',
                        { uuid_1: result, uuid_2: id, latitude: latitude, longitude: longitude, time_met: time },
                        token
                    ).then(result => {
                        console.log("Success in sending contact info");
                    }).catch(result => {
                        console.log("Failure in sending contact info");
                    })
                })
        })
}
const postLocationInfo = (id, time, latitude, longitude) => {
    retrieveUnsecured('token')
        .then(token => {
            retrieveUnsecured('bt_uuid')
                .then(result => {
                    getPostAPIData('/hotspot/newlocation',
                        { uuid_1: result, uuid_2: id, latitude: latitude, longitude: longitude, time_met: time },
                        token
                    ).then(result => {
                        console.log("Success in sending location info");
                    }).catch(result => {
                        console.log("Failure in sending location info");
                    })
                })
        })
}
const locationHandler = (id, time) => {
    BackgroundGeoLocation.start();
    console.log("LOCATION HANDLER");
    //get location now
    var loop = 0;
    //post to /newcontact
    BackgroundGeoLocation.getCurrentLocation(location => {
        console.log("Sending Contact data");
        retrieveUnsecured('token')
            .then(token => {
                retrieveUnsecured('bt_uuid')
                    .then(result => {
                        getPostAPIData('/api/hotspot/newcontact',
                            { uuid_1: result, uuid_2: id, latitude: location.latitude, longitude: location.longitude, time_met: time },
                            token
                        ).then(result => {
                            console.log("Success in sending contact info");
                        }).catch(result => {
                            console.log("Failure in sending contact info");
                        })
                    }).catch(error => {
                        console.log("Failed to retrieve BT_UUID")
                    })
            }).catch(error => {
                console.log("Failed to retrieve token")
            })
    });


    //setTimeout(60000);

    //Create new backgroundInterval handler,
    // for 15 mins: Every min get new location of user,
    //then call post to /newLocation with new location info and time
    const intervalLocation = BackgroundTimer.setInterval(() => {
        BackgroundGeoLocation.getCurrentLocation(location => {
            console.log("Sending Location data");
            retrieveUnsecured('token')
                .then(token => {
                    retrieveUnsecured('bt_uuid')
                        .then(result => {
                            getPostAPIData('/api/hotspot/newlocation',
                                { uuid_1: result, uuid_2: id, latitude: location.latitude, longitude: location.longitude, time_met: Date.now() },
                                token
                            ).then(result => {
                                console.log("Success in sending location info");
                            }).catch(result => {
                                console.log("Failure in sending location info");
                            })
                        })
                })
        })
        console.log("Loop: ", loop);
        loop++;
        if (loop >= 14 || stopTimer == true) {
            BackgroundTimer.clearInterval(intervalLocation);
        }
    }, 60000)
    //Quit after 14 post sends

}
const stopHandler = () => {
    stopTimer = true;
}
export {
    updateContactList,
    addNewContact,
    locationHandler,
    stopHandler
}