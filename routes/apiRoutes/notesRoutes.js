const router = require('express').Router();
const { createNewNote, deleteNote } = require('../../lib/notes.js');
const {notes} = require('../../db/db.json');
router.get('/notes', (req, res) => {
    let saved = notes;
    res.json(saved);
});
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    let note = createNewNote(req.body, notes);
    res.json(note);
});
router.delete('/notes/:id', (req, res) => {
    deleteNote(notes, req.params.id);
    res.json(notes);
});
module.exports = router;