const express = require('express');
const userInfoRouter = express.Router();
const conn = require('../database/conn');
const { validateToken } = require('./token.js');
userInfoRouter.all('/user', validateToken, (req, res) => {
    console.log(req.body);
    conn.db.oneOrNone('SELECT * FROM users where email = $1', req.body.email)
        .then(result => {
            if (result.length == 0) {
                //If no user was found, do this
                res.status(404).json({
                    message: "User does not exist"
                })
                console.log("User does not exist ");
            } else {
                res.status(200).json(result);
            }
        })
});

userInfoRouter.post('/sendstatus', validateToken, (req, res) => {
    conn.db.none("INSERT into has(fk_status_id, fk_has_device_id) VALUES($1, $2)",
        [req.body.status_id, req.body.device_id])
        .then(() => {
            console.log("/sendstatus route successful");
            res.status(200).json({
                message: "Accepted POST request in /sendStatus"
            });
        })
        .catch(error => {
            console.error("Error occured in /sendstatus query \n ", error);
            res.status(400).json({
                message: "Rejected status send"
            });
        });
});

userInfoRouter.get('/', (req, res, next) => {

    res.json({
        message: "User Info Page"
    });


});
module.exports = userInfoRouter;