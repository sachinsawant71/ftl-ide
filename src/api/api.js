import Promise from 'promise';

import PromiseRejectionTracking from 'promise/lib/rejection-tracking';
PromiseRejectionTracking.enable();

import Guid from 'guid';
import ee from 'event-emitter';
import { generateTreeNodes } from '../utils/FileStructureUtils';

import IO from 'socket.io-client';

// TEST
import { TestFileStructure } from '../data/TestData'

const DEMO_FILES = {
    '/com/zhiquanyeo/robot/TestRobot.java': {
        contents: 'import * from wpilibj;',
        filePath: '/com/zhiquanyeo/robot/TestRobot.java'
    },
    '/com/zhiquanyeo/robot/SomeOtherFile.java': {
        contents: 'import * from someotherpackage;',
        filePath: '/com/zhiquanyeo/robot/SomeOtherFile.java'
    },
}

// END TEST

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
        this.socket.on('registration', function (newId) {
            if (this.sessionId !== null) {
                console.warn('Already have a session ID. The server could have died. Sending recap');
            }
            else {
                console.log('Got registration: ', newId);
                this.sessionId = newId;
                this.emit('sessionIdUpdated', this.sessionId);
            }
        }.bind(this));

        this.socket.on('connect', function () {
            this.emit('apiConnected');
        }.bind(this));

        this.socket.on('disconnect', function () {
            this.emit('apiDisconnected');
        }.bind(this));

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
            return generateTreeNodes(workspaceResp.payload.children);
        })
        .catch(function () {
            return [];
        });
    }

    updateFile(filePath, contents) {
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

            // TBD do the send here
            //this.handleRequest(reqObj);
        }.bind(this));
    }

    // DEMO ONLY
    handleRequest(request) {
        var callback;
        if (request.payload.type === 'getWorkspace') {
            if (this.requestCallbacks[request.guid]) {
                callback = this.requestCallbacks[request.guid];
                callback({
                    guid: request.guid,
                    success: true,
                    payload: TestFileStructure
                });
            }
        }
        else if (request.payload.type === 'updateFile') {
            if (this.requestCallbacks[request.guid]) {
                callback = this.requestCallbacks[request.guid];
                callback({
                    guid: request.guid,
                    success: true,
                    payload: {
                        status: true,
                        filePath: request.payload.filePath
                    }
                })
            }
        }
        else if (request.payload.type === 'loadFile') {
            if (this.requestCallbacks[request.guid]) {
                callback = this.requestCallbacks[request.guid];
                var data = DEMO_FILES[request.payload.filePath];
                if (data) {
                    callback({
                        guid: request.guid,
                        success: true,
                        payload: data
                    });
                }
                else {
                    callback({
                        guid: request.guid,
                        success: false,
                        payload: {
                            reason: 'File not found'
                        }
                    });
                }
            }
        }

    }
}

ee(RemoteAPI.prototype);


const APIInstance = new RemoteAPI();

export default APIInstance;
