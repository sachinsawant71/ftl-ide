import { ActionTypes } from '../Constants';

function projectStatus(state = { isBuilding: false, isRunning: false }, action) {
    switch (action.type) {
        case ActionTypes.BUILD_PROJECT:
            return {
                isBuilding: true,
                isRunning: false
            };
        case ActionTypes.BUILD_COMPLETE:
            return {
                isBuilding: false,
                isRunning: false
            };
        case ActionTypes.RUN_PROJECT:
            return {
                isBuilding: false,
                isRunning: true
            };
        case ActionTypes.STOP_PROJECT:
            return {
                isBuilding: false,
                isRunning: false
            }
        default:
            return state;
    }
}


export default projectStatus;
