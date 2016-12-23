import React, { Component } from 'react';
import TabbedEditorView from '../components/TabbedEditorView';
import WorkArea from './WorkArea';

import 'react-tab-panel/index.css';

class FTLApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editors: [
                {
                    fileName: 'file1.js',
                    contents: 'Hello World, I am file 1'
                },
                {
                    fileName: 'file2.js',
                    contents: 'I am file 2, the best file'
                }
            ]
        }

        this.handleEditorUpdated = this.handleEditorUpdated.bind(this);
    }

    handleEditorUpdated(index, editorInfo) {
        var oldEditors = this.state.editors;
        if (oldEditors[index]) {
            oldEditors[index].contents = editorInfo.contents;
            oldEditors[index].scrollInfo = editorInfo.scrollInfo;
            oldEditors[index].selections = editorInfo.selections;
            oldEditors[index].viewport = editorInfo.viewport;
            oldEditors[index].cursor = editorInfo.cursor;
        }
        this.setState({
            editors: oldEditors
        })
    }

    render() {
        return <WorkArea editors={this.state.editors} onEditorUpdated={this.handleEditorUpdated} />
    }
}

export default FTLApp;