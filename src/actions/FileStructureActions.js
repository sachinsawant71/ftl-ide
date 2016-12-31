import { ActionTypes } from '../Constants';
import RemoteAPI from '../api/api';

function fileStructureUpdated(newFileStruct) {
    return {
        type: ActionTypes.FILE_STRUCTURE_UPDATED,
        fileStructure: newFileStruct
    }
};

export function getWorkspace() {
    return dispatch => {
        return RemoteAPI.getWorkspace()
        .then(workspaceFiles => dispatch(fileStructureUpdated(workspaceFiles)));
    }
}

export { fileStructureUpdated };