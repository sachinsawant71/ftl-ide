import { combineReducers } from 'redux';
import WorkspaceReducer from './WorkspaceReducer';
import ActiveFileReducer from './ActiveFileReducer';
import RecentFilesReducer from './RecentFilesReducer';
import ConnectionStateReducer from './ConnectionStateReducer';
import DialogStateReducer from './DialogStateReducer';

const rootReducer = combineReducers({
    workspace: WorkspaceReducer,
    activeFile: ActiveFileReducer,
    recentFiles: RecentFilesReducer,
    connectionState: ConnectionStateReducer,
    dialogState: DialogStateReducer,
});

export default rootReducer;
