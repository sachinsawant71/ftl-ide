import React, { Component } from 'react';
import WorkArea from './WorkArea';
import FTLNavBar from '../components/FTLNavBar';
import SplitPane from 'react-split-pane';
import SidebarView from '../components/SidebarView';

import { connect } from 'react-redux';

import { Dialog, Intent, Alert, Button } from '@blueprintjs/core';

import { loadActiveFile, updateCachedFile, addNewFile, addNewFolder, deleteFile, deleteFolder } from '../actions/FileActions';
import { workspaceNodeExpanded, workspaceNodeCollapsed, workspaceNodeSelected } from '../actions/WorkspaceActions';
import { showAddFileDialog, showAddFolderDialog, showDeleteFileDialog, showDeleteFolderDialog, hideFileDialogs } from '../actions/DialogActions';

function toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

class FTLApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newEntityName: ''
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.dialogState.addDialogShown && this.props.dialogState.addDialogShown) {
            if (this.refs.newName) {
                this.refs.newName.focus();
            }
        }
    }

    handleNewEntityNameChange(e) {
        this.setState({
            newEntityName: e.target.value
        });
    }

    // We only need this here so we can set the state
    handleAddNewEntity(type, basePath, newName) {
        this.props.handleAdd(type, basePath, newName);

        this.setState({
            newEntityName: ''
        });
    }

    render() {
        var addDialogStr = this.props.dialogState.addDialogType ?
                           toTitleCase(this.props.dialogState.addDialogType) : '';

        return (
            <div className="ftl-app-main">
                <FTLNavBar {...this.props}/>
                <SplitPane split="vertical" defaultSize="20%" minSize={200} className="ftl-splitter">
                    <SidebarView {...this.props}/>
                    <WorkArea activeFile={this.props.activeFile} onEditorUpdated={this.props.onEditorUpdated} />
                </SplitPane>

                <Dialog inline={false}
                        iconName="add"
                        isOpen={this.props.dialogState.addDialogShown}
                        canOutsideClickClose={false}
                        onClose={this.props.closeDialog}
                        title={"Add " + addDialogStr}>
                    <div className="pt-dialog-body">
                        <p>{addDialogStr + " Name: "}</p>
                        <input ref="newName" onChange={this.handleNewEntityNameChange.bind(this)} className="pt-input pt-intent-primary pt-fill" type="text"/>
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button onClick={this.props.closeDialog}
                                    text="Cancel" />
                            <Button intent={Intent.PRIMARY}
                                    onClick={this.handleAddNewEntity.bind(this,
                                                        this.props.dialogState.addDialogType,
                                                        this.props.dialogState.addPath,
                                                        this.state.newEntityName)}
                                    text="Add"/>
                        </div>
                    </div>
                </Dialog>
                <Alert isOpen={this.props.dialogState.deleteDialogShown}
                       intent={Intent.PRIMARY}
                       iconName='trash'
                       confirmButtonText="Yes, delete"
                       cancelButtonText="Cancel"
                       onCancel={this.props.closeDialog}
                       onConfirm={this.props.handleDelete.bind(undefined,
                                            this.props.dialogState.deleteDialogType,
                                            this.props.dialogState.deletePath)}>
                       <p>Are you sure you want to delete {this.props.dialogState.deletePath}?</p>

                </Alert>

                <Alert isOpen={this.props.dialogState.errorDialogShown}
                       intent={Intent.DANGER}
                       iconName='error'
                       confirmButtonTest='OK'
                       onConfirm={this.props.closeDialog}>
                       <p>{this.props.dialogState.errorActionMessage}</p>
                       <p>{this.props.dialogState.errorMessage}</p>
                </Alert>
            </div>
        );
    }
}

// TBD Implement
// This maps the redux store state into props
function mapStateToProps(state) {
    const { workspace,
            activeFile,
            clientId,
            connectionState,
            dialogState,
            activeClientStatus,
            projectStatus } = state; // state here represents the reducers

    return {
        clientId,
        workspace,
        activeFile,
        connectionState,
        dialogState,
        activeClientStatus,
        projectStatus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFileSelected: (path) => {
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
        handleAdd: (type, basePath, newName) => {
            if (type === 'FOLDER') {
                dispatch(addNewFolder(basePath + '/' + newName));
            }
            else if (type === 'FILE') {
                dispatch(addNewFile(basePath + '/' + newName));
            }
            else {
                dispatch(hideFileDialogs());
            }
        },
        handleDelete: (type, path) => {
            if (type === 'FOLDER') {
                dispatch(deleteFolder(path));
            }
            else if (type === 'FILE') {
                dispatch(deleteFile(path));
            }
            else {
                dispatch(hideFileDialogs());
            }
        },
        onAddFileRequested: (path) => {
            dispatch(showAddFileDialog(path));
        },
        onAddFolderRequested: (path) => {
            dispatch(showAddFolderDialog(path));
        },
        onDeleteFileRequested: (path) => {
            dispatch(showDeleteFileDialog(path));
        },
        onDeleteFolderRequested: (path) => {
            dispatch(showDeleteFolderDialog(path));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FTLApp);
