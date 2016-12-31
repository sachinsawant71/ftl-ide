import { ActionTypes } from '../Constants';
import RemoteAPI from '../api/api';

function loadFile(filePath) {
    return {
        type: ActionTypes.LOAD_FILE,
        filePath: filePath
    };
};

function loadFileComplete(status, filePath, contents) {
    return {
        type: ActionTypes.LOAD_FILE_COMPLETE,
        status: status,
        filePath: filePath,
        contents: contents
    };
};

export function loadActiveFile(filePath) {
    console.log('[action] loadActiveFile: ', filePath);
    return dispatch => {
        dispatch(loadFile(filePath));
        
        return RemoteAPI.getFile(filePath)
        .then(fileInfo => dispatch(loadFileComplete(true, filePath, fileInfo.contents)))
        .catch(() => dispatch(loadFileComplete(false, undefined, undefined)));
    };
}

export function updateFile(filePath, contents) {
    return {
        type: ActionTypes.UPDATE_FILE,
        filePath: filePath,
        contents: contents
    };
};

export function updateFileComplete(status, filePath) {
    return {
        type: ActionTypes.UPDATE_FILE_COMPLETE,
        status: status,
        filePath: filePath
    };
};

export function updateRecentFiles(filePath, contents) {
    return {
        type: ActionTypes.UPDATE_RECENT_FILES,
        filePath: filePath,
        contents: contents
    };
};