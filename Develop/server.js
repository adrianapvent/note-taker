const express = require("express");
const fs = require("fs");

const path = require("path");

const uuid = require("./helpers/uuid");

const util = require("util");
const readFromFile = util.promisify(fs.readFile);

const termData = require("./db/db.json");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
    console.log(`${req.method} request received to get notes`);

    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

const writeToFile = (destination, note) => {
    fs.writeFile(destination, JSON.stringify(note, null, 4), (err) =>
        err ? console.log(err) : console.info("Successfully updated Notes"));
};


const append = (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            throw err;
        } else {
            const note = JSON.parse(data);
            note.push(content);
            writeToFile(file, note);
        }
    });
};

app.route("/api/notes")
    // Grab the notes list (this should be updated for every new note and deleted note.)
    .get(function (req, res) {
        res.json(database);
    })

app.post("/api/notes", (req, res) => {
    console.log(`${req.method} request received to add a note`);

    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        append(newNote, "./db/db.json");

        const response = {
            status: "Note Created!",
            body: newNote,
        };
        res.status(201).json(response);
    } else {
        res.status(500).json("Error with note posting!");
    }
});

// app.delete("/api/notes/:id", function (req, res) {
//     let jsonFilePath = path.join(__dirname, "/db/db.json");
//     // request to delete note by id.
//     for (let i = 0; i < database.length; i++) {

//         if (database[i].id == req.params.id) {
//             // Splice takes i position, and then deletes the 1 note.
//             database.splice(i, 1);
//             break;
//         }
//     }
//     // Write the db.json file again.
//     fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

//         if (err) {
//             return console.log(err);
//         } else {
//             console.log("Your note was deleted!");
//         }
//     });
//     res.json(database);
// });


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

