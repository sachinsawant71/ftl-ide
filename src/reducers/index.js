import { combineReducers } from 'redux';
import WorkspaceReducer from './WorkspaceReducer';
import ActiveFileReducer from './ActiveFileReducer';
import RecentFilesReducer from './RecentFilesReducer';

const rootReducer = combineReducers({
    workspace: WorkspaceReducer,
    activeFile: ActiveFileReducer,
    recentFiles: RecentFilesReducer,
});

export default rootReducer;
