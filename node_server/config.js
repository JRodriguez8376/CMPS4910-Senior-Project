
//Organizing environment variables
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASS,
    db_name: process.env.DB_NAME,
    
    issuer: process.env.ISSUER,
    scope: process.env.SCOPE,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
};