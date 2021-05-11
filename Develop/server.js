//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//set up express
const app = express();
const PORT = process.env.PORT || 3000;

//set up data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes

fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);

    //setup notes get route
    app.get("/api/notes", (req, res) => {
        res.json(notes);
    });

    app.get("/", (req, res)=> {
        res.sendFile(path.join(__dirname, "./public/index.html")
        )}
    );
    //setup notes post route
    app.post("/api/notes", (req, res) => {
        
        const newData = req.body;
        console.log(newData);
        notes.push(newData);
       fs.writeFile('./db/db.json', notes, 'utf8', (err) =>{
           if (err) throw err;
       });
        return console.log("added new note: " + newData.title);
    });

    // display notes.html when notes is accessed
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

    //
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });
   
});




// Setup listener
app.listen(PORT, function () {
    console.log("App is listening on PORT: " + PORT);
});