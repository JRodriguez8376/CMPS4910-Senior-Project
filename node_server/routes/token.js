const jwt = require('jsonwebtoken');
const {access_token_secret, refresh_token_secret} = require('../config');

const generateToken = (userToken) => {
    return jwt.sign(userToken, access_token_secret, {expiresIn: '1m'});
}
const generateRefreshToken = (refreshToken) => {
    return jwt.sign(refreshToken, refresh_token_secret);
}

//Checks if its a valid token
const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Validation requested: ", authHeader);
    if (authHeader) {
        console.log("Authorization recieved: ", authHeader);
        const token = authHeader.split(' ')[1];
        jwt.verify(token, access_token_secret, (err, user) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
                
            }
            req.user = user;
            next();
        })
    } else {
        return res.sendStatus(401);
    }
}

module.exports = {
    validateToken,
    generateToken,
    generateRefreshToken
}