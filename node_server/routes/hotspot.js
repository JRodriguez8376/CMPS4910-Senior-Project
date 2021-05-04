const express = require('express');
const hotspotRouter = express.Router();
const bcrypt = require('bcrypt');
const { access_token_secret, refresh_token_secret } = require('../config');
const user = require('../database/user');
const conn = require('../database/conn');
const { validateToken } = require('./token');


//Return Hotspot Data matching the given latitude, longitude
hotspotRouter.post('/locations', validateToken, (req, res) => {
    conn.db.manyOrNone("SELECT * from hotspots")
        .then(result => {
            if (result && result.length != 0) {
                res.status(200).json(getHotspotCoords(req.body.latitude, req.body.longitude, result));
            } else {
                res.sendStatus(204);
            }
        }).catch(error => {
            res.status(400).json({
                message: "Error during POST request to /locations"
            });
            console.error("Error in locations POST route: ", error);
        });
});
//Add new Contact to contact table

hotspotRouter.post('/newcontact', validateToken, (req, res) => {
    const uuid_1 = req.body.uuid_1;
    const uuid_2 = req.body.uuid_2;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    let newDate = new Date(parseInt(req.body.time_met));
    const time_recorded = newDate.toISOString();
    console.log("CONVERTING TIME RECORDED", time_recorded);
    //console.log("Time: ", time_recorded);
    console.log(`CONTACT VARIABLES: \n UUID1: ${uuid_1} \n UUID2: ${uuid_2} \n latitude: ${latitude} \n longitude: ${longitude}\n time_recorded: ${time_recorded}`)

    conn.db.one('SELECT device_id_1, device_id_2 FROM bluetooth_contact WHERE bt_uuid_1 = $1 AND bt_uuid_2 = $2', [uuid_1, uuid_2])
        .then(result => {
            conn.db.none("INSERT into potential_contact(device_id_1, device_id_2, latitude, \
            longitude, time_met) VALUES($1, $2, $3, $4, $5)", [result.device_id_1, result.device_id_2,
                latitude, longitude, time_recorded])
                .then(() => {
                    console.log("/newcontact successful");
                    res.sendStatus(200);
                }).catch(error => {
                    res.status(400).json({
                        message: " rejected data input in /newcontact route"
                    });
                    console.error("Error occurred in /newcontact | \n", error);
                })
        }).catch(error => {
            res.status(401).json({
                message: "No info can be matched in /newcontact"
            });
            console.error("Error occurred in query in /newcontact ERROR:", error);
        })

});


//Add new location into locations table
hotspotRouter.post('/newlocation', validateToken, (req, res) => {

    const uuid_1 = req.body.uuid_1;
    const uuid_2 = req.body.uuid_2;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    let newDate = new Date(req.body.time_met);
    const time_recorded = newDate.toISOString();
    console.log("CONVERTING TIME RECORDED", time_recorded);


    conn.db.one('SELECT device_id_1, device_id_2 FROM bluetooth_contact WHERE bt_uuid_1 = $1 AND bt_uuid_2 = $2', [uuid_1, uuid_2])
        .then(result => {
            conn.db.none("INSERT into locations(fk_device_id, fk_device_id_2, latitude, \
            longitude, time_recorded) VALUES($1, $2, $3, $4, $5)", [result.device_id_1, result.device_id_2,
                latitude, longitude, time_recorded])
                .then(() => {
                    console.log("/newlocation successful");
                    res.sendStatus(200);
                }).catch(error => {
                    res.status(400).json({
                        message: " rejected data input in /newlocation route"
                    });
                    console.error("Error occurred in /newlocation | \n", error);
                })
        }).catch(error => {
            res.status(401).json({
                message: "No info can be matched in /newlocation"
            });
            console.error("Error occurred in query in /newlocation");
        })
});

