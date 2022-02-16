const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server)

// connect socket io client
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

// express app
server.listen(3000, () => {
  console.log('listening on *:3000');
});

const getVisitors = async () => {
  try { 
    let clients = await io.allSockets() // Gets a list of socket ids(set).
    console.log(clients.values())
    return clients

  } catch(err) {
    console.log(err)
    return null
  }
}

const emitVisitors = () => {
  io.emit('visitors', getVisitors())
}

// socket io(thin wrapper for server)
io.on('connection', (socket) => {
  console.log("a user connected", socket.id)
  
  emitVisitors()

  socket.on('disconnect', (reason) => {
      console.log('a user disconnected', socket.id)
      console.log(reason)
  })
})