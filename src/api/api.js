import Promise from 'promise';

import PromiseRejectionTracking from 'promise/lib/rejection-tracking';
PromiseRejectionTracking.enable();

import Guid from 'guid';
import ee from 'event-emitter';

import IO from 'socket.io-client';

const TIMEOUT_DURATION = 2000;

class RemoteAPI {
    constructor() {
        console.log('RemoteAPI instantiated');

        this.socket = null;
        this.initialized = false;
        this.requestCallbacks = {};

        this.sessionId = null;
    }

    initialize() {
        // Create the socket and hook up events
        // TBD - Change this to just connect() once we start hosting properly
        this.socket = IO.connect('http://localhost:3001');

        this.socket.on('response', this.handleResponse.bind(this));

        // Out of band messages
        this.socket.on('registration', (newId) => {
            if (this.sessionId !== null) {
                console.warn('Already have a session ID. The server could have died. Sending recap');
            }
            else {
                console.log('Got registration: ', newId);
                this.sessionId = newId;
                this.emit('sessionIdUpdated', this.sessionId);
            }
        });

        this.socket.on('configuration', (config) => {
            // TBD - Placeholder for future config options
            this.emit('configurationChanged', config);
        });

        // Handles active client messages. Basically a pass-through
        this.socket.on('activeClient', (clientState) => {
            this.emit('activeClientUpdated', clientState);
        });

        this.socket.on('connect', () => {
            this.emit('apiConnected');
        });

        this.socket.on('disconnect', () => {
            this.emit('apiDisconnected');
        });

        this.socket.on('workspaceUpdated', (workspace) => {
            this.emit('workspaceUpdated', workspace.children);
        });

        // TBD - Additional messages

        this.initialized = true;

        console.log('RemoteAPI Initialized...');
    }

    handleResponse(response) {
        console.log('response: ', response);
        if (this.requestCallbacks[response.guid]) {
            var callback = this.requestCallbacks[response.guid];
            callback(response);
        }
    }

    // Returns a promise of a fileinfo struct
    getFile(filePath, options) {
        console.log('api.getFile: ', filePath);
        return this.sendRequest({
            type: 'loadFile',
            filePath: filePath,
            options: options
        })
        .then(function(fileInfo) {
            return {
                filePath: filePath,
                contents: fileInfo.payload.contents
            }
        })
        .catch(function(errorInfo) {
            return undefined;
        });
    }

    getWorkspace() {
        return this.sendRequest({
            type: 'getWorkspace',
        })
        .then(function (workspaceResp) {
            return workspaceResp.payload.children;
        })
        .catch(function () {
            return [];
        });
    }

    updateRemoteFile(filePath, contents) {
        return this.sendRequest({
            type: 'updateFile',
            filePath: filePath,
            contents: contents
        })
        .then(function (updateResp) {
            return {
                status: true,
                filePath: filePath
            };
        })
        .catch(function () {
            return {
                status: false,
                filePath: filePath
            };
        });
    }

    addRemoteFile(filePath, options) {
        return this.sendRequest({
            type: 'addFile',
            filePath: filePath,
            options: options
        })
        .then((updateResp) => {
            return {
                status: true,
                filePath: filePath
            }
        })
        .catch(() => {
            return {
                status: false,
                filePath: filePath
            }
        })
    }

    addRemoteFolder(folderPath) {
        return this.sendRequest({
            type: 'addFolder',
            folderPath: folderPath
        })
        .then((updateResp) => {
            return {
                status: true,
                folderPath: folderPath
            };
        })
        .catch(() => {
            return {
                status: false,
                folderPath: folderPath
            };
        });
    }

    deleteRemoteFile(filePath) {
        return this.sendRequest({
            type: 'deleteFile',
            filePath: filePath
        })
        .then(() => {
            return {
                status: true,
                filePath: filePath
            }
        })
        .catch(() => {
            return {
                status: false,
                filePath: filePath
            }
        });
    }

    deleteRemoteFolder(folderPath) {
        return this.sendRequest({
            type: 'deleteFolder',
            folderPath: folderPath
        })
        .then(() => {
            return {
                status: true,
                folderPath: folderPath
            }
        })
        .catch(() => {
            return {
                status: false,
                folderPath: folderPath
            }
        });
    }

    // The idea here is that we create a callback with the guid that will get
    // executed when we receive a response, or we timeout
    sendRequest(request) {
        return new Promise(function (fulfill, reject) {
            var reqGuid = Guid.create();
            // If we are using sockets, we emit on the 'request' topic, and wrap
            // the request in an object withe guid and payload
            var reqObj = {
                guid: reqGuid.value,
                payload: request
            };

            // Set out the timeout
            var timeoutToken = setTimeout(function() {
                reject({
                    guid: reqGuid.value,
                    payload: {
                        reason: 'Request timed out'
                    }
                });
            }, TIMEOUT_DURATION);

            // Register the callback function
            this.requestCallbacks[reqGuid.value] = function(response) {
                if (timeoutToken) {
                    clearTimeout(timeoutToken);
                    timeoutToken = undefined;
                }

                if (response.success) {
                    fulfill({
                        guid: response.guid,
                        payload: response.payload
                    });
                }
                else {
                    reject({
                        guid: response.guid,
                        payload: response.payload
                    });
                }
            };

            if (this.socket) {
                this.socket.emit('request', reqObj);
            }
            else {
                console.error('Socket not ready');
            }

        }.bind(this));
    }
}

ee(RemoteAPI.prototype);


const APIInstance = new RemoteAPI();

export default APIInstance;
