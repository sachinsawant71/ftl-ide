const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const Promise = require('promise');

const Constants = require('./constants');
const FileUtil = require('./file-utils');

const SessionManager = require('./session-manager');

// TODO - Remove from PROD
require('promise/lib/rejection-tracking').enable();

// TODO - Make sure that we have the appropriate directories set up
var workspaceCheckPromise = new Promise(function (fulfill, reject) {
    fs.access(Constants.Paths.WORKSPACE_DIR, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (!err) {
            fulfill();
        }
        else {
            // TODO: Try to create the folder. We can use existsSync here
            reject({
                message: 'Could not access workspace directory',
                error: err
            });
        }
    });
});

var templateCheckPromise = new Promise(function (fulfill, reject) {
    fs.access(Constants.Paths.WORKSPACE_TEMPLATE_DIR, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (!err) {
            fulfill();
        }
        else {
            // Here, we can just reject right away. No templates = badness
            reject({
                message: 'Could not access workspace template directory',
                error: err
            });
        }
    });
});

// TODO Perform a cleanup of the workspaces older than say, a week

workspaceCheckPromise.then(() => {
    return templateCheckPromise;
})
.then(() => {
    start();
})
.catch((err) => {
    console.log('Error: ', err);
});

function start() {
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
}

