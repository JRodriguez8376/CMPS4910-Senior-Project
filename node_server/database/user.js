const conn = require('./conn');

const userExists = 'SELECT * FROM users where device_id = $1';

const signUp = (device_id, password) => {
    conn.db.none('INSERT into users(device_id, passwrd) VALUES($1, $2)', [device_id, password])
    .then(() => {
        console.log("Signup insertion Sucessful");
    })
    .catch(error => {
        console.log("Error occurred during Signup insertion, users.js | ERROR:\n", error);
    })
}

module.exports = {
    signUp,
    userExists
};
