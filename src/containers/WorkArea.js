import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';
import TabbedEditorView from '../components/TabbedEditorView';
import TabbedConsoleView from '../components/TabbedConsoleView';

class WorkArea extends Component {

    render() {
        return (
            <SplitterLayout vertical secondaryInitialSize={150}>
                <TabbedEditorView {...this.props}/>
                <TabbedConsoleView />
            </SplitterLayout>
        )
    }
}

export default WorkArea;