import React, { Component } from 'react';
import TabbedEditorView from '../components/TabbedEditorView';
import TabbedConsoleView from '../components/TabbedConsoleView';
import SplitPane from 'react-split-pane';

class WorkArea extends Component {

    render() {
        return (
            <SplitPane split="horizontal" defaultSize="80%">
                <TabbedEditorView {...this.props}/>
                <TabbedConsoleView />
            </SplitPane>
        )
    }
}

export default WorkArea;
