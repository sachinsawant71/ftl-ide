import React, { Component } from 'react';
import EditorView from './EditorView';
import FilePathView from './FilePathView';

class SingleEditorView extends Component {
    constructor(props) {
        super(props);

        this.handleEditorUpdated = this.handleEditorUpdated.bind(this);
    }

    handleEditorUpdated(editorState) {
        this.props.onEditorUpdated(0, editorState);
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
                                onStateUpdated={this.handleEditorUpdated}
                    />
                </div>
            </div>
        )
    }
};

export default SingleEditorView;