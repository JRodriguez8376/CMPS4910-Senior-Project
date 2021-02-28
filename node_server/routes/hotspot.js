const express = require('express');
const hotspotRouter = express.Router();
const bcrypt = require('bcrypt');
const { access_token_secret, refresh_token_secret } = require('../config');
const user = require('../database/user');
const conn = require('../database/conn');
const { validateToken } = require('./token');

hotspotRouter.get('/', (req, res) => {
    res.json({
        Page: "Hotspot page"
    });
});
hotspotRouter.post('/locations', validateToken, (req, res) => {
    conn.db.many("SELECT latitude, longitude from locations")
        .then(result => {
            if (result && result.length != 0) {
                res.status(200).json(result);
            } else {
                res.status(204).json({
                    message: "No location data to return"
                });
            }
        }).catch(error => {
            res.status(400).json({
                message: "Error during POST request to /locations"
            });
            console.error("Error in locations POST route: ", error);
        });
});
hotspotRouter.post('/newcontact', validateToken, (req, res) => {
    conn.db.none("INSERT into potential_contact(device_id_1, device_id_2, latitude, \
        longitude, time_met) VALUES($1, $2, $3, $4, $5)", [req.body.device_id, req.body.device_id_2,
    req.body.latitude, req.body.longitude, req.body.time_recorded])
        .then(() => {
            console.log("/newcontact successful");
            conn.db.none("INSERT into locations(fk_device_id, latitude, longitude, time_recorded) \
            VALUES($1, $2, $3, $4)", [req.body.device_id, req.body.latitude,
            req.body.longitude, req.body.time_recorded])
                .then(() => {
                    res.status(200).json({
                        message: "Accepted data input in /newcontact route"
                    });
                    console.log("/newlocation in /newcontact successful");
                })
                .catch(error => {
                    res.status(400).json({
                        message: "Rejected data input in /newcontact route"
                    });
                    console.error("Error occurred in /newlocation /newcontact query | \n", error);
                })
        })
        .catch(error => {
            res.status(400).json({
                message: " rejected data input in /newcontact route"
            });
            console.error("Error occurred in /newcontact query | \n", error);
        })
});

hotspotRouter.post('/newlocation', validateToken, (req, res) => {
    conn.db.none("INSERT into locations(fk_device_id, latitude, longitude, time_recorded) \
        VALUES($1, $2, $3, $4)", [req.body.device_id, req.body.latitude,
    req.body.longitude, req.body.time_recorded])
        .then(() => {
            console.log("/newlocation successful");
            res.status(200).json({
                message: "Accepted data input in /newlocation route"
            });
        })
        .catch(error => {
            console.error("Error occurred in /newlocation query | \n", error);
            res.status(400).json({
                message: " rejected data input in /newlocation route"
            });
        })
});
hotspotRouter.post('/location', validateToken,  (req, res) => {
    conn.db.many("SELECT * from locations where fk_device_id = $1", req.body.device_id)
        .then(result => {
            if (result && result.length != 0) {
                res.status(200).json(result);
            } else {
                res.status(204).json({
                    message: "No location data to return"
                });
            }
        }).catch(error => {
            res.status(400).json({
                message: "Error during POST request to /locations"
            });
            console.error("Error in locations POST route: ", error);
        });
});

module.exports = hotspotRouter;