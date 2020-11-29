const mysql = require("mysql");
const util = require("util");

//This will create multiple connections
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "db4free.net",
    user: "aledeawilliams",
    password: "panaderoconelpan",
    database: "nodejs_mau"
});

//All the database requests wil be JS promises
pool.query = util.promisify(pool.query);

module.exports = pool;