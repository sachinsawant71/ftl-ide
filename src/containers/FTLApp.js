import React, { Component } from 'react';
import WorkArea from './WorkArea';
import FTLNavBar from '../components/FTLNavBar';
import SplitPane from 'react-split-pane';
import SidebarView from '../components/SidebarView';

import { connect } from 'react-redux';

import { Dialog, Intent, Alert } from '@blueprintjs/core';

import { loadActiveFile, updateCachedFile } from '../actions/FileActions';
import { workspaceNodeExpanded, workspaceNodeCollapsed, workspaceNodeSelected } from '../actions/WorkspaceActions';
import { showAddFileDialog, showAddFolderDialog, showDeleteFileDialog, showDeleteFolderDialog, hideFileDialogs } from '../actions/DialogActions';

class FTLApp extends Component {
    render() {
        return (
            <div className="ftl-app-main">
                <FTLNavBar {...this.props}/>
                <SplitPane split="vertical" defaultSize="20%" minSize={200} className="ftl-splitter">
                    <SidebarView {...this.props}/>
                    <WorkArea activeFile={this.props.activeFile} onEditorUpdated={this.props.onEditorUpdated} />
                </SplitPane>

                <Dialog inline={false}
                        isOpen={this.props.dialogState.addDialogShown}
                        onClose={this.props.closeDialog}
                        title={"Add " + this.props.dialogState.addDialogType}>
                    <div className="pt-dialog-body">
                        Some content
                    </div>
                </Dialog>
                <Alert isOpen={this.props.dialogState.deleteDialogShown}
                       intent={Intent.PRIMARY}
                       confirmButtonText="Yes, delete"
                       cancelButtonText="Cancel"
                       onCancel={this.props.closeDialog}
                       onConfirm={this.props.handleDelete.bind(undefined, this.props.dialogState.deletePath)}>
                       <p>Are you sure you want to delete {this.props.dialogState.deletePath}?</p>

                </Alert>
            </div>
        );
    }
}

// TBD Implement
// This maps the redux store state into props
function mapStateToProps(state) {
    const { workspace, activeFile, clientId, connectionState, dialogState } = state; // state here represents the reducers

    return {
        clientId,
        workspace,
        activeFile,
        connectionState,
        dialogState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFileSelected: (path) => {
            console.log('onFileSelected: ', path);
            dispatch(loadActiveFile(path));
        },
        onWorkspaceNodeExpanded: (path) => {
            dispatch(workspaceNodeExpanded(path));
        },
        onWorkspaceNodeCollapsed: (path) => {
            dispatch(workspaceNodeCollapsed(path));
        },
        onWorkspaceNodeSelected: (path) => {
            dispatch(workspaceNodeSelected(path));
        },
        onEditorUpdated: (editorData, isScrollEvent) => {
            dispatch(updateCachedFile(editorData.filePath, editorData.contents, editorData.scrollInfo, isScrollEvent));
        },

        closeDialog: () => {
            dispatch(hideFileDialogs());
        },
        handleDelete: (path) => {
            console.log('Handling delete of ', path);
            // TODO - This should be a thunk that closes the dialog first, and then updates
            dispatch(hideFileDialogs());
        },
        onAddFileRequested: (path) => {
            dispatch(showAddFileDialog(path));
        },
        onAddFolderRequested: (path) => {
            dispatch(showAddFolderDialog(path));
        },
        onDeleteFileRequested: (path) => {
            console.log('delete file you say');
            dispatch(showDeleteFileDialog(path));
        },
        onDeleteFolderRequested: (path) => {
            dispatch(showDeleteFolderDialog(path));
        }
        // TODO - Dispatch events for showing/hiding the various dialogs
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FTLApp);
