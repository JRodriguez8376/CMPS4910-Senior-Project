const {db_host, db_port, db_user, db_password, db_name} = require('./config');
const { query, response } = require('express');
const {Pool} = require('pg');


const pool = new Pool({
    host: db_host,
    port: db_port,
    user: db_user,
    password: db_password,
    database: db_name,
});


console.log("------------------------------------------------");
console.log("Current Database Environment variables: ");
console.log("Database Host:" , db_host);
console.log("Database name: ", db_name);
console.log("Database Username: ", db_user);
console.log("Database Password: ", db_password);
console.log("Database Port: ", db_port);
console.log("------------------------------------------------");

//This is how to single query using pg, node.js and express
const checkConnection = (req, res) => {
    pool.query('SELECT NOW()', (err, res) => {
        console.log(err, res)
    });
}
//retrieving all User records
const getAllUsers = (req, res) => {
    pool.query('SELECT * from users', (err, results) => {

        if(err) {
            console.log(err, res);
            throw err;
        }
        console.log('User:', results.rows);
        res.status(200).json(results.rows);
    
    });
}
//Adding user to database
const createUser = (req, res) => {
    const userType = JSON.parse(JSON.stringify(req.body));

    pool.query('INSERT into users(user_type) VALUES ($1)', [userType['userType']], 
    (err) => {
        if(err) {
            throw err;
        }
        res.status(201).send(`User added`);
        console.log(userType);
    });
}
//Retrieve single user by ID
const getUserByID = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM users WHERE device_id = $1', [id], (err, results) => {
        if(err) {
            throw err;
        }
    
    res.status(200).json(results.rows);
    });
}

const getStatusCondition = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT fk_status_id FROM has WHERE fk_device_id = $1', [id], 
        (err, results) => {
        if(err) {
            throw err;
        }
        const statusID = results.rows;
        pool.query('SELECT status_name, caution_level FROM statuses WHERE status_id = $1', [statusID],
            (err, results) => {
            if(err) {
                throw err;
            }
        res.status(200).json(results.rows);
        });
    });
}

//Add new row to 'Has' with status condition ID
const addStatusCondition = (req, res) => {
    const status = JSON.parse(JSON.stringify(req.body)); 
    pool.query('SELECT status_id FROM statuses WHERE $status_name = $1', [status['statusName']], 
        (err, results) => {
        if(err) {
            throw err;
        }
        const statusID = results.rows;
        const userID = status['userID'];
        pool.query('INSERT into has (fk_status_id, fk_device_id) VALUES($1, $2)',
            [userID, statusID], (err) => {
            if(err) {
                throw err;
            }
        res.status(201).send('Added new status');
        });
    });
}

const addUserCondition = (req, res) => {
    const virus = JSON.parse(JSON.stringify(req.body)); 
    pool.query('SELECT is_infected FROM virus WHERE $strain_name = $1', [virus['virusName']], 
        (err, results) => {
        if(err) {
            throw err;
        }
        const userID = virus['deviceID'];
        const virusID = results.rows;
        pool.query('INSERT into contracts (fk_device_id, fk_is_infected) VALUES($1, $2)',
            [userID, virusID], (err) => {
            if(err) {
                throw err;
            }
        res.status(201).send('Added new virus');
        });
    
    });
}
const getUserCondition = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT fk_is_infected FROM contracted WHERE fk_device_id = $1', [id], 
        (err, results) => {
        if(err) {
            throw err;
        }
        const virusID = results.rows;
        pool.query('SELECT strain_name FROM virus is_infected = $1', [virusID],
            (err, results) => {
            if(err) {
                throw err;
            }
        res.status(200).json(results.rows);
        });
    });
}
const addContactPoint = (req, res) => {
    const users = JSON.parse(JSON.stringify(req.body)); 
    pool.query('INSERT into contact(device_id_1, device_id_2, latitude, longitude, time_met) VALUES($1, $2, $3, $4, $5)', 
    [users['device_id_1'], users['device_id_2'], users['latitude'], 
    users['longitude'], users['time_met']], 
        (err) => {
        if(err) {
            throw err;
        }
        res.status(201).send('Added new contact point');
    });
    
}
const getAllContacted = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT device_id_2 FROM contact WHERE device_id_1 = $1', [id], 
        (err, results) => {
        if(err) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
}



//Exporting the functions for use in other files

module.exports = {
checkConnection,
getAllUsers,

createUser,
getUserByID,

addUserCondition,

getStatusCondition,
addStatusCondition,

addUserCondition,
getUserCondition,

addContactPoint,
getAllContacted,

//getAllContactedLocations

}



