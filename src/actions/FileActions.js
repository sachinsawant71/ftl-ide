import { ActionTypes } from '../Constants';

export function loadFile(filePath) {
    return {
        type: ActionTypes.LOAD_FILE,
        filePath: filePath
    };
};

export function loadFileComplete(status, filePath, contents) {
    return {
        type: ActionTypes.LOAD_FILE_COMPLETE,
        status: status,
        filePath: filePath,
        contents: contents
    };
};

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