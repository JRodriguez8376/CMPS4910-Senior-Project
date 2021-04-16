const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

const firebase = require('./firebase/messages');
const api = require('./routes');
const test = require('./routes-test');

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
firebase.startListener();

// Test routes folder
app.use('/test', test);


app.get('/', (req, res) => {
    res.json({info: 'Node.js, Express, and Postgres API'})
});


app.listen(port, () => {
    console.log("Server running on port: ", port);
});
