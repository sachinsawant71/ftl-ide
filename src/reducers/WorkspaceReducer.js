import { ActionTypes } from '../Constants';

// This contains the reducer that populates the "project files" section of the application state
function workspace(state = [], action) {
    switch (action.type) {
        case ActionTypes.WORKSPACE_UPDATED:
            return action.fileStructure.slice(0);
        default:
            return state;
    }
}

export default workspace;