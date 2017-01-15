import React, { Component } from 'react';
import { FileStructureTypes } from '../Constants';
import { Tooltip, ContextMenuTarget, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

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
        else {
            return (
                <Menu>
                    <MenuItem onClick={this.handleContextMenu.bind(this, 'deleteFolder', this.props.labelKey)} text="Delete File"/>
                </Menu>
            )
        }
    }

    render() {
        return <div>{this.props.displayText}</div>;
    }
}

ContextMenuTarget(FileStructureLabel);

function makeFolder(def, path, handlers) {
    var folderLabel = (
        <Tooltip content={def.label}>
            <FileStructureLabel labelKey={path + '/' + def.label} displayText={def.label} type={FileStructureTypes.FOLDER} handlers={handlers}/>
        </Tooltip>
    );

    var ret = {
        iconName: def.isExpanded ? 'folder-open' : 'folder-close',
        isExpanded: !!def.isExpanded,
        hasCaret: true,
        label: folderLabel,
        key: path + '/' + def.label,
        type: FileStructureTypes.FOLDER,
        childNodes: []
    }

    if (def.children) {
        for (var i = 0; i < def.children.length; i++) {
            var childItem = def.children[i];
            if (childItem.type === FileStructureTypes.FOLDER) {
                ret.childNodes.push(makeFolder(childItem, path + '/' + def.label));
            }
            else if (childItem.type === FileStructureTypes.ITEM) {
                ret.childNodes.push(makeItem(childItem, path + '/' + def.label));
            }
        }
    }

    return ret;
}

function makeItem(def, path, handlers) {
    var itemLabel = (
        <Tooltip content={def.label}>
            <FileStructureLabel labelKey={path + '/' + def.label} displayText={def.label} type={FileStructureTypes.ITEM} handlers={handlers}/>
        </Tooltip>
    );

    return {
        iconName: 'document',
        label: itemLabel,
        key: path + '/' + def.label,
        type: FileStructureTypes.ITEM
    }
}

function generateTreeNodes(rootList, handlers) {
    var ret = [];
    for (var i = 0; i < rootList.length; i++) {
        var currItem = rootList[i];
        if (currItem.type === FileStructureTypes.FOLDER) {
            ret.push(makeFolder(currItem, '', handlers));
        }
        else if (currItem.type === FileStructureTypes.ITEM) {
            ret.push(makeItem(currItem, '', handlers));
        }
    }

    return ret;
}

export { generateTreeNodes };
export default {
    generateTreeNodes: generateTreeNodes,
}
