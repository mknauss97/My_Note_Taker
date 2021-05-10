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
module.exports = app => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

        //setup notes get route
        app.get("/api/notes", function (req, res) {
            res.json(notes);
        });

        //setup notes post route
        app.post("/api/notes", function (req, res) {
            let newData = req.body;
            notes.push(newData);
            updateDb();
            return console.log("andded new note: " + newData.title);
        });

        //retrieves note with a specified id
        app.get("/api/notes/:id", function (req, res) {
            res.json(notes[req.params.id]);
        });

        //deletes note with specific id
        app.delete("/api/notes/:id", function (req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("deleted note with the id of" + req.params.id);
        });

        // display notes.html when notes is accessed
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(_dirname, "../public/notes.html"));
        });

        //
        app.get('*', function (req, res) {
            res.sendFile(path.join(_dirname, "../public/index.html"));
        });
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '/t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}



// Setup listener
app.listen(PORT, function () {
    console.log("App is listening on PORT: " + PORT);
});