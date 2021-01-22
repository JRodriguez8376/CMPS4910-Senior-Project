const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;



const api = require('./routes');
//const test = require('./routes-test');

// Temporary solution, the port number after "localhost:" corresponds to the
// port number of the expo application
app.use(cors({ 
    origin: 'http://localhost:19006', 
    credentials :  true
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
//API routes
app.use('/api', api);


// Test routes folder
//app.use('/test', test);


app.get('/', (req, res) => {
    res.json({info: 'Node.js, Express, and Postgres API'})
});

// API requests for data
//Implemented queries(subject to change)



//For later to uncomment when they are finished and working
/*


app.get('/status/:id', db.getStatusCondition); 
    // -- Return status condition, passed in user id
app.post('/status', db.addStatusCondition);
    // -- Add new status condition, passed in user id and status_name

app.post('/virus', db.addUserCondition)
    // -- Add new case of Virus, passed in user ID and strain type
app.get('/virus/:id', db.getUserCondition);
    // -- Return if user has virus or not, passed in user id

app.post('/contact, db.addContactPoint);
    // -- Add new contact point between two users, requires both user ids,
    //              latitude, longitude, time_met
app.get('/contact/:id', db.getAllContacted);
    // -- Return all contact points given a user id

app.get('/location/:long&:lat&:', db.getAllContactedLocations);
    // -- Return all contact point coordinates given ids(not fully planned out yet)

*/

app.listen(port, () => {
    console.log("Server running on port: ", port);
});
