import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import FTLApp from './FTLApp';
import RemoteAPI from '../api/api';
import { workspaceUpdated } from '../actions/WorkspaceActions';
import { clientIdUpdated, connectionStatusUpdated } from '../actions/SystemActions';

const store = configureStore();

// Get the initial workspace
RemoteAPI.getWorkspace()
.then(function (data) {
    store.dispatch(workspaceUpdated(data));
});

// Hook up out of band events
console.log('Hooking up API events');
RemoteAPI.on('apiConnected', function () {
    store.dispatch(connectionStatusUpdated(true));
});

RemoteAPI.on('apiDisconnected', function () {
    store.dispatch(connectionStatusUpdated(false));
});

RemoteAPI.on('sessionIdUpdated', function (sessionId) {
    console.log("Got new session ID: ", sessionId);
    store.dispatch(clientIdUpdated(sessionId));
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
