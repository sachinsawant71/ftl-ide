import React, { Component } from 'react';
import { Tree } from '@blueprintjs/core';
import { FileStructureTypes } from '../Constants';
import { generateTreeNodes } from '../utils/FileStructureUtils';

class FileExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: generateTreeNodes(props.nodes)
        };

        this.handleNodeClick = this.handleNodeClick.bind(this);
        this.handleNodeExpand = this.handleNodeExpand.bind(this);
        this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
        this.forEachNode = this.forEachNode.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            nodes: generateTreeNodes(newProps.nodes)
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
        nodeData.isExpanded = true;
        nodeData.iconName = 'folder-open';
        this.setState(this.state);
        this.props.onWorkspaceNodeExpanded(nodeData.key);
    }

    handleNodeCollapse(nodeData) {
        nodeData.isExpanded = false;
        nodeData.iconName = 'folder-close';
        this.setState(this.state);
        this.props.onWorkspaceNodeCollapsed(nodeData.key);
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
