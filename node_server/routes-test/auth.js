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
// const variables

const saltRounds = 10;

authRouter.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Path-o-gen API"
    });
});

//
const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
    } else {
        return res.sendStatus(401);
    }
    jwt.verify(token, access_token_secret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}
//Validate userinput for signup/login
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
        conn.db.one(user.userExists, req.body.id)
            .then(result => {
                if (result.length != 0) {
                    //If a user was found, do this
                    res.json({
                        message: "User exists"
                    })
                    console.log("User already exists");
                } else {
                    //Hash signup password into database, create new user with hashed password
                    bcrypt.hash(req.body.password, saltRounds).then((hash) => {
                        res.json({
                            hash,
                            message: 'hashed'
                        });
                        user.signUp(req.body.id, hash);
                    })
                }
            })
            .catch(error => {
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
                    res.json({
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
                                console.log("User logging in");
                                //Signing JSON web tokens for authentication
                                const accessToken = jwt.sign(user_token_info, access_token_secret);
                                res.json({
                                    answer,
                                    message: "Logged in",
                                    accessToken: accessToken
                                });
                            } else {
                                //Else state it does not log in user
                                res.json({
                                    answer,
                                    message: "Not Logged in"
                                });
                                console.log("Failed login attempt");
                            }
                        });
                }
            })
            .catch(error => {
                console.log("Error", error);
                res.json("Error in logging in");
            });
    } else {
        next(new Error('Invalid User'));
    }
});

module.exports = authRouter;