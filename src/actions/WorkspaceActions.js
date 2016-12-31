import { ActionTypes } from '../Constants';
import RemoteAPI from '../api/api';

function workspaceUpdated(newFileStruct) {
    return {
        type: ActionTypes.WORKSPACE_UPDATED,
        fileStructure: newFileStruct
    }
};

export function getWorkspace() {
    return dispatch => {
        return RemoteAPI.getWorkspace()
        .then(workspaceFiles => dispatch(workspaceUpdated(workspaceFiles)));
    }
}

export { workspaceUpdated };