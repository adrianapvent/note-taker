const router = require('express').Router();
const notes = require('../db/db.json');
const createNewNote = require('../lib/createNotes');

router.get('/notes', (req, res) => {
    res.json(notes);
});
router.post('/notes', (req, res) => {
    const newNote = createNewNote(req.body, notes);
    res.json(newNote)
});

module.exports = router;