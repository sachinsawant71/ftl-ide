import { ActionTypes } from '../Constants';

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
