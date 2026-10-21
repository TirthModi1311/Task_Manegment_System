
const mysql = require('mysql2');
require('dotenv').config();

//here we create the comnnction to the database using the connection string from the .env file

const dbconnection = mysql.createPool(process.env.DATABASE_URL);

dbconnection.getConnection((err, conncetion)=>{

    if(err){
        console.log("Xampp MySQL connection is Failed:", err.message);
    }
    else{
        console.log("connected to Xampp MySQL Database successfully");
        conncetion.release();
        
    }
});

// export the connection to used in other files
module.exports = dbconnection.promise();