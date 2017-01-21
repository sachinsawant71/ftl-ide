import { combineReducers } from 'redux';
import WorkspaceReducer from './WorkspaceReducer';
import ActiveFileReducer from './ActiveFileReducer';
import RecentFilesReducer from './RecentFilesReducer';
import ConnectionStateReducer from './ConnectionStateReducer';
import DialogStateReducer from './DialogStateReducer';
import ActiveClientStatusReducer from './ActiveClientStatusReducer';

const rootReducer = combineReducers({
    workspace: WorkspaceReducer,
    activeFile: ActiveFileReducer,
    recentFiles: RecentFilesReducer,
    connectionState: ConnectionStateReducer,
    dialogState: DialogStateReducer,
    activeClientStatus: ActiveClientStatusReducer
});

export default rootReducer;
