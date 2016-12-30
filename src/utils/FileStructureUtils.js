import { FileStructureTypes } from '../Constants';

function makeFolder(def, path) {
    var ret = {
        iconName: def.isExpanded ? 'folder-open' : 'folder-close',
        isExpanded: !!def.isExpanded,
        hasCaret: true,
        label: def.label,
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

function makeItem(def, path) {
    return {
        iconName: 'document',
        label: def.label,
        key: path + '/' + def.label,
        type: FileStructureTypes.ITEM
    }
}

function generateTreeNodes(rootList) {
    var ret = [];
    for (var i = 0; i < rootList.length; i++) {
        var currItem = rootList[i];
        if (currItem.type === FileStructureTypes.FOLDER) {
            ret.push(makeFolder(currItem, ''));
        }
        else if (currItem.type === FileStructureTypes.ITEM) {
            ret.push(makeItem(currItem, ''));
        }
    }

    return ret;
}

export { generateTreeNodes };
export default {
    generateTreeNodes: generateTreeNodes,
}