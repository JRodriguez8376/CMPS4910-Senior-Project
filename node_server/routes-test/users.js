const express = require('express');
const usersRouter = express.Router();
const conn = require('../database/conn');

usersRouter.all('/', (req, res, next) => {
    console.log(req.body);
    conn.db.any("SELECT * FROM users", [true])
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(error => {
            console.log(error);
        });

});
module.exports = usersRouter;