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

authRouter.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Path-o-gen API"
    });
});

//

//Validate user input for signup/login
const validateUser = (user) => {
    const validID = typeof user.id == 'string' && user.id.trim() != '';
    const validPassword = typeof user.password == 'string' && user.password.trim() != '';
    if (validID && validPassword) {
        return (true);
    } else {
        return (false);
    }
}
//Signup route for authentication
authRouter.post('/signup', (req, res, next) => {

    //Check if inputs are valid
    if (validateUser(req.body)) {
        //Use pg-promise querying to query db, uses promises for async operations
        conn.db.oneOrNone(user.userExists, req.body.id)
            .then(result => {
                if ( result && result.length != 0) {
                    //If a user was found, do this
                    res.status(403).json({
                        message: "User exists"
                    })
                    console.log("User already exists");
                } else {
                    //Hash signup password into database, create new user with hashed password
                    bcrypt.hash(req.body.password, saltRounds).then((hash) => {
                        res.status(200).json({
                            hash,
                            message: 'hashed'
                        });
                        user.signUp(req.body.id, hash);
                    })
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

    if (validateUser(req.body)) {
        //Async querying db
        conn.db.oneOrNone(user.userExists, req.body.id)
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
                        .compare(req.body.password, result.passwrd)
                        .then(answer => {
                            //If matched, send response and login information
                            if (answer) {
                                const user_token_info = { id: req.body.id };
                                console.log("User Token Info", user_token_info);
                                
                                console.log("User logging in");
                                //Signing JSON web tokens for authentication
                                const accessToken = token.generateToken(user_token_info);
                                const refreshToken = token.generateRefreshToken(user_token_info);
                                conn.db.oneOrNone("UPDATE users SET token = $1 where id = $2", [refreshToken, req.body.id])
                                .then(result => {
                                    res.status(200).json({
                                        answer,
                                        message: "Logged in",
                                        
                                        accessToken: accessToken,
                                        refreshToken: refreshToken
                                    });
                                }).catch(err => {
                                    console.error("Error in login, update: ", err);
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
        if(result.length == 0 || result == null) {
            return res.sendStatus(401);
        } else if(result != refreshToken) {
            return res.sendStatus(403);
        } else {
            return verifyJWT(refreshToken, result.device_id);
        }

    }).catch(error => {
        console.error("Error in /refresh route");
    });

});
authRouter.delete('/logout', (req, res) => {
    //Check if refresh token exists in DB, delete it
    const refreshToken = req.body.token;
    
    conn.db.oneOrNone("UPDATE users set token = $1 WHERE token = $2", ["", refreshToken])
    .then(result => {
        if(result != null || result.length != 0) {
            console.log("Deleted token");
            res.sendStatus(204);
        } else {
            console.log("Token does not exist");
        }
    }).catch(error => {
        console.error("Error in logout route");
    })

    
});

module.exports = authRouter;