const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require("path");
const movie_routes = require("./routes/movie_routes");
const cors = require("cors");
const connectDB = require('./db/db');

connectDB();
// app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json({extended: false}));

app.use("/", express.static(path.join(__dirname, "angular")))

//can use this insted of cors package
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PATCH, OPTIONS"
    );
    next();   //pass on to next middleware
})  

app.use("/api",movie_routes);
app.use((req,res,next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"))
})

module.exports = app;
