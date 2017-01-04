const EventEmitter = require('events');
const Promise = require('promise');

const WORKSPACE_DIR = __dirname + '/workspaces';
const RESOURCES_DIR = __dirname + '/resources';
const WORKSPACE_TEMPLATE_DIR = RESOURCES_DIR + '/workspace_template'; //This is the template structure for a workspace

class WorkspaceManager extends EventEmitter {
    constructor(workspaceName) {
        super();

        this.d_workspaceName = workspaceName;

        // Ensure that the workspace is set up
    }
}

module.exports = WorkspaceManager;