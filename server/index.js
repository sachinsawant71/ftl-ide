const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const SessionManager = require('./session-manager');

// TODO - Make sure that we have the appropriate directories set up

var sessionManager = new SessionManager();

io.on('connection', function (socket) {
    console.log('socket connection');
    sessionManager.createSession(socket);
});

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

console.log('Current Directory: ', __dirname);