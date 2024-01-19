const Pool = require('pg').Pool
const dotenv =require('dotenv');
dotenv.config()

// this file is to establish pool of connection to postgres db and pass coonection wherever required
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

module.exports = pool;