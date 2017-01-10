const EventEmitter = require('events');
const Promise = require('promise');
const fs = require('fs');
const ncp = require('ncp').ncp;
ncp.limit = 16;

const WORKSPACE_DIR = __dirname + '/workspaces';
const RESOURCES_DIR = __dirname + '/resources';
const WORKSPACE_TEMPLATE_DIR = RESOURCES_DIR + '/workspace_template'; //This is the template structure for a workspace

class WorkspaceManager extends EventEmitter {
    constructor(workspaceName) {
        super();

        this.d_workspaceName = workspaceName;
        this.d_workspacePath = WORKSPACE_DIR + '/' + workspaceName;

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
                })
            }
            else {
                fulfill();
            }
        }.bind(this));
        // Ensure that the workspace is set up
    }
}

module.exports = WorkspaceManager;
