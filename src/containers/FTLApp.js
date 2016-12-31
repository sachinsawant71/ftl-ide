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
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    componentWillReceiveProps(newProps) {
        console.log('App newProps: ', newProps);
    }

    handleEditorUpdated(index, editorInfo) {
        var oldEditors = this.state.editors;
        if (oldEditors[index]) {
            oldEditors[index].contents = editorInfo.contents;
            oldEditors[index].scrollInfo = editorInfo.scrollInfo;
            oldEditors[index].selections = editorInfo.selections;
            oldEditors[index].viewport = editorInfo.viewport;
            oldEditors[index].cursor = editorInfo.cursor;
        }
        this.setState({
            editors: oldEditors
        })
    }

    handleFileSelected(filePath) {
        // TBD - This should be mapped to dispatch loadFile
        console.log('filepath: ', filePath);
        // Purely experimental right now. 
        if (filePath === '/com/zhiquanyeo/robot/TestRobot.java') {
            this.setState({
                activeFile: {
                    contents: 'import * from wpilibj;',
                    filePath: '/com/zhiquanyeo/robot/TestRobot.java'
                },
            });
        }
        else if (filePath === '/com/zhiquanyeo/robot/SomeOtherFile.java') {
            this.setState({
                activeFile: {
                    contents: 'import * from someotherpackage;',
                    filePath: '/com/zhiquanyeo/robot/SomeOtherFile.java'
                },
            });
        }
        else if (filePath === '/edu/wpilibj/Timer.java') {
            this.setState({
                activeFile: {
                    isPending: true
                }
            });
        }
        else {
            this.setState({
                activeFile: undefined
            });
        }
    }

    render() {
        return (
            <div className="ftl-app-main">
                <FTLNavBar />
                <SplitPane split="vertical" defaultSize="20%" minSize={200} className="ftl-splitter">
                    <SidebarView nodes={this.props.workspace} onFileSelected={this.props.onFileSelected}/>
                    <WorkArea activeFile={this.props.activeFile} onEditorUpdated={this.handleEditorUpdated} />
                </SplitPane>
            </div>
        );
    }
}

// TBD Implement
// This maps the redux store state into props
function mapStateToProps(state) {
    console.log('state: ', state);
    const { workspace, activeFile } = state; // state here represents the reducers

    console.log('workspace: ', workspace);
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FTLApp);
