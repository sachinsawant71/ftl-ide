import React, { Component } from 'react';
import WorkArea from './WorkArea';
import FTLNavBar from '../components/FTLNavBar';
import SplitPane from 'react-split-pane';
import SidebarView from '../components/SidebarView';

import { TestFileStructure } from '../data/TestData'
import { generateTreeNodes } from '../utils/FileStructureUtils';

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
                <SplitPane split="vertical" defaultSize="80%" primary="second" className="ftl-splitter">
                    <SidebarView nodes={this.state.projectFiles} onFileSelected={this.handleFileSelected}/>
                    <WorkArea activeFile={this.state.activeFile} onEditorUpdated={this.handleEditorUpdated} />
                </SplitPane>
            </div>
        );
    }
}

export default FTLApp;
