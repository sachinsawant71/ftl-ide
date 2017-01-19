import React, { Component } from 'react';
import { FileStructureTypes } from '../Constants';
import { ContextMenuTarget, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

class FileStructureLabel extends Component {
    handleContextMenu(type, key) {
        console.log('Handling action "' + type + '" for ', key);
        if (this.props.handlers) {
            if (this.props.handlers[type]) {
                this.props.handlers[type](key);
            }
        }
    }

    renderContextMenu() {
        if (this.props.type === FileStructureTypes.FOLDER) {
            return (
                <Menu>
                    <MenuItem onClick={this.handleContextMenu.bind(this, 'addFile', this.props.labelKey)} text="Add File"/>
                    <MenuItem onClick={this.handleContextMenu.bind(this, 'addFolder', this.props.labelKey)} text="Add Folder"/>
                    <MenuDivider/>
                    <MenuItem onClick={this.handleContextMenu.bind(this, 'deleteFolder', this.props.labelKey)} text="Delete Folder"/>
                </Menu>
            )
        }
        else if (this.props.type === FileStructureTypes.WORKSPACE_ROOT) {
            return (
                <Menu>
                    <MenuItem onClick={this.handleContextMenu.bind(this, 'addFile', this.props.labelKey)} text="Add File"/>
                    <MenuItem onClick={this.handleContextMenu.bind(this, 'addFolder', this.props.labelKey)} text="Add Folder"/>
                </Menu>
            )
        }
        else {
            return (
                <Menu>
                    <MenuItem onClick={this.handleContextMenu.bind(this, 'deleteFile', this.props.labelKey)} text="Delete File"/>
                </Menu>
            )
        }
    }

    render() {
        return <div>{this.props.displayText}</div>;
    }
}

ContextMenuTarget(FileStructureLabel);

export default FileStructureLabel;
