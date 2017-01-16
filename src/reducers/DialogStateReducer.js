import { ActionTypes } from '../Constants';

function dialogState(state = {}, action) {
    switch (action.type) {
        case ActionTypes.SHOW_ADD_FILE_DIALOG:
            return {
                addDialogShown: true,
                addDialogType: 'FILE',
                addPath: action.basePath
            }

        case ActionTypes.SHOW_ADD_FOLDER_DIALOG:
            return {
                addDialogShown: true,
                addDialogType: 'FOLDER',
                addPath: action.basePath
            };

        case ActionTypes.SHOW_DELETE_FILE_DIALOG:
            return {
                deleteDialogShown: true,
                deleteDialogType: 'FILE',
                deletePath: action.basePath
            };

        case ActionTypes.SHOW_DELETE_FOLDER_DIALOG:
            return {
                deleteDialogShown: true,
                deleteDialogType: 'FOLDER',
                deletePath: action.basePath
            };

        case ActionTypes.HIDE_FILE_DIALOGS:
            return {};

        default:
            return state;
    }
}

export default dialogState;
