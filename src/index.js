import React from 'react';
import ReactDOM from 'react-dom';


import 'codemirror/lib/codemirror.css';
import './styles/app.css';
import './styles/bootstrap/css/bootstrap.min.css';

// Expt
import FTLApp from './containers/FTLApp';

ReactDOM.render(
    <FTLApp />,
    document.getElementById('root')
);
