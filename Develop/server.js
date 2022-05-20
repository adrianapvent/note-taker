const express = require("express");
const fs = require("fs");
const uuid = require("./helpers/uuid");

const path = require("path");

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
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});


const writeToFile = (desination, note) => {
    fs.writeFile(desination, JSON.stringify(note, null, 4), (err) =>
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

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

