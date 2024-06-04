const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",  // Adjust this to be more restrictive based on your needs
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

let users=[]
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

 //sends the message to all the users on the server
 socket.on('message', (data) => {
  io.emit('messageResponse', data);
});

socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

socket.on('newUser',(data)=>{
  users.push(data)
  console.log(users)
  socket.emit('newUserResponse',users)
})
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit('newUserResponse',users)
    socket.disconnect();
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
