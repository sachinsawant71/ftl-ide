import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';
import WorkArea from './WorkArea';
import FTLNavBar from '../components/FTLNavBar';

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
        return (
            <div className="ftl-app-main">
                <FTLNavBar />
                <SplitterLayout percentage secondaryInitialSize={85} className="ftl-splitter">
                    <div>Left Side</div>
                    <SplitterLayout secondaryInitialSize={200}>
                        <WorkArea editors={this.state.editors} onEditorUpdated={this.handleEditorUpdated} />
                        <div>Right Side</div>
                    </SplitterLayout>
                </SplitterLayout>
            </div>
        );
    }
}

export default FTLApp;
