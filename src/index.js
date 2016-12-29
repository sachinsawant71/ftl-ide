import React from 'react';
import ReactDOM from 'react-dom';


import '@blueprintjs/core/dist/blueprint.css';
import 'codemirror/lib/codemirror.css';
import './styles/app.css';

// Expt
import FTLApp from './containers/FTLApp';

ReactDOM.render(
    <FTLApp />,
    document.getElementById('root')
);
