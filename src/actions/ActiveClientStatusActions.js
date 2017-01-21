import { ActionTypes } from '../Constants';

export function clientSetActive() {
    return {
        type: ActionTypes.CLIENT_SET_ACTIVE
    }
}

export function clientSetInactive(position) {
    return {
        type: ActionTypes.CLIENT_SET_INACTIVE,
        position: position
    }
}
