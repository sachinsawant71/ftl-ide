import { ActionTypes } from '../Constants';

// This contains the reducer that populates the "project files" section of the application state
function activeFile(state = {}, action) {
    switch (action.type) {
        case ActionTypes.LOAD_FILE:
            console.log('handling LOAD_FILE');
            return {
                isPending: true
            };
        case ActionTypes.LOAD_FILE_COMPLETE:
            if (action.status) {
                return {
                    filePath: action.filePath,
                    contents: action.contents
                };
            }
            else {
                return {
                    isError: true,
                    reason: 'An error occured', // TBD - Better error messages
                }
            }
        default:
            return state;
    }
}

export default activeFile;