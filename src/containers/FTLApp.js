import React, { Component } from 'react';
import WorkArea from './WorkArea';
import FTLNavBar from '../components/FTLNavBar';
import SplitPane from 'react-split-pane';
import SidebarView from '../components/SidebarView';

import { TestFileStructure } from '../data/TestData'
import { generateTreeNodes } from '../utils/FileStructureUtils';

import { connect } from 'react-redux';

import { loadActiveFile } from '../actions/FileActions';

class FTLApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // activeFile: {
            //     fileName: 'TestRobot.java',
            //     contents: 'import * from wpilibj;',
            //     filePath: '/com/zhiquanyeo/first/TestRobot.java'
            // },
            // Experimental: Generate tree structure from test data
            projectFiles: generateTreeNodes(TestFileStructure)
            
        }

        this.handleEditorUpdated = this.handleEditorUpdated.bind(this);
    }

    componentWillReceiveProps(newProps) {
        console.log('App newProps: ', newProps);
    }

    handleEditorUpdated(index, editorInfo) {
        return; // NOOP
        // var oldEditors = this.state.editors;
        // if (oldEditors[index]) {
        //     oldEditors[index].contents = editorInfo.contents;
        //     oldEditors[index].scrollInfo = editorInfo.scrollInfo;
        //     oldEditors[index].selections = editorInfo.selections;
        //     oldEditors[index].viewport = editorInfo.viewport;
        //     oldEditors[index].cursor = editorInfo.cursor;
        // }
        // this.setState({
        //     editors: oldEditors
        // })
    }

    render() {
        return (
            <div className="ftl-app-main">
                <FTLNavBar />
                <SplitPane split="vertical" defaultSize="20%" minSize={200} className="ftl-splitter">
                    <SidebarView nodes={this.props.workspace} onFileSelected={this.props.onFileSelected}/>
                    <WorkArea activeFile={this.props.activeFile} onEditorUpdated={this.props.onEditorUpdated} />
                </SplitPane>
            </div>
        );
    }
}

// TBD Implement
// This maps the redux store state into props
function mapStateToProps(state) {
    const { workspace, activeFile } = state; // state here represents the reducers

    return {
        workspace,
        activeFile
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFileSelected: (path) => {
            console.log('onFileSelected: ', path);
            dispatch(loadActiveFile(path));
        },
        onEditorUpdated: (editorData) => {
            //console.log('Editor Data: ', editorData);
            // TBD - Dispatch updated to saveFile and saveRecent
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FTLApp);
