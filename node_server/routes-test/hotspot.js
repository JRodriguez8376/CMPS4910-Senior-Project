const express = require('express');
const hotspotRouter = express.Router();
const bcrypt = require('bcrypt');
const { access_token_secret, refresh_token_secret } = require('../config');
const user = require('../database/user');
const conn = require('../database/conn');
const { json } = require('body-parser');


hotspotRouter.get('/', (req, res) => {
    res.json({
        Page: "Hotspot page"
    });
})
hotspotRouter.all('/locations', (req, res) => {
    conn.db.many("SELECT latitude, longitude from potential_contact")
        .then(result => {
            if (result && result.length != 0) {
                res.status(200).json(hotspotCalc(result));
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
hotspotRouter.post('/newcontact', (req, res) => {
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

hotspotRouter.post('/newlocation', (req, res) => {
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
hotspotRouter.post('/location', (req, res) => {
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
hotspotRouter.post('/testCalc', (req, res) => {
    conn.db.many("SELECT * from potential_contact")
        .then(result => {
            if (result && result.length != 0) {
                res.status(200).json(getHotspotCoords(req.body.latitude, req.body.longitude, result));
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

})

//JSON Object containing list of coordinates
//Example format to return

/*
locationsHotspot = {
        {
        "hotspots": [
            {
            "coordinates" : [{"latitude": "x1", "longitude": "y1"}, {"latitude": "x2", "longitude": "y2"}],
            "midpoint" : [{"latitude": "mx1", "longitude": "my1"}],
            "radius" : "r1",
            "density" : "d1"
            }
        ]
}


potential_contact table

device_id_1
device_id_2
latitude
longitude
time_met
speed

*/
let hotspot = {

    hotspots: [
        {
            coordinates: [],
            midpoint: {},
            radius: 3.3,
            density: 0
        }
    ]
}
var refreshTime = 0;
var coords = [];
const getHotspotCoords = (latitude, longitude, contact_point) => {
    let areas = []
    //If its been less than 15 minutes since last check, return old info
    console.log("Current refresh time", refreshTime);
    if(refreshTime != 0 || Math.floor((new Date() - refreshTime/60000)) < 15) {
        console.log("It's been less than 15 mins");
        if(coords != null || coords.length != 0) {
            for(i = 0; i < coords.length; i++) {
                //If hotspot is within 5 miles
                console.log("Midpoint: ", coords[i].midpoint.latitude, " ", coords[i].midpoint.longitude, " Getting coords", latitude, longitude);
                if(distance(coords[i].midpoint, {latitude: latitude, longitude: longitude}) < 26400) {
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
        for(i = 0; i < coords.length; i++) {
            //If hotspot is within 5 miles
            console.log("Midpoint: ", coords[i].midpoint.latitude, " ", coords[i].midpoint.longitude, " Getting coords", latitude, longitude);
            if(distance(coords[i].midpoint, {latitude: latitude, longitude: longitude}) < 26400) {
                areas.push(coords[i]);
            }
        }
        return areas;
    }
    

}
//Expect JSON object as "contact_point"
const hotspotCalc = (contact_point) => {
    //turn contact_point into JSON format locationsHotspot
    let json_obj = makeHotspotJSON(contact_point);
    //console.log(json_obj.length);
    //console.log(json_obj);
    var points = [];

    for (i = 0; i < json_obj.length; i++) {
        let point = {
            midpoint: {},
            radius: null,
            density: null
        };
        console.log("JSON OBJ", i)
        if (distance(json_obj[i].coordinates[0], json_obj[i].coordinates[1]) < 3.3) {
            
            point.density += 2;
            point.midpoint = calcMidpoint(json_obj[i].coordinates);
            point.radius = 3.3;
            points.push(point);
        } else if (distance(json_obj[i].coordinates[0], json_obj[i].coordinates[1]) < 6.6) {
            console.log("GOOO");
            console.log(`ID1: ${json_obj[i].ids.id1} ${json_obj[i].ids.id2}`);
            point.density += 1;
            point.midpoint = calcMidpoint(json_obj[i].coordinates);
            point.radius = newRadius(json_obj[i].coordinates[0], point.midpoint, 2);
            points.push(point);
        } else {
            continue;
        }
    }
    let update = true;
    let iter = 0;
    console.log(points);
    while (update) {
        let point = {
            midpoint: {},
            radius: null,
            density: null
        };
        if (update && iter == points.length) {
            iter = 0;
        }
        console.log("iter:", iter);
        update = false;
        if (distance(points[iter].midpoint, points[iter + 1].midpoint) < 3.3) {
            point.density += 2;
            point.midpoint = calcMidpoint([points[iter].midpoint, points[iter + 1].midpoint]);
            point.radius = points[iter].radius;
            points.splice(iter, 1);
            points.push(point);
            update = true;
        } else if (distance(points[iter].midpoint, points[iter + 1].midpoint) < 6.6) {
            
            point.density += 1;
            point.midpoint = calcMidpoint([points[iter].midpoint, points[iter + 1].midpoint]);
            point.radius = newRadius(point[iter].midpoint, point.midpoint, 2);
            points.splice(i, 1);
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
//Distance formula
const distance = (coordinate1, coordinate2) => {


    console.log("Coordinate 1: ", coordinate1.latitude, " ", coordinate1.longitude);

        console.log("Coordinate 2: ", coordinate2.latitude, " ",coordinate2.longitude);
    let R = 6371;
    let dlat = toRad(parseFloat(coordinate2.latitude) - parseFloat(coordinate1.latitude));
    let dlong = toRad(parseFloat(coordinate2.longitude) - parseFloat(coordinate1.longitude));
    let lat1 = toRad(parseFloat(coordinate1.latitude));
    let lat2 = toRad(parseFloat(coordinate2.latitude));


    //console.log(lat, long);

    let dis = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.sin(dlong / 2) * Math.sin(dlong / 2) *
        Math.cos(lat1) * Math.cos(lat2);
        

    dis2 = 2 * Math.atan2(Math.sqrt(dis), Math.sqrt(1 - dis));
    dis3 = dis2 * R * 3280.84;
    console.log(dis3);
    return (dis3);
}
const toRad = (coordinate) => {
    return coordinate * Math.PI / 180;
}
const makeHotspotJSON = (contact_point_arr) => {
    let hotspot_json = []


    let index = 0;
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
                hotspots.ids = {id1: contact_point_arr[i].device_id_1, id2: contact_point_arr[i].device_id_2};
                hotspots.coordinates.push(c1);
                hotspots.coordinates.push(c2);
                hotspot_json.push(hotspots);

                let removed = contact_point_arr.splice(i, 1);
                console.log("Coord1: ", removed);
                removed = contact_point_arr.splice(j - 1, 1);
                console.log("Coord2: ", removed);
                break;
            }
        }
    }

    return hotspot_json;
}
module.exports = hotspotRouter;