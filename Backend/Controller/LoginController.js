
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../Models/userModel");

// const loginUser = async (req, res)=>{
//     try{
//         const {Username, Password} = req.body;

//         if (!Username || !Password) {
//             return res.status(400).json({
//                 Error: 'Please Provide both Username and Password'
//             })
//         }
//         const user = await User.findByUsername(Username)

//         if(!user){
//             return res.status(400).json({
//                 Error: 'Invalid Credential or Unauthorized Access'
//             })
//         }

//         const storedPassword = user.Password ?? user.password;

//         if (!storedPassword) {
//             throw new Error("Stored password is missing from database result");
//         }

//         const isMatch = await bcrypt.compare(Password, storedPassword);
        

//         if(!isMatch){
//             return res.status(400).json({
//                 Error: 'Invalid Credential or Unauthorized Access'
//             })
//         }
//         const userId = user.Id || user.id;
//         const userNameVal = user.Username || user.username;

//         const token = jwt.sign(
//             {id:userId, Username: userNameVal},
//             process.env.JWT_SECRET,
//             {expiresIn: '1h'}
//         );
//         res.json({
//             message: "Logged In Successfully",
//             token: token,
//         })
//     }
//     catch(error){
//         console.error('Login Error:', error.message);
//         res.status(500).json({
//             Error:"Server Error during Login"
//         })
//     }
// } 

// module.exports = loginUser;




const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const loginUser = async (req, res) => {
    try {
        const { Username, Password } = req.body || {};

        // Step 1: Validate request
        if (
            typeof Username !== "string" ||
            !Username.trim() ||
            typeof Password !== "string" ||
            !Password
        ) {
            return res.status(400).json({
                Error: "Please provide both Username and Password"
            });
        }

        // Step 2: Find user in database
        const user = await User.findByUsername(Username.trim());

        if (!user) {
            return res.status(401).json({
                Error: "Invalid username or password"
            });
        }

        // Step 3: Read the stored password hash
        const storedPassword = user.Password ?? user.password;

        if (
            typeof storedPassword !== "string" ||
            !storedPassword
        ) {
            console.error(
                "Login failed: stored password is missing or invalid"
            );

            return res.status(500).json({
                Error: "Unable to verify account password"
            });
        }

        // Step 4: Compare submitted password with stored hash
        const isMatch = await bcrypt.compare(
            Password,
            storedPassword
        );

        if (!isMatch) {
            return res.status(401).json({
                Error: "Invalid username or password"
            });
        }

        // Step 5: Read the user ID and username
        const userId = user.Id ?? user.id;
        const userNameVal = user.Username ?? user.username;

        if (userId == null || !userNameVal) {
            console.error(
                "Login failed: user ID or username is missing"
            );

            return res.status(500).json({
                Error: "Unable to complete login"
            });
        }

        // Step 6: Verify JWT configuration
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            console.error(
                "Login failed: JWT_SECRET is not configured"
            );

            return res.status(500).json({
                Error: "Server authentication is not configured"
            });
        }

        // Step 7: Generate authentication token
        const token = jwt.sign(
            {
                id: userId,
                Username: userNameVal
            },
            jwtSecret,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            message: "Logged In Successfully",
            token
        });

    } catch (error) {
        // Full error is recorded only in server logs.
        console.error("Login Error:", error);

        return res.status(500).json({
            Error: "Server Error during Login"
        });
    }
};

module.exports = loginUser;