const express = require('express');
const app = express();
const path = require('path');
const PORT = 9000;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, './public')));

// Route for serving index.html
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'src', 'index.html'));
});
// Route for serving Collection.html
app.get('^/$|/Collection(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'src', 'Collection.html'));
});
// Route for serving Contact.html
app.get('^/$|/Contact(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'src', 'Contact.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
