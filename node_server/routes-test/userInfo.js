const express = require('express');
const userInfoRouter = express.Router();
const conn = require('../database/conn');
userInfoRouter.all( '/user', (req, res, next) => {
    console.log(req.body);
    conn.db.oneOrNone('SELECT * FROM users where device_id = $1', req.body.id)
    .then(result => {
        if (result.length == 0) {
            //If no user was found, do this
            res.json({
                message: "User does not exist"
            })
            console.log("User does not exist ");
        } else {
            res.json({
                result
            });
        }
    })

});
userInfoRouter.get('/', (req, res, next) => {

res.json({
    message:"User Info Page"
});


});
module.exports = userInfoRouter;