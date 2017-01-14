import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import FTLApp from './FTLApp';
import RemoteAPI from '../api/api';
import { workspaceUpdated } from '../actions/WorkspaceActions';
import { clientIdUpdated, connectionStatusUpdated } from '../actions/SystemActions';
import { updateRemoteFile } from '../actions/FileActions';

const store = configureStore();

var s_autoSaveToken;

RemoteAPI.initialize();

// Get the initial workspace
RemoteAPI.getWorkspace()
.then(function (data) {
    store.dispatch(workspaceUpdated(data));
});

// Hook up out of band events
console.log('Hooking up API events');
RemoteAPI.on('apiConnected', function () {
    store.dispatch(connectionStatusUpdated(true));
    if (s_autoSaveToken) {
        clearInterval(s_autoSaveToken);
    }

    console.log('Setting up autosave');
    s_autoSaveToken = setInterval(() => {
        var currState = store.getState();
        var cachedFiles = currState.recentFiles;
        for (var filePath in cachedFiles) {
            if (Object.prototype.hasOwnProperty.call(cachedFiles, filePath)) {
                var currFile = cachedFiles[filePath];
                if (currFile.lastContentChangeTime > currFile.lastSavedTime) {
                    store.dispatch(updateRemoteFile(filePath, currFile.contents));
                }
            }
        }
    }, 20000);
});

RemoteAPI.on('apiDisconnected', function () {
    store.dispatch(connectionStatusUpdated(false));
    console.log('Lost connection to backend. Clearing timers');
    if (s_autoSaveToken) {
        clearInterval(s_autoSaveToken);
    }
    s_autoSaveToken = undefined;
});

RemoteAPI.on('sessionIdUpdated', function (sessionId) {
    console.log("Got new session ID: ", sessionId);
    store.dispatch(clientIdUpdated(sessionId));
});

RemoteAPI.on('workspaceUpdated', function (workspaceData) {
    store.dispatch(workspaceUpdated(workspaceData));
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
