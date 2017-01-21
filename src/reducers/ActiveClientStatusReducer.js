import { ActionTypes } from '../Constants';

function activeClientStatus(state = { isActive: false }, action) {
    switch (action.type) {
        case ActionTypes.CLIENT_SET_ACTIVE:
            return {
                isActive: true
            }
        case ActionTypes.CLIENT_SET_INACTIVE:
            return {
                isActive: false,
                position: action.position
            }
        default:
            return state;
    }
}

export default activeClientStatus;
