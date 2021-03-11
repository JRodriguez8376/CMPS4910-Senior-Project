const express = require('express');
const hotspotRouter = express.Router();
const bcrypt = require('bcrypt');
const { access_token_secret, refresh_token_secret } = require('../config');
const user = require('../database/user');
const conn = require('../database/conn');


hotspotRouter.get('/', (req, res) => {
    res.json({
        Page: "Hotspot page"
    });
})
hotspotRouter.all('/locations',  (req, res) => {
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
hotspotRouter.post('/location',  (req, res) => {
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

*/

//Expect JSON object as "contact_point"
const hotspotCalc = (contact_point) => {
    //Loop through all contact_points
    //Use distance formula to check if two coordinates within contact_radius
    //if points < contact_radius/2, they're within each other's circles, make circle denser rather than larger
    // 
    //else if, pass coordinates into midpoint formula.
    //call newradius func using midpoint, any coordinate, number of coordinates total
    //else
    //disregard point
    return(contact_point[0]);
    /* 
    
    /
    for (let i = 0; i < contact_point.length; i++) {
        if (distance(contact_point[i], contact_point[i + 1]) < contact_radius / 2) {

        } else if (distance(contact_point[i], contact_point[i + 1] < contact_radius)) {
            mid = midpoint(contact_point[i], contact_point[i+1]);
            radius = newRadius(contact_point[i], mid, 2);
            //Store this info in JSON Array 
        }
    }
    */
}
        

//Midpoint Function of n points
const midpoint = (coordinates) => {
    let mid_x = 0;
    let mid_y = 0;
    for (let i = 0; i < coordinates.length; i++) {
        mid_x = coordinates[i].latitude;
        mid_y = coordinates[i].longitude;
    }
    mid_x = mid_x / 2;
    mid_y = mid_y / 2;
    let midpoint = JSON.parse(`"midpoint" : [{"latitude":${mid_x},"longitude":${mid_y}}]`);
    return (midpoint);
}
//Calculate new circle radius of combined contact distance from the midpoint
const newRadius = (coordinate, midpoint, pair_count) => {
    let d = distance(coordinate, midpoint);
    return (d + contact_radius * pair_count);
    //Should be new radius of combined circle of circles using radius
}
//Distance formula
const distance = (coordinate1, coordinate2) => {

    return (Math.sqrt(pow((coordinate1.latitude - coordinate2.latitude, 2)) + pow((coordinate2.longitude - coordinate2.longitude, 2))));
}
module.exports = hotspotRouter;