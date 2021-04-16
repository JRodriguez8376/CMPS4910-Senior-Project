const admin = require("firebase-admin");
//Supply with your own FCM service account for handling FB messages
const serviceAccount = require("./serviceAccount.json");
const conn = require('../database/conn');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
// Starts up a persistent listener, 
// then looks for the user with that data to send that message upon notification recieved
const startListener = () => {
    conn.db.connect({ direct: true })
        .then(sco => {
            sco.client.on('notification', data => {
                console.log("Received notification from DB: ", data.payload);
                searchForUser(data.payload);
                
            });
            return sco.none('LISTEN $1:name', 'algorithm');
        }).catch(error => {
            console.log("Error in Listener: ", error);
        })
}
//Query to look for a given user and return their Firebase token in the DB,
// then calls notification send function if it was found
const searchForUser = (user_id) => {
    conn.db.oneOrNone("SELECT fb_token FROM users where device_id = $1", [user_id])
    .then(result => {
        if (result != null && result.fb_token != null) {
            //console.log(result);
            const message = {
                notification: {
                    body: 'You\'ve been contacted!',
                    title: 'Contact Alert',
                    priority: 'high'
                },
            }
            sendNotification(result.fb_token, message)
        }
    });
}
//Sends a message to a User's device with a given token
const sendNotification = async (fb_token, message) => {
    await admin.messaging().sendToDevice(fb_token, message)
        .then(response => {
            console.log("Message successfully sent!");
            //console.log("Message successfully sent!", JSON.stringify(response));
        }).catch(error => {
            console.log("Could not send message, ERROR: ", error);
        });
}

module.exports = {
    startListener
};