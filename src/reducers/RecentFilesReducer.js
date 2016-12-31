import { ActionTypes } from '../Constants';

function recentFiles(state = {}, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_RECENT_FILES:
            var updateObj = Object.assign({}, state[action.filePath]);
            updateObj.contents = action.contents;
            updateObj.filePath = action.filePath;

            var updateRoot = {};
            updateRoot[action.filePath] = updateObj;

            return Object.assign({}, state, updateRoot);
        default:
            return state;
    }
}

export default recentFiles;
