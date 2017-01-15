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

export function workspaceNodeExpanded(path) {
    return {
        type: ActionTypes.WORKSPACE_NODE_EXPANDED,
        path: path
    };
}

export function workspaceNodeCollapsed(path) {
    return {
        type: ActionTypes.WORKSPACE_NODE_COLLAPSED,
        path: path
    };
}

export function workspaceNodeSelected(path) {
    return {
        type: ActionTypes.WORKSPACE_NODE_SELECTED,
        path: path,
    }
}

export { workspaceUpdated };
