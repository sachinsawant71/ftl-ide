import { ActionTypes } from '../Constants';

function updateExpandedState(nodes, pathArray, expanded) {
    if (pathArray.length === 0) return;

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (pathArray.length === 1) {
            if (node.label === pathArray[0]) {
                node.isExpanded = !!expanded;
                return;
            }
        }
        else {
            if (node.label === pathArray[0]) {
                updateExpandedState(node.children, pathArray.slice(1), expanded);
                break;
            }
        }
    }
}

function getExpandedNodes(nodes) {
    var ret = {};

    function _traverse(node, currPath) {
        var nodePath = currPath + '/' + node.label
        if (node.isExpanded) {
            ret[nodePath] = true;
        }

        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                _traverse(node.children[i], nodePath);
            }
        }
    }

    for (var i = 0; i < nodes.length; i++) {
        _traverse(nodes[i], '');
    }

    return ret;
}

function restoreExpandedNodes(nodes, expandedNodes) {
    function _traverse(node, currPath) {
        var nodePath = currPath + '/' + node.label;
        if (expandedNodes[nodePath]) {
            node.isExpanded = true;
        }

        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                _traverse(node.children[i], nodePath);
            }
        }
    }

    for (var i = 0; i < nodes.length; i++) {
        _traverse(nodes[i], '');
    }
}

function updateSelectedState(nodes, pathArray) {

    // Traverse fully
    function _traverse(node) {
        node.isSelected = false;

        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                _traverse(node.children[i]);
            }
        }
    }

    function _find(nodeList, pathArr) {
        if (pathArr.length === 0) return;

        for (var i = 0; i < nodeList.length; i++) {
            var node = nodeList[i];
            if (pathArr.length === 1) {
                if (node.label === pathArr[0]) {
                    node.isSelected = true;
                    return;
                }
            }
            else {
                if (node.label === pathArr[0]) {
                    _find(node.children, pathArr.slice(1));
                    break;
                }
            }
        }
    }

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        _traverse(node, pathArray);
    }
    _find(nodes, pathArray);
}

// This contains the reducer that populates the "project files" section of the application state
function workspace(state = [], action) {
    var updatedNodes, pathParts;

    switch (action.type) {
        case ActionTypes.WORKSPACE_UPDATED:
            var oldExpandedNodes = getExpandedNodes(state);
            updatedNodes = action.fileStructure.slice(0);
            restoreExpandedNodes(updatedNodes, oldExpandedNodes);

            return updatedNodes;
        case ActionTypes.WORKSPACE_NODE_EXPANDED:
            updatedNodes = state.slice(0);
            pathParts = action.path.split('/').slice(1);
            // skip the first one, since it's blank
            updateExpandedState(updatedNodes, pathParts, true);

            return updatedNodes;
        case ActionTypes.WORKSPACE_NODE_COLLAPSED:
            updatedNodes = state.slice(0);
            pathParts = action.path.split('/').slice(1);
            // skip the first one, since it's blank
            updateExpandedState(updatedNodes, pathParts, false);

            return updatedNodes;

        case ActionTypes.WORKSPACE_NODE_SELECTED:
            updatedNodes = state.slice(0);
            if (action.path) {
                pathParts = action.path.split('/').slice(1);
            }
            else {
                pathParts = [];
            }

            updateSelectedState(updatedNodes, pathParts);
            return updatedNodes;
            
        default:
            return state;
    }
}

export default workspace;
