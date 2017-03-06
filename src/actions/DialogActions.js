import { ActionTypes, FSActions } from '../Constants';

export function showAddFileDialog(basePath) {
    return {
        type: ActionTypes.SHOW_ADD_FILE_DIALOG,
        basePath: basePath
    }
}

export function showAddFolderDialog(basePath) {
    return {
        type: ActionTypes.SHOW_ADD_FOLDER_DIALOG,
        basePath: basePath
    }
}

export function showDeleteFileDialog(basePath) {
    return {
        type: ActionTypes.SHOW_DELETE_FILE_DIALOG,
        basePath: basePath
    }
}

export function showDeleteFolderDialog(basePath) {
    return {
        type: ActionTypes.SHOW_DELETE_FOLDER_DIALOG,
        basePath: basePath
    }
}

export function hideFileDialogs() {
    return {
        type: ActionTypes.HIDE_FILE_DIALOGS
    }
}

export function showFileSystemErrorDialog(basePath, attemptedAction, errorMessage) {
    var errActionMsg = 'There was a problem ';
    switch (attemptedAction) {
        case FSActions.FS_ADD_FILE:
            errActionMsg += 'adding the file ';
            break;
        case FSActions.FS_ADD_FOLDER:
            errActionMsg += 'adding the folder ';
            break;
        default:
            errActionMsg += 'with ';
    }
    errActionMsg += basePath;

    return {
        type: ActionTypes.SHOW_FS_ERROR_DIALOG,
        actionMessage: errActionMsg,
        errorMessage: errorMessage
    }
}