import { combineReducers } from 'redux';
import WorkspaceReducer from './WorkspaceReducer';
import ActiveFileReducer from './ActiveFileReducer';
import RecentFilesReducer from './RecentFilesReducer';
import ClientIdReducer from './ClientIdReducer';

const rootReducer = combineReducers({
    workspace: WorkspaceReducer,
    activeFile: ActiveFileReducer,
    recentFiles: RecentFilesReducer,
    clientId: ClientIdReducer,
});

export default rootReducer;
