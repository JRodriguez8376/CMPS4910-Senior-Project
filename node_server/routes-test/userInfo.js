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
userInfoRouter.post('/sendstatus'), (req, res) => {
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
}
userInfoRouter.get('/', (req, res, next) => {

res.json({
    message:"User Info Page"
});


});
module.exports = userInfoRouter;