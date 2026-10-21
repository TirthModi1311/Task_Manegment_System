
const db = require("../config/db"); // import the database connection;

const User = {
    // This is used to create new user in database

   async create(username,hashedPassword){
    const [result] = await db.execute(
        "Insert InTO Users(Username, Password) values(?,?)",  
        [username, hashedPassword]                                 // it give inserted name and its password with hashvalue
    );
    return result.insertId;                                       // It returns the ID of newly created User in table
   },

   // this is used to find user by username in database
   
   async findByUsername(Username){

        const [rows] = await db.execute( 
            'SELECT * FROM users WHERE Username = ?',
            [Username]                // parameterized query to prevent SQL injection, it will replace the ? with the value of Username
        );
        return rows[0]               // return the first row of the result which contains the user data if found or undefined if not found
   }
}


module.exports = User;
