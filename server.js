const express = require('express');
const db = require('./db');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client')));

// show app on /
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
  });

// start server
/* app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  }); */
const server = app.listen(8000, () => {
    console.log('Server is running on Port:', 8000)
  });

//integrate socet with server
const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('join', (login) => {
      const newUser = {};
      newUser.name = login;
      newUser.id = socket.id;
      //add newUser to the array
      users.push(newUser);
      console.log('Available users list: ',users);
    });
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        //add message to the array
        messages.push(message);
        //emitt message to other sockets
        socket.broadcast.emit('message', message);
      });
    socket.on('disconnect', () => { 
      console.log('Oh, socket ' + socket.id + ' has left');
      for (let user of users){
        if (user.id = socket.id ){
          const index = users.indexOf(user);
          //delete user from the array
          users.splice(index,1);
          io.emit('logout', user.name);
        }
      }
      console.log('Available users list: ',users);
    });

  });