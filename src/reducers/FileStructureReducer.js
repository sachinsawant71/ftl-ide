import { ActionTypes } from '../Constants';

// This contains the reducer that populates the "project files" section of the application state
function fileStructure(state = [], action) {
    switch (action.type) {
        case ActionTypes.FILE_STRUCTURE_UPDATED:
            return action.fileStructure.slice(0);
        default:
            return state;
    }
}

export default fileStructure;