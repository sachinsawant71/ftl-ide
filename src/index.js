import React from 'react';
import ReactDOM from 'react-dom';
import RemoteAPI from './api/api';

import '@blueprintjs/core/dist/blueprint.css';
import 'codemirror/lib/codemirror.css';
import './styles/app.css';

import Root from './containers/Root';

// Set up remote events
RemoteAPI.initialize();

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
