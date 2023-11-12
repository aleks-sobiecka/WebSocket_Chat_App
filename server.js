const express = require('express');
const db = require('./db');
const path = require('path');

const app = express();

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client')));

// show app on /
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
  });

// start server
app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });