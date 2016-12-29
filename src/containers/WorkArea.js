import React, { Component } from 'react';
import SingleEditorView from '../components/SingleEditorView';
import TabbedConsoleView from '../components/TabbedConsoleView';
import SplitPane from 'react-split-pane';

class WorkArea extends Component {

    render() {
        return (
            <SplitPane split="horizontal" defaultSize="80%">
                <SingleEditorView {...this.props}/>
                <TabbedConsoleView />
            </SplitPane>
        )
    }
}

export default WorkArea;
