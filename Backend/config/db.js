
// const mysql = require('mysql2');
// require('dotenv').config();

// const dbconnection = mysql.createPool({
//     uri: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: true
//     },
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// dbconnection.getConnection((err, connection) => {
//     if (err) {
//         console.log("TiDB connection failed:", err.message);
//     } else {
//         console.log("Connected to TiDB Cloud successfully!");
//         connection.release();
//     }
// });

// module.exports = dbconnection.promise();


const mysql = require("mysql2");
require("dotenv").config();

const dbconnection = mysql.createPool(
    process.env.DATABASE_URL,
    {
        ssl: {
            rejectUnauthorized: true
        },
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

dbconnection.getConnection((err, connection) => {
    if (err) {
        console.error("TiDB connection failed:", err.message);
    } else {
        console.log("Connected to TiDB Cloud successfully!");
        connection.release();
    }
});

module.exports = dbconnection.promise();
