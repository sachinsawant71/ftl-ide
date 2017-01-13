import React from 'react';
import ReactDOM from 'react-dom';

import '@blueprintjs/core/dist/blueprint.css';
import 'codemirror/lib/codemirror.css';
import './styles/app.css';

import Root from './containers/Root';

// Turn this off in prod
import PromiseRejectionTracking from 'promise/lib/rejection-tracking';
PromiseRejectionTracking.enable();

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
