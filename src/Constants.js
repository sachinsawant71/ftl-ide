const FileStructureTypes = {
    FOLDER: 'folder',
    ITEM: 'item'
};

const ActionTypes = {
    // --- File Management Related ---
    LOAD_FILE: 'LOAD_FILE', // Request to load a file
    LOAD_FILE_COMPLETE: 'LOAD_FILE_COMPLETE', // Returns the file path and contents of the file
    UPDATE_FILE: 'UPDATE_FILE', // action to update the backend file
    UPDATE_FILE_COMPLETE: 'UPDATE_FILE_COMPLETE', // File update on backend complete
    UPDATE_RECENT_FILES: 'UPDATE_RECENT_FILES', // Save recent files to local cache


    // --- Directory Tree Related --- 
    // Most of these are TBD
    FILE_STRUCTURE_UPDATED: 'FILE_STRUCTURE_UPDATED', // Action that occurs when the folder structure is updated from backend
    CREATE_NEW_FOLDER: 'CREATE_NEW_FOLDER', // Action from client side to create a new folder
    CREATE_NEW_FOLDER_COMPLETE: 'CREATE_NEW_FOLDER_COMPLETE',
    CREATE_NEW_ITEM: 'CREATE_NEW_ITEM', // Action from client side to create new item
    CREATE_NEW_ITEM_COMPLETE: 'CREATE_NEW_ITEM_COMPLETE',
    // TBD - Add FS manipulation actions

    // --- System Related ---
    CONNECTION_STATUS_UPDATED: 'CONNECTION_STATUS_UPDATED', // socket.io connection to backend status
    CLIENT_ID_UPDATED: 'CLIENT_ID_UPDATED', // Whenever we get a new client ID

    // --- Compile and Run Related ---
    BUILD_PROJECT: 'BUILD_PROJECT',
    BUILD_COMPLETE: 'BUILD_COMPLETE',
    RUN_PROJECT: 'RUN_PROJECT',
    STOP_PROJECT: 'STOP_PROJECT'
};

export { FileStructureTypes };
export { ActionTypes };
export default {
    FileStructureTypes: FileStructureTypes
};