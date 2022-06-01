const path = require('path');
const router = require('express').Router();
// ... add index.html route to server.js
/* router.get('/', (req, res) => {
    // ...unlike most GET and POST routes that deal with creating or return JSON data,
    // ...this GET route has just one job to do, and
    // ...that is to respond with an HTML page to display in the browser.
    res.sendFile(path.join(__dirname, '../../public/index.html'));
}); */
// ... add notes.html route to server.js
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});
/* router.get('/assets/css/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/assets/css/styles.css'));
}) */
// ... add a wildcard route to server.js (in case of a route that doesn't exist)
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
module.exports = router;