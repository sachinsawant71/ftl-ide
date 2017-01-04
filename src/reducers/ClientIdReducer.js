import { ActionTypes } from '../Constants';

// This contains the reducer that populates the "project files" section of the application state
function clientId(state = '', action) {
    switch (action.type) {
        case ActionTypes.CLIENT_ID_UPDATED:
            return action.clientId;
        default:
            return state;
    }
}

export default clientId;