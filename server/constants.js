const WORKSPACE_DIR = __dirname + '/workspaces';
const RESOURCES_DIR = __dirname + '/resources';
const WORKSPACE_TEMPLATE_DIR = RESOURCES_DIR + '/workspace_template'; //This is the template structure for a workspace

module.exports = {
    Paths: {
        WORKSPACE_DIR: WORKSPACE_DIR,
        RESOURCES_DIR: RESOURCES_DIR,
        WORKSPACE_TEMPLATE_DIR: WORKSPACE_TEMPLATE_DIR
    },
    FileStructureTypes: {
        FOLDER: 'folder',
        ITEM: 'item'
    }
};