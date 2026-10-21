
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const loginUser = async (req, res)=>{
    try{
        const {Username, Password} = req.body;

        if (!Username || !Password) {
            return res.status(400).json({
                Error: 'Please Provide both Username and Password'
            })
        }
        const user = await User.findByUsername(Username)

        if(!user){
            return res.status(400).json({
                Error: 'Invalid Credential or Unauthorized Access'
            })
        }

        const storedPassword = user.Password ||user.password
        const isMatch = await bcrypt.compare(Password, storedPassword);

        if(!isMatch){
            return res.status(400).json({
                Error: 'Invalid Credential or Unauthorized Access'
            })
        }
        const userId = user.Id || User.Id;
        const userNameVal = user.Username || user.Username;

        const token = jwt.sign(
            {id:userId, Username: userNameVal},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.json({
            message: "Logged In Successfully",
            token: token,
        })
    }
    catch(error){
        console.error('Login Error:', error.message);
        res.status(500).json({
            Error:"Server Error during Login"
        })
    }
} 

module.exports = loginUser;