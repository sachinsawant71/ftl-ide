import React, { Component } from 'react';
import EditorView from './EditorView';
import FilePathView from './FilePathView';

/**
 * A Single CodeMirror based editor window
 *
 * This component provides a breadcrumb based file path view, and an
 * EditorView component. This represents the currently active file
 */
class SingleEditorView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var filepath;
        if (this.props.activeFile) {
            filepath = this.props.activeFile.filePath;
        }

        return (
            <div className="ftl-single-editor">
                <FilePathView filePath={filepath} />
                <div className="ftl-editor-host">
                    <EditorView id="active-editor"
                                editorInfo={this.props.activeFile}
                                onStateUpdated={this.props.onEditorUpdated}
                    />
                </div>
            </div>
        )
    }
};

export default SingleEditorView;