let connected = [];

const PORT = 3000;

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  connected.push(socket);
  console.log(`A user connected ${socket}. There are ${connected.length}`);
  
  socket.on('disconnect', data => {
    connected.slice(connected.indexOf(data), 1);
    console.log(`A user disconnected ${data}. There are ${connected.length}`);
  });

  socket.on('chat message', m => {
    console.log(`message: ${m}`);
    io.emit('chat message', m);
  });
})

http.listen(PORT, _ => {
  console.log(`CONNECTED on PORT: ${PORT}`);
})