import React, { Component } from 'react';
import TabPanel, { TabStrip } from 'react-tab-panel';
import EditorView from './EditorView';
import 'react-tab-panel/index.css'


// A Tabbed Collection of Editors
class TabbedEditorView extends Component {

    handleEditorUpdated(index, editorState) {
        this.props.onEditorUpdated(index, editorState);
    }

    render() {
        return (
            <TabPanel>
            {
                this.props.editors.map((editorInfo, i) => (
                    <EditorView key={'editor-' + i} id={'editor-' + i}
                                editorInfo={editorInfo}
                                onStateUpdated={this.handleEditorUpdated.bind(this, i)}
                                tabTitle={editorInfo.fileName} />
                ))
            }
            </TabPanel>
            
        );
    }
}

export default TabbedEditorView;