import { ActionTypes } from '../Constants';

export function clientIdUpdated(newId) {
    return {
        type: ActionTypes.CLIENT_ID_UPDATED,
        clientId: newId
    };
}

export function connectionStatusUpdated(connected) {
    return {
        type: ActionTypes.CONNECTION_STATUS_UPDATED,
        connected: connected
    };
}
