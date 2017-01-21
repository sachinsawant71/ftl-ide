const EventEmitter = require('events');
const Guid = require('guid');
const Session = require('./session');

class SessionManager extends EventEmitter {
    constructor() {
        super();
        this.d_sessionMap = {};
        this.d_sessionQueue = [];
    }

    createSession(socket) {
        var session = new Session(socket);

        this.d_sessionMap[session.id] = session;
        this.d_sessionQueue.push(session);

        console.log('Session created: ', session.id);

        session.on('guidChanged', function (data) {
            delete this.d_sessionMap[data.oldGuid];
            this.d_sessionMap[data.newGuid] = session;
            // No need to change the position in the queue
        }.bind(this));

        socket.on('disconnect', function () {
            this.stopSession(session.id);
        }.bind(this));

        this.updateClientStatus();

        return session.id;
    }

    stopSession(id) {
        for (var i = 0; i < this.d_sessionQueue.length; i++) {
            if (this.d_sessionQueue[i].id === id) {
                this.d_sessionQueue.splice(i, 1);
                break;
            }
        }

        var session = this.d_sessionMap[id];
        if (session) {
            session.dispose();
            delete this.d_sessionMap[id];
            session = undefined;
        }

        this.updateClientStatus();
    }

    updateClientStatus() {
        for (var i = 0; i < this.d_sessionQueue.length; i++) {
            var session = this.d_sessionQueue[i];
            if (i === 0) {
                session.socket.emit('activeClient', {
                    isActive: true
                });
            }
            else {
                session.socket.emit('activeClient', {
                    isActive: false,
                    position: i + 1
                });
            }
        }
    }
};

module.exports = SessionManager;
