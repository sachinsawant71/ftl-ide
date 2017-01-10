const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const Promise = require('promise');

const SessionManager = require('./session-manager');

// TODO - These should all go into a constants file
const WORKSPACE_DIR = __dirname + '/workspaces';
const RESOURCES_DIR = __dirname + '/resources';
const WORKSPACE_TEMPLATE_DIR = RESOURCES_DIR + '/workspace_template'; //This is the template structure for a workspace

// TODO - Make sure that we have the appropriate directories set up
var workspaceCheckPromise = new Promise(function (fulfill, reject) {
    fs.access(WORKSPACE_DIR, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (!err) {
            fulfill();
        }
        else {
            reject({
                message: 'Could not access workspace directory',
                error: err
            });
        }
    });
});

var templateCheckPromise = new Promise(function (fulfill, reject) {
    fs.access(WORKSPACE_TEMPLATE_DIR, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (!err) {
            fulfill();
        }
        else {
            reject({
                message: 'Could not access workspace template directory',
                error: err
            });
        }
    });
});

workspaceCheckPromise.then(() => {
    return templateCheckPromise;
})
.then(() => {
    console.log('All good');
})
.catch((err) => {
    console.log('Error: ', err);
});


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
