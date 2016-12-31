import { combineReducers } from 'redux';
import FileStructureReducer from './FileStructureReducer';
import ActiveFileReducer from './ActiveFileReducer';

const rootReducer = combineReducers({
    workspace: FileStructureReducer,
    activeFile: ActiveFileReducer
});

export default rootReducer;