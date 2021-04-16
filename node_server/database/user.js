const conn = require('./conn');

const userExists = 'SELECT * FROM users where email = $1';

const signUp = (email, password, bday, user_type) => {
    conn.db.none('INSERT into users(email, passwrd, b_day, user_type) VALUES($1, $2, $3, $4)', [email, password, bday, user_type])
    .then(() => {
        console.error("Signup insertion Sucessful");
    })
    .catch(error => {
        console.error("Error occurred during Signup insertion, users.js | ERROR:\n", error);
    })
}

module.exports = {
    signUp,
    userExists
};
