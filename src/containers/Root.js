import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import FTLApp from './FTLApp';
import RemoteAPI from '../api/api';
import { workspaceUpdated } from '../actions/WorkspaceActions';

const store = configureStore();

// Get the initial workspace
RemoteAPI.getWorkspace()
.then(function (data) {
    store.dispatch(workspaceUpdated(data));
});

RemoteAPI.on('workspaceUpdated', function (workspaceData) {

});

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <FTLApp />
            </Provider>
        )
    }
}