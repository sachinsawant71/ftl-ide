import React, { Component } from 'react';
import { Tree, Tooltip } from '@blueprintjs/core';
import FileStructureLabel from './FileStructureLabel';
import { FileStructureTypes } from '../Constants';
import { generateTreeNodes } from '../utils/FileStructureUtils';

// TODO - Pass a set of handlers into generateTreeNodes() to dispatch dialog actions

class FileExplorer extends Component {
    constructor(props) {
        super(props);

        var handlers = {
            addFile: props.onAddFileRequested,
            addFolder: props.onAddFolderRequested,
            deleteFile: props.onDeleteFileRequested,
            deleteFolder: props.onDeleteFolderRequested
        };

        var rootLabel = (
            <Tooltip content="Robot Project">
                <FileStructureLabel labelKey="/" 
                                    displayText="Robot Project" 
                                    type={FileStructureTypes.WORKSPACE_ROOT} 
                                    handlers={handlers}/>
            </Tooltip>
        );
        var workspaceNodes = generateTreeNodes(props.workspace, handlers);

        var rootNode = {
            iconName: 'projects',
            label: rootLabel,
            key: '/',
            type: FileStructureTypes.WORKSPACE_ROOT,
            childNodes: workspaceNodes,
            isExpanded: true,
        };

        this.state = {
            nodes: [rootNode]
        }

        this.handleNodeClick = this.handleNodeClick.bind(this);
        this.handleNodeExpand = this.handleNodeExpand.bind(this);
        this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
        this.forEachNode = this.forEachNode.bind(this);
    }

    componentWillReceiveProps(newProps) {
        var handlers = {
            addFile: newProps.onAddFileRequested,
            addFolder: newProps.onAddFolderRequested,
            deleteFile: newProps.onDeleteFileRequested,
            deleteFolder: newProps.onDeleteFolderRequested
        };

        var rootLabel = (
            <Tooltip content="Robot Project">
                <FileStructureLabel labelKey="/" 
                                    displayText="Robot Project" 
                                    type={FileStructureTypes.WORKSPACE_ROOT} 
                                    handlers={handlers}/>
            </Tooltip>
        );

        var workspaceNodes = generateTreeNodes(newProps.workspace, handlers);

        var rootNode = {
            iconName: 'projects',
            label: rootLabel,
            key: '/',
            type: FileStructureTypes.WORKSPACE_ROOT,
            childNodes: workspaceNodes,
            isExpanded: true,
        };

        this.setState({
            nodes: [rootNode]
        });
    }

    handleNodeClick(nodeData, nodePath, e) {
        const originallySelected = nodeData.isSelected;
        this.forEachNode(this.state.nodes, (n) => n.isSelected = false);

        nodeData.isSelected = originallySelected === null ? true : !originallySelected;

        if (nodeData.isSelected) {
            this.props.onWorkspaceNodeSelected(nodeData.key);
        }
        else {
            this.props.onWorkspaceNodeSelected(null);
        }

        if (nodeData.type === FileStructureTypes.ITEM) {
            // key is the path
            this.props.onFileSelected(nodeData.key);
        }

        this.setState(this.state);
    }

    handleNodeExpand(nodeData) {
        console.log('nodeData: ', nodeData);
        if (nodeData.type === FileStructureTypes.FOLDER) {
            nodeData.isExpanded = true;
            nodeData.iconName = 'folder-open';
            this.setState(this.state);
            this.props.onWorkspaceNodeExpanded(nodeData.key);
        }
    }

    handleNodeCollapse(nodeData) {
        if (nodeData.type === FileStructureTypes.FOLDER) {
            nodeData.isExpanded = false;
            nodeData.iconName = 'folder-close';
            this.setState(this.state);
            this.props.onWorkspaceNodeCollapsed(nodeData.key);
        }
    }

    forEachNode(nodes, callback) {
        if (!nodes) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            this.forEachNode(node.childNodes, callback);
        }
    }

    render() {
        return <Tree contents={this.state.nodes}
                     onNodeClick={this.handleNodeClick}
                     onNodeCollapse={this.handleNodeCollapse}
                     onNodeExpand={this.handleNodeExpand}/>
    }
};

export default FileExplorer;
