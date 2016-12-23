import React, { Component } from 'react';
import TabPanel, { TabStrip } from 'react-tab-panel';
import EditorView from './EditorView';

/**
 * A Tabbed collection of EditorView(s)
 *
 * This component serves as a pass-through for an array of
 * {@link EditorInfo} structs from a parent app
 */
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
};

TabbedEditorView.propTypes = {
    onEditorUpdated: React.PropTypes.func.isRequired,
};

export default TabbedEditorView;