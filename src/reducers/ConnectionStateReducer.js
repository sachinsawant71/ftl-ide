import { ActionTypes } from '../Constants';

function connectionState(state = {}, action) {
    switch (action.type) {
        case ActionTypes.CLIENT_ID_UPDATED:
            return {
                ...state,
                clientId: action.clientId
            };
        case ActionTypes.CONNECTION_STATUS_UPDATED:
            return {
                ...state,
                connected: action.connected
            }
        default:
            return state;
    }
}

export default connectionState;
