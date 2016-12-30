import React, { Component } from 'react';
import { Tree } from '@blueprintjs/core';
import { FileStructureTypes } from '../Constants';

class FileExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: props.nodes
        };

        this.handleNodeClick = this.handleNodeClick.bind(this);
        this.handleNodeExpand = this.handleNodeExpand.bind(this);
        this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
        this.forEachNode = this.forEachNode.bind(this);
    }

    handleNodeClick(nodeData, nodePath, e) {
        const originallySelected = nodeData.isSelected;
        this.forEachNode(this.state.nodes, (n) => n.isSelected = false);

        nodeData.isSelected = originallySelected === null ? true : !originallySelected;

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
    }

    handleNodeCollapse(nodeData) {
        nodeData.isExpanded = false;
        nodeData.iconName = 'folder-close';
        this.setState(this.state);
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