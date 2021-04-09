const express = require('express');
const hotspotRouter = express.Router();
const bcrypt = require('bcrypt');
const { access_token_secret, refresh_token_secret } = require('../config');
const user = require('../database/user');
const conn = require('../database/conn');
const { validateToken } = require('./token');


//Return Hotspot Data matching the given latitude, longitude
hotspotRouter.post('/locations', validateToken, (req, res) => {
    conn.db.manyOrNone("SELECT * from potential_contact")
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
    const uuid_1 = req.body.user_uuid;
    const uuid_2 = req.body.contacted_uuid;
    conn.db.one("SELECT device_id from users WHERE bt_uuid = $1", [uuid_1])
    .then(result => {
        conn.db.one("SELECT device_id from users WHERE bt_uuid = $1", [uuid_2])
        .then(result2 => {
            conn.db.none("INSERT into potential_contact(device_id_1, device_id_2, latitude, \
                longitude, time_met) VALUES($1, $2, $3, $4, $5)", [result.device_id, result2.device_id,
                req.body.latitude, req.body.longitude, req.body.time_recorded])
                .then(() => {
                    console.log("/newcontact successful");
                    res.sendStatus(200);
                }).catch(error => {
                    res.status(400).json({
                        message: " rejected data input in /newcontact route"
                    });
                    console.error("Error occurred in /newcontact query | \n", error);
                })
        }).catch(error => {
            console.error("Error in searching user uuid_2: ", error);
        });
        
    }).catch(error => {
        console.error("Error in searching user uuid_1: ", error);
    });
});


//Add new location into locations table
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

var refreshTime = 0;
var coords = [];
const miles_in_ft = 26400;
const contact_radius = 3.3;
//Return hotspot data
//If < 15 mins, return JSON data matching the points given within 5 miles
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
        if (distance(hotspot_json[i].coordinates[0], hotspot_json[i].coordinates[1]) < contact_radius) {

            point.density += 2;
            point.midpoint = calcMidpoint(hotspot_json[i].coordinates);
            point.radius = 3.3;
            points.push(point);
        } else if (distance(hotspot_json[i].coordinates[0], hotspot_json[i].coordinates[1]) < contact_radius * 2) {

            point.density += 1;
            point.midpoint = calcMidpoint(hotspot_json[i].coordinates);
            point.radius = newRadius(hotspot_json[i].coordinates[0], point.midpoint);
            points.push(point);
        } else {
    
            continue;
        }
        
    }
    let update = true;
    let iter = 0;
    //Merge overlapping hotspots into new hotspots, remove old hotspots from list if merge occured
    while (update && points.length > 1) {
        let point = {
            midpoint: {},
            radius: null,
            density: null
        };
        if (update && iter+1 == points.length) {
            //reset iterator if it reached the end of the list and updates still are being applied
            iter = 0;
        }

        update = false;
        if (distance(points[iter].midpoint, points[iter + 1].midpoint) < contact_radius) {
            //They're within each other's circle
            point.density += 2;
            point.midpoint = calcMidpoint([points[iter].midpoint, points[iter + 1].midpoint]);
            point.radius = points[iter].radius;
            points.splice(iter, 1);
            points.push(point);
            update = true;
        } else if (distance(points[iter].midpoint, points[iter + 1].midpoint) < contact_radius * 2) {
            //Their circle radius is within each other
            point.density += 1;
            point.midpoint = calcMidpoint([points[iter].midpoint, points[iter + 1].midpoint]);
            point.radius = newRadius(point[iter].midpoint, point.midpoint, 2);
            points.splice(iter, 1);
            points.push(point);
            update = true;
        }
        iter++;
    }
    return (points);


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
//Calculate new circle radius of combined contact distance from the midpoint
const newRadius = (coordinate, midpoint, pair_count) => {

    let d = distance(coordinate, midpoint);
    console.log("New radius distance", d);
    return (d + 3.3 * pair_count);
    //Should be new radius of combined circle of circles using radius
}
//Distance formula on a sphere
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

                //Remove points from list
                let removed = contact_point_arr.splice(i, 1);
                removed = contact_point_arr.splice(j - 1, 1);
                break;
            }
        }
    }

    return hotspot_json;
}
module.exports = hotspotRouter;