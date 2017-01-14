import { ActionTypes } from '../Constants';

function recentFiles(state = {}, action) {
    var updateObj, updateRoot;
    switch (action.type) {
        case ActionTypes.UPDATE_CACHED_FILE:
            updateObj = Object.assign({}, state[action.filePath]);
            updateObj.contents = action.contents;
            updateObj.filePath = action.filePath;
            updateObj.scrollInfo = action.scrollInfo;

            if (updateObj.lastSavedTime === undefined) {
                updateObj.lastSavedTime = Date.now();
            }

            if (updateObj.lastContentChangeTime === undefined) {
                updateObj.lastContentChangeTime = Date.now();
            }

            //update last content change time
            if (!action.scrollChangeEvent) {
                updateObj.lastContentChangeTime = Date.now();
            }

            updateRoot = {};
            updateRoot[action.filePath] = updateObj;

            return Object.assign({}, state, updateRoot);

        case ActionTypes.UPDATE_FILE_COMPLETE:
            updateObj = Object.assign({}, state[action.filePath]);
            if (action.status) {
                updateObj.lastSavedTime = action.timestamp;
            }

            updateRoot = {};
            updateRoot[action.filePath] = updateObj;

            return Object.assign({}, state, updateRoot);

        default:
            return state;
    }
}

export default recentFiles;
