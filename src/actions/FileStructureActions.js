import { ActionTypes } from '../Constants';

export function fileStructureUpdated(newFileStruct) {
    return {
        type: ActionTypes.FILE_STRUCTURE_UPDATED,
        fileStructure: newFileStruct
    }
};