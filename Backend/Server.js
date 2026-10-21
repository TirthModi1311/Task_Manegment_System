
const express = require("express");
const cors = require('cors');
const dotenv  = require("dotenv");
const db = require("./config/db");  // importing the database connection from config/db.js

const authRoutes = require("./Routes/authRoutes");  // importing the authentication routes
const TaskRoute = require("../Backend/Routes/TaskRoute")  // import the authentication route

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use("/api/auth", authRoutes);           // using the authentication routes for /api/auth endpoint
app.use("/api/tasks", TaskRoute);           // using the authentication routes for /api/tasks endpoint
           

app.get("/", (req, res)=>{
    res.send("API is running...");
});

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`); 
});