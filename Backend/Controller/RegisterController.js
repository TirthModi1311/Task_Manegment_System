
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const registerUser = async (req, res) =>{

    try{
        const {Username, Password} = req.body;
        
        if(!Username || !Password){
            return  res.status(400).json({
                Error: 'please provide both Username and Password'
            })
        }
        const existingUser = await User.findByUsername(Username);
        if(existingUser){
            return res.status(400).json({
                Error: 'username is already taken'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const userId = await User.create(Username, hashedPassword);
        res.status(201).json({
            Message: 'User Registered successfully',
            userId: userId,
        })
    }
    catch(error){
        console.error('Registration Error:', error.message);
        res.status(500).json({
            Error:'server error during registration'
        })
    }
}

module.exports = registerUser;
