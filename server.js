const express = require('express');

const app = express();


// start server
app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });