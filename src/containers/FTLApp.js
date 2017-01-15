import React, { Component } from 'react';
import WorkArea from './WorkArea';
import FTLNavBar from '../components/FTLNavBar';
import SplitPane from 'react-split-pane';
import SidebarView from '../components/SidebarView';

import { connect } from 'react-redux';

import { loadActiveFile, updateCachedFile } from '../actions/FileActions';
import { workspaceNodeExpanded, workspaceNodeCollapsed, workspaceNodeSelected } from '../actions/WorkspaceActions';

class FTLApp extends Component {
    render() {
        return (
            <div className="ftl-app-main">
                <FTLNavBar {...this.props}/>
                <SplitPane split="vertical" defaultSize="20%" minSize={200} className="ftl-splitter">
                    <SidebarView {...this.props}/>
                    <WorkArea activeFile={this.props.activeFile} onEditorUpdated={this.props.onEditorUpdated} />
                </SplitPane>
            </div>
        );
    }
}

// TBD Implement
// This maps the redux store state into props
function mapStateToProps(state) {
    const { workspace, activeFile, clientId, connectionState } = state; // state here represents the reducers

    return {
        clientId,
        workspace,
        activeFile,
        connectionState
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
            // TBD - Dispatch updated to saveFile and saveRecent
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FTLApp);
