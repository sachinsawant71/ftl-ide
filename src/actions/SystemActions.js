import { ActionTypes } from '../Constants';

export function clientIdUpdated(newId) {
    return {
        type: ActionTypes.CLIENT_ID_UPDATED,
        clientId: newId
    };
}