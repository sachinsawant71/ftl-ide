const EventEmitter = require('events');
const Guid = require('guid');

const WorkspaceManager = require('./workspace-manager');

class Session extends EventEmitter {
    constructor(socket, adoptedGuid) {
        super();

        if (adoptedGuid === undefined) {
            this.d_guid = Guid.create().value;
        }
        else {
            this.d_guid = adoptedGuid; // when re-capped
        }

        this.d_workspaceManager = new WorkspaceManager(this.d_guid);
        this.d_socket = socket;
        this.d_active = false;

        // Send the registration event (out of band event)
        socket.emit('registration', this.d_guid);

        socket.on('request', this.handleRequest.bind(this));

        socket.on('recap', this.handleRecap.bind(this));

        this.d_workspaceManager.on('workspaceChanged', () => {
            this.d_workspaceManager.getSourceWorkspace()
            .then((workspace) => {
                socket.emit('workspaceUpdated', workspace);
            })
        });
    }

    get id() {
        return this.d_guid;
    }

    get socket() {
        return this.d_socket;
    }

    get active() {
        return this.d_active;
    }

    set active(val) {
        this.d_active = !!val;
    }

    dispose() {

    }

    handleRecap(recap) {
        // This gets fired when this server goes down, and comes back up while a client
        // is active. We should reset the workspace (which will automatically load), and
        // change our own ID
        var oldGuid = this.d_guid;
        this.d_guid = recap.clientId;
        this.d_workspaceManager = new WorkspaceManager(this.d_guid);

        this.emit('guidChanged', {
            oldGuid: oldGuid,
            newGuid: this.d_guid
        });
    }

    handleRequest(request) {
        // { guid: <string>, payload: <obj>}
        switch (request.payload.type) {
            case 'getWorkspace': {
                this.handleGetWorkspace(request);
            } break;
            case 'loadFile': {
                this.handleLoadFile(request);
            } break;
            case 'updateFile': {
                this.handleUpdateFile(request);
            } break;
            case 'addFile': {
                this.handleAddFile(request);
            } break;
            case 'addFolder': {
                this.handleAddFolder(request);
            } break;
            case 'deleteFile': {
                this.handleDeleteFile(request);
            } break;
            case 'deleteFolder': {
                this.handleDeleteFolder(request);
            } break;
            default:
                console.warn('Unhandled request of type: ', request.payload.type);
        }
    }

    handleDeleteFile(request) {
        this.d_workspaceManager.deleteFile(request.payload.filePath)
        .then(() => {
            this.sendResponse(request.guid, true, { filePath: request.payload.filePath });
        })
        .catch(() => {
            this.sendResponse(request.guid, false, { filePath: request.payload.filePath });
        });
    }

    handleDeleteFolder(request) {
        this.d_workspaceManager.deleteFolder(request.payload.folderPath)
        .then(() => {
            this.sendResponse(request.guid, true, { folderPath: request.payload.folderPath });
        })
        .catch(() => {
            this.sendResponse(request.guid, false, { folderPath: request.payload.folderPath });
        });
    }

    handleAddFolder(request) {
        this.d_workspaceManager.addFolder(request.payload.folderPath)
        .then(() => {
            this.sendResponse(request.guid, true, { folderPath: request.payload.folderPath });
        })
        .catch(() => {
            this.sendResponse(request.guid, false, { folderPath: request.payload.folderPath });
        });
    }

    handleAddFile(request) {
        this.d_workspaceManager.addFile(request.payload.filePath, request.payload.options)
        .then(() => {
            this.sendResponse(request.guid, true, { filePath: request.payload.filePath });
        })
        .catch(() => {
            this.sendResponse(request.guid, false, { filePath: request.payload.filePath });
        });
    }

    handleUpdateFile(request) {
        this.d_workspaceManager.updateFile(request.payload.filePath, request.payload.contents)
        .then(() => {
            this.sendResponse(request.guid, true, {});
        })
        .catch(() => {
            this.sendResponse(request.guid, false, {});
        });
    }

    handleLoadFile(request) {

        this.d_workspaceManager.getFile(request.payload.filePath)
        .then((fileContents) => {
            this.sendResponse(request.guid, true, {
                filePath: request.payload.filePath,
                contents: fileContents
            });
        })
        .catch((err) => {
            this.sendResponse(request.guid, false, {
                reason: 'Could not load file ' + request.payload.filePath,
                error: err
            })
        });
    }

    handleGetWorkspace(request) {
        this.d_workspaceManager.getSourceWorkspace()
        .then((workspace) => {
            this.sendResponse(request.guid, true, workspace);
        })
        .catch((err) => {
            this.sendResponse(request.guid, false, {
                reason: 'Could not get workspace',
                error: err
            });
        });
    }

    sendResponse(requestId, success, payload) {
        this.d_socket.emit('response', {
            guid: requestId,
            success: success,
            payload: payload
        });
    }
}

module.exports = Session;
