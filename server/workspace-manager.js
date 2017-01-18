const EventEmitter = require('events');
const Promise = require('promise');
const fs = require('fs');
const ncp = require('ncp').ncp;
const FileUtil = require('./file-utils');
const Constants = require('./constants');

ncp.limit = 16;

const WORKSPACE_DIR = __dirname + '/workspaces';
const RESOURCES_DIR = __dirname + '/resources';
const WORKSPACE_TEMPLATE_DIR = RESOURCES_DIR + '/workspace_template'; //This is the template structure for a workspace

class WorkspaceManager extends EventEmitter {
    constructor(workspaceName, template) {
        super();

        this.d_workspaceName = workspaceName;
        this.d_workspacePath = WORKSPACE_DIR + '/' + workspaceName;
        this.d_srcPath = this.d_workspacePath + '/src';

        this.d_workspacePromise = new Promise(function (fulfill, reject) {
            if (!fs.existsSync(this.d_workspacePath)) {
                // Create the new workspace
                fs.mkdir(this.d_workspacePath, (err) => {
                    if (err) {
                        reject({
                            message: 'Could not create workspace for ' + workspaceName,
                            error: err
                        });
                    }
                    else {
                        // Start copying the templates as well
                        ncp(WORKSPACE_TEMPLATE_DIR, this.d_workspacePath, (err) => {
                            if (err) {
                                reject({
                                    message: 'Could not create workspace for ' + workspaceName,
                                    error: err
                                });
                            }
                            else {
                                fulfill();
                            }
                        })
                    }
                });
            }
            else {
                fulfill();
            }
        }.bind(this));
        // Ensure that the workspace is set up
    }

    get ready() {
        return this.d_workspacePromise;
    }

    getSourceWorkspace () {
        return this.d_workspacePromise
        .then(() => {
            return FileUtil.getFolderContents(this.d_srcPath);
        });
    }

    getFile(path) {
        return this.d_workspacePromise
        .then(() => {
            return FileUtil.loadFile(this.d_srcPath + path);
        });
    }

    updateFile(path, contents) {
        return this.d_workspacePromise
        .then(() => {
            return FileUtil.saveFile(this.d_srcPath + path, contents);
        });
    }

    addFile(path, options) {
        return this.d_workspacePromise
        .then(() => {
            return FileUtil.addFile(this.d_srcPath + path, options)
            .then(() => {
                this.emit('workspaceChanged');
            });
        });
    }

    addFolder(path) {
        return this.d_workspacePromise
        .then(() => {
            return FileUtil.addFolder(this.d_srcPath + path)
            .then(() => {
                this.emit('workspaceChanged');
            });
        });
    }
}

module.exports = WorkspaceManager;