var refreshTime = 0;
var coords = [];
const miles_in_ft = 264000;
const contact_radius = 10.0;
//Return hotspot data
//If < 15 mins, return JSON data matching the points given within 10 miles
// If > 15 mins, calculate any new hotspot points, then return JSON data
const getHotspotCoords = (latitude, longitude, contact_point) => {
    let areas = []
    //If its been less than 15 minutes since last check, return old info
    console.log("Current refresh time", refreshTime);
    if (refreshTime != 0 || Math.floor((new Date() - refreshTime / 60000)) < 15) {
        console.log("It's been less than 15 mins");
        if (coords != null || coords.length != 0) {
            for (i = 0; i < coords.length; i++) {
                //If hotspot is within 5 miles
                console.log("Midpoint: ", coords[i].midpoint.latitude, " ", coords[i].midpoint.longitude, " Getting coords", latitude, longitude);
                if (distance(coords[i].midpoint, { latitude: latitude, longitude: longitude }) < miles_in_ft) {
                    areas.push(coords[i]);
                }
            }
        }
        return areas;
    } else {
        //else calc new hotspot points, return relevant points
        console.log("Getting new coords ", latitude, longitude);
        coords = hotspotCalc(contact_point);
        refreshTime = new Date();
        for (i = 0; i < coords.length; i++) {
            //If hotspot is within 5 miles
            console.log("Midpoint: ", coords[i].midpoint.latitude, " ", coords[i].midpoint.longitude, " Getting coords", latitude, longitude);
            if (distance(coords[i].midpoint, { latitude: latitude, longitude: longitude }) < miles_in_ft) {
                areas.push(coords[i]);
            }
        }
        return areas;
    }
}
//Calculate new hotspots
const hotspotCalc = (contact_point) => {
    //turn contact_point into JSON format locationsHotspot
    let hotspot_json = makeHotspotJSON(contact_point);
    var points = [];

    //Make new hotspot(midpoint, radius, density) json from contact_point lists
    for (i = 0; i < hotspot_json.length; i++) {
        let point = {
            midpoint: {},
            radius: null,
            density: null
        };

        point.density += 2;
        point.midpoint = calcMidpoint(hotspot_json[i].coordinates);
        point.radius = 3.3;
        points.push(point);
    }
}


//Midpoint Function of n points
const calcMidpoint = (coordinates) => {
    let mid_x = 0;
    let mid_y = 0;
    for (let i = 0; i < coordinates.length; i++) {
        mid_x += parseFloat(coordinates[i].latitude);
        mid_y += parseFloat(coordinates[i].longitude);
    }

    mid_x /= 2;
    mid_y /= 2;
    let midpoint = { latitude: mid_x, longitude: mid_y };

    return (midpoint);
}

//Distance formula on a sphere, Haversine Formula
const distance = (coordinate1, coordinate2) => {

    let R = 6371;
    let km_to_ft = 3280.84;
    let dlat = toRad(parseFloat(coordinate2.latitude) - parseFloat(coordinate1.latitude));
    let dlong = toRad(parseFloat(coordinate2.longitude) - parseFloat(coordinate1.longitude));
    let lat1 = toRad(parseFloat(coordinate1.latitude));
    let lat2 = toRad(parseFloat(coordinate2.latitude));

    let dis = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.sin(dlong / 2) * Math.sin(dlong / 2) *
        Math.cos(lat1) * Math.cos(lat2);


    dis2 = 2 * Math.atan2(Math.sqrt(dis), Math.sqrt(1 - dis));
    dis3 = dis2 * R * km_to_ft;
    return (dis3);
}
//Convert degrees to radians
const toRad = (coordinate) => {
    return coordinate * Math.PI / 180;
}
//Make ContactPoint JSON using data from database
const makeHotspotJSON = (contact_point_arr) => {
    let hotspot_json = []

    for (i = 0; i < contact_point_arr.length; i++) {
        for (j = i + 1; j < contact_point_arr.length; j++) {
            //Check ids + check time difference < 2 mins
            if ((contact_point_arr[i].device_id_1 == contact_point_arr[j].device_id_2) && (contact_point_arr[i].device_id_2 == contact_point_arr[j].device_id_1)) {
                let hotspots =
                {
                    ids: {},
                    coordinates: [],
                    midpoint: {},
                    radius: 3.3,
                    density: 0
                }
                let c1 = {
                    latitude: contact_point_arr[i].latitude,
                    longitude: contact_point_arr[i].longitude
                }
                let c2 = {
                    latitude: contact_point_arr[j].latitude,
                    longitude: contact_point_arr[j].longitude
                }
                hotspots.ids = { id1: contact_point_arr[i].device_id_1, id2: contact_point_arr[i].device_id_2 };
                hotspots.coordinates.push(c1);
                hotspots.coordinates.push(c2);
                hotspot_json.push(hotspots);

                //Remove point from list
                contact_point_arr.splice(j, 1);
                break;
            }
        }
    }

    return hotspot_json;
}
module.exports = hotspotRouter;