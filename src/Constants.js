const FileStructureTypes = {
    FOLDER: 'folder',
    ITEM: 'item',
    WORKSPACE_ROOT: 'workspace_root'
};

const FSActions = {
    FS_ADD_FILE: 'FS_ADD_FILE',
    FS_ADD_FOLDER: 'FS_ADD_FOLDER'
};

const ActionTypes = {
    // --- File Management Related ---
    LOAD_FILE: 'LOAD_FILE', // Request to load a file
    LOAD_FILE_COMPLETE: 'LOAD_FILE_COMPLETE', // Returns the file path and contents of the file
    UPDATE_FILE: 'UPDATE_FILE', // action to update the backend file
    UPDATE_FILE_COMPLETE: 'UPDATE_FILE_COMPLETE', // File update on backend complete
    UPDATE_CACHED_FILE: 'UPDATE_CACHED_FILE', // Save recent files to local cache


    // --- Directory Tree Related ---
    // Most of these are TBD
    WORKSPACE_UPDATED: 'WORKSPACE_UPDATED', // Action that occurs when the folder structure is updated from backend
    WORKSPACE_NODE_EXPANDED: 'WORKSPACE_NODE_EXPANDED',
    WORKSPACE_NODE_COLLAPSED: 'WORKSPACE_NODE_COLLAPSED',
    WORKSPACE_NODE_SELECTED: 'WORKSPACE_NODE_SELECTED',
    CREATE_NEW_FOLDER: 'CREATE_NEW_FOLDER', // Action from client side to create a new folder
    CREATE_NEW_FOLDER_COMPLETE: 'CREATE_NEW_FOLDER_COMPLETE',
    CREATE_NEW_ITEM: 'CREATE_NEW_ITEM', // Action from client side to create new item
    CREATE_NEW_ITEM_COMPLETE: 'CREATE_NEW_ITEM_COMPLETE',
    // TBD - Add FS manipulation actions

    // --- System Related ---
    CONNECTION_STATUS_UPDATED: 'CONNECTION_STATUS_UPDATED', // socket.io connection to backend status
    CLIENT_ID_UPDATED: 'CLIENT_ID_UPDATED', // Whenever we get a new client ID
    CLIENT_SET_ACTIVE: 'CLIENT_SET_ACTIVE',
    CLIENT_SET_INACTIVE: 'CLIENT_SET_INACTIVE',

    // --- UI Dialog/Alert related ---
    HIDE_FILE_DIALOGS: 'HIDE_FILE_DIALOGS',
    SHOW_ADD_FILE_DIALOG: 'SHOW_ADD_FILE_DIALOG',
    SHOW_ADD_FOLDER_DIALOG: 'SHOW_ADD_FOLDER_DIALOG',
    SHOW_DELETE_FOLDER_DIALOG: 'SHOW_DELETE_FOLDER_DIALOG',
    SHOW_DELETE_FILE_DIALOG: 'SHOW_DELETE_FILE_DIALOG',
    SHOW_FS_ERROR_DIALOG: 'SHOW_FS_ERROR_DIALOG',

    // --- Compile and Run Related ---
    BUILD_PROJECT: 'BUILD_PROJECT',
    BUILD_COMPLETE: 'BUILD_COMPLETE',
    RUN_PROJECT: 'RUN_PROJECT',
    STOP_PROJECT: 'STOP_PROJECT'
};

export { FileStructureTypes };
export { ActionTypes };
export { FSActions };
export default {
    FileStructureTypes: FileStructureTypes
};
