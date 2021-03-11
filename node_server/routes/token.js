const jwt = require('jsonwebtoken');
const {access_token_secret, refresh_token_secret} = require('../config');

const generateToken = (userToken) => {
    return jwt.sign(userToken, access_token_secret, {expiresIn: '24h'});
}
const generateRefreshToken = (refreshToken) => {
    return jwt.sign(refreshToken, refresh_token_secret);
}

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
const verifyJWT = (refreshToken, user_info) => {
    jwt.verify(refreshToken, refresh_token_secret, (err) => {
        if(err) {
            return res.sendStatus(403);
        }
        const accessToken = generateToken({id: user_info});
        return res.json({accessToken: accessToken });
    });
}
module.exports = {
    validateToken,
    generateToken,
    generateRefreshToken,
    verifyJWT
}