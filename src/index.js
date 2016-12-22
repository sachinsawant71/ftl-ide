import React from 'react';
import ReactDOM from 'react-dom';


import 'codemirror/lib/codemirror.css';
import './styles/app.css';

// Expt
import FTLApp from './containers/FTLApp';

var editorData = [
    {
        fileName: 'file1.js',
        contents: 'Hello World, I am file 1'
    },
    {
        fileName: 'file2.js',
        contents: 'I am file 2, the best file'
    }
];

function handleEditorUpdated(index, editorInfo) {
    if (editorData[index]) {
        editorData[index].contents = editorInfo.contents;
        editorData[index].scrollInfo = editorInfo.scrollInfo;
        editorData[index].selections = editorInfo.selections;
        editorData[index].viewport = editorInfo.viewport;
        editorData[index].cursor = editorInfo.cursor;
    }
}

ReactDOM.render(
    <FTLApp />,
    document.getElementById('root')
);