const path = require('path');
const router = require('express').Router();

// ... add notes.html route to server.js
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// ... add wildcard route to server.js
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;