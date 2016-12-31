import { combineReducers } from 'redux';
import WorkspaceReducer from './WorkspaceReducer';
import ActiveFileReducer from './ActiveFileReducer';

const rootReducer = combineReducers({
    workspace: WorkspaceReducer,
    activeFile: ActiveFileReducer
});

export default rootReducer;