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
    return (dispatch, getState) => {
        dispatch(loadFile(filePath));

        // TBD - if we have a copy of this file already in recentFiles, use that
        var cachedFile = getState().recentFiles[filePath];
        var filePromise;
        if (cachedFile) {
            console.log('in cache: ', cachedFile);
            filePromise = Promise.resolve({
                filePath: filePath,
                contents: cachedFile.contents
            });
        }
        else {
            console.log('Not in cache');
            filePromise = RemoteAPI.getFile(filePath)
            .then(fileInfo => {
                // Cache this
                dispatch(updateCachedFile(filePath, fileInfo.contents));
                return fileInfo;
            });
        }

        return filePromise
        .then(fileInfo => dispatch(loadFileComplete(true, filePath, fileInfo.contents)))
        .catch(() => dispatch(loadFileComplete(false, undefined, undefined)));
    };
}

function updateFile(filePath, contents) {
    return {
        type: ActionTypes.UPDATE_FILE,
        filePath: filePath,
        contents: contents
    };
};

function updateFileComplete(status, filePath) {
    return {
        type: ActionTypes.UPDATE_FILE_COMPLETE,
        status: status,
        filePath: filePath
    };
};

export function updateActiveFile(filePath, contents) {
    console.log('[action] updateActiveFile');
    return dispatch => {
        dispatch(updateFile(filePath, contents));

        // Call into RemoteAPI
        return RemoteAPI.updateFile(filePath, contents)
        .then(result => dispatch(updateFileComplete(result.status, result.filePath)))
        .catch(err => dispatch(updateFileComplete(false, undefined))); // TBD Make this better
    };
}

/**
 * Update the locally cached copy of a specified file
 *
 * @method
 * @param {string} filePath File path of the file being updated
 * @param {string} contents Contents of the file being updated
 *
 * TODO: Also update viewport/scrollInfo
 */
export function updateCachedFile(filePath, contents, scrollInfo) {
    console.log('[action updateCachedFile]');
    return {
        type: ActionTypes.UPDATE_CACHED_FILE,
        filePath: filePath,
        contents: contents,
        scrollInfo: scrollInfo,
    };
};
