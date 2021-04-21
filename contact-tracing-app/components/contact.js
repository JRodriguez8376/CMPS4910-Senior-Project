import { retrieveUnsecured, saveUnsecured } from './tokenAsync';
import { getPostAPIData } from '../api/helpers';

var contact_point = [];

//Check if contact list already exists, if so update contact_point variable
const updateContactList = () => {
    retrieveUnsecured('contact')
        .then(result => {
            //Already a list of people to contact
            contact_point = result;
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
        if (Math.abs(contact_point[iterator].time_met - time) >= 900) {
            contact_point[iterator].time_met = time;

            saveUnsecured('contact', contact_point);

            //Get location at this instant


            //send data to server
            //postContactInfo(id, time, latitude, longitude);
        } else {
            console.log("15 minutes hasn't passed since they were last seen");
        }
    } else {
        contact_point.push({
            id: id,
            time_met: time
        });
        //Get current user location
        //send data to server
        //postContactInfo(id, time, latitude, longitude);
        saveUnsecured('contact', contact_point);
    }
}
//Checks if contact id exists at that spot
const searchJSON = (json, value) => {
    for (let i = 0; i < json.length; i++) {
        if (json[i].id != null && json[i].id == value) {
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

export {
    updateContactList,
    addNewContact
}