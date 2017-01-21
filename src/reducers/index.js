import { combineReducers } from 'redux';
import WorkspaceReducer from './WorkspaceReducer';
import ActiveFileReducer from './ActiveFileReducer';
import RecentFilesReducer from './RecentFilesReducer';
import ConnectionStateReducer from './ConnectionStateReducer';
import DialogStateReducer from './DialogStateReducer';
import ActiveClientStatusReducer from './ActiveClientStatusReducer';
import ProjectStateReducer from './ProjectStateReducer';

const rootReducer = combineReducers({
    workspace: WorkspaceReducer,
    activeFile: ActiveFileReducer,
    recentFiles: RecentFilesReducer,
    connectionState: ConnectionStateReducer,
    dialogState: DialogStateReducer,
    activeClientStatus: ActiveClientStatusReducer,
    projectStatus: ProjectStateReducer
});

export default rootReducer;
