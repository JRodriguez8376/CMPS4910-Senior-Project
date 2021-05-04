
const { db_host, db_port, db_user, db_password, db_name } = require('../config');
const dbConfig = {
    host: db_host,
    port: db_port,
    user: db_user,
    password: db_password,
    database: db_name,
}
const pgPromise = require("pg-promise")()
const db = pgPromise(dbConfig);


console.log("------------------------------------------------");
console.log("Current Database Environment variables: ");
console.log("Database Host:" , db_host);
console.log("Database name: ", db_name);
console.log("Database Username: ", db_user);
console.log("Database Password: ", db_password);
console.log("Database Port: ", db_port);
console.log("------------------------------------------------");



module.exports = {
    db,
    pgPromise
};



