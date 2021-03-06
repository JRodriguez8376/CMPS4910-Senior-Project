// /auth routes are used for authenticating a user login/signup

//npm modules
const { access_token_secret, refresh_token_secret } = require('../config');
const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//custom modules
const user = require('../database/user');
const conn = require('../database/conn');
const token = require('./token');
// const variables
const saltRounds = 10;



//Validate user input for signup/login
const validateUser = (user) => {
    const validID = typeof user.email == 'string' && user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && user.password.trim() != '';
    if (validID && validPassword) {
        return (true);
    } else {
        return (false);
    }
}
//Signup route for authentication
authRouter.post('/signup', (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const fb_token = req.body.fb_token;
    const bday = req.body.bday;
    //Check if inputs are valid
    if (validateUser(req.body)) {
        //Use pg-promise querying to query db, uses promises for async operations
        conn.db.oneOrNone('SELECT * FROM users where email = $1', email)
            .then(result => {
                if (result && result.length != 0) {
                    //If a user was found, do this
                    res.status(403).json({
                        message: "User exists"
                    })
                    console.log("User already exists");
                } else {
                    //Hash signup password into database, create new user with hashed password, send refresh token
                    bcrypt.hash(password, saltRounds)
                        .then((hash) => {
                            const user_token_info = { email: email };
                            const accessToken = token.generateToken(user_token_info);
                            const refreshToken = token.generateRefreshToken(user_token_info);
                            console.log("User signing up");
                            conn.db.none('INSERT into users(email, passwrd, b_day, fb_token, token) VALUES($1, $2, $3, $4, $5)',
                                [email, hash, bday, fb_token, refreshToken])
                                .then(() => {
                                    console.log("Signup insertion Sucessful");
                                    res.status(200).json({
                                        message: "Signed Up",

                                        accessToken: accessToken,
                                        refreshToken: refreshToken
                                    })
                                })
                                .catch(error => {
                                    console.error("Error occurred during Signup insertion, users.js | ERROR:\n", error);
                                    res.status(400).json("Error in signing up");
                                })
                        });
                }
            })
            .catch(error => {
                res.sendStatus(400);
                console.log("Error in signup route", error);
            });
    } else {
        next(new Error('Invalid User'));
    }
});

//Login Route for Authentication
authRouter.post('/login', (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const fb_token = req.body.fb_token;
    if (validateUser(req.body)) {
        //Async querying db
        conn.db.oneOrNone('SELECT * FROM users where email = $1', email)
            .then(result => {
                if (result.length == 0) {
                    //If no user was found, do this
                    res.status(403).json({
                        message: "User does not exist"
                    })
                    console.log("User does not exist ");
                } else {
                    //If a user exists, compare hash password in database using bcrypt compare
                    bcrypt
                        .compare(password, result.passwrd)
                        .then(answer => {
                            //If matched, send response and login information
                            if (answer) {
                                const user_token_info = { email: email };
                                console.log("User Token Info", user_token_info);

                                console.log("User logging in");
                                //Signing JSON web tokens for authentication
                                const accessToken = token.generateToken(user_token_info);
                                const refreshToken = token.generateRefreshToken(user_token_info);
                                const device_id = result.device_id;
                                conn.db.none("UPDATE users SET token = $1, fb_token = $2 where device_id = $3", [refreshToken, fb_token, device_id])
                                    .then(
                                        res.status(200).json({
                                            answer,
                                            message: "Logged in",

                                            accessToken: accessToken,
                                            refreshToken: refreshToken
                                        })
                                    ).catch(err => {
                                        console.log("Refresh Token", refreshToken);
                                        console.error("Error in login/update: ", err);
                                    });
                            } else {
                                //Else state it does not log in user
                                res.status(401).json({
                                    answer,
                                    message: "Not Logged in"
                                });
                                console.error("Failed login attempt");
                            }
                        });
                }
            })
            .catch(error => {
                console.log("Error", error);
                res.status(400).json("Error in logging in");
            });
    } else {
        next(new Error('Invalid User'));
    }
});
authRouter.post('/refresh', (req, res) => {
    const refreshToken = req.body.token;
    conn.db.oneOrNone("SELECT * FROM users where token = $1", refreshToken)
        .then(result => {
            if (!result) {
                return res.sendStatus(401);
            } else if (result.length == 0) {
                console.error("User with that token does not exist");
                return res.sendStatus(401);
            } else if (result.token != refreshToken) {
                console.error("Token does not match user");
                return res.sendStatus(403);
            } else {
                jwt.verify(refreshToken, refresh_token_secret, (err) => {
                    if (err) {
                        return res.sendStatus(403);
                    }
                    const accessToken = token.generateToken({ email: result.email });
                    console.log(`Generating new Access token for User ${result.device_id} new token ${accessToken}`);
                    return res.status(200).json({ accesstoken: accessToken });
                });
            }

        }).catch(error => {
            res.status(401).json({ message: "Error in refreshing token" });
            console.error("/Refresh, ERR: ", error);
        });

});


authRouter.post('/logout', (req, res) => {
    //Check if refresh token exists in DB, delete it
    const refreshToken = req.body.token;
    const user = req.body.email;

    conn.db.oneOrNone("SELECT * from users WHERE email = $1 and token = $2", [user, refreshToken])
        .then(result => {
            if (result) {

                conn.db.none("UPDATE users SET token = $1, bt_uuid = $1, fb_token = $1 WHERE token = $2",
                    [null, refreshToken])
                    .then(() => {
                        console.log(`/logout, deleting  ${user}'s REFRESH_TOKEN: ${refreshToken}`);
                        res.status(200).json({message: "Logged out"});
                    }).catch(err => {
                        console.error("Error in delete: ", err);
                        
                    })


            } else {
                console.log("Mismatch between device_id and token, ignoring update in /logout");
                
            }
        }).catch(error => {
            res.sendStatus(400);
            console.error(`Error in logout route USERID: ${user}, refreshToken: ${refreshToken} ERROR: ${error}`);
        })
});

module.exports = authRouter;