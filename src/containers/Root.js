import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import FTLApp from './FTLApp';
import RemoteAPI from '../api/api';
import { fileStructureUpdated } from '../actions/FileStructureActions';

const store = configureStore();

console.log('Getting initial workspace');
RemoteAPI.getWorkspace()
.then(function (data) {
    console.log('Workspace data: ', data);
    store.dispatch(fileStructureUpdated(data));
})

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <FTLApp />
            </Provider>
        )
    }
}