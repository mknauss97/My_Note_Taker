//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { PRIORITY_ABOVE_NORMAL } = require("constants");

//set up express
const app = express();
const PORT = process.env.PORT || 3000;

//set up data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Routes




// Setup listener
app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});