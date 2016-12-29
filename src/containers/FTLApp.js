import React, { Component } from 'react';
import WorkArea from './WorkArea';
import FTLNavBar from '../components/FTLNavBar';
import SplitPane from 'react-split-pane';
import SidebarView from '../components/SidebarView';

class FTLApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editors: [
                {
                    fileName: 'file1.js',
                    contents: 'Hello World, I am file 1'
                },
                {
                    fileName: 'file2.js',
                    contents: 'I am file 2, the best file'
                },
                {
                    fileName: 'fileEmpty'
                }
            ],
            activeFile: {
                fileName: 'TestRobot.java',
                contents: 'import * from wpilibj;',
                filePath: '/com/zhiquanyeo/first/TestRobot.java'
            },
            projectFiles: [
                {
                    iconName: 'folder-close',
                    label: 'com',
                    hasCaret: true,
                    isExpanded: true,
                    childNodes: [
                        {
                            iconName: 'folder-close',
                            label: 'zhiquanyeo',
                            hasCaret: true,
                            childNodes: [
                                {
                                    iconName: 'folder-close',
                                    label: 'first',
                                    hasCaret: true,
                                    childNodes: [
                                        {
                                            iconName: 'document',
                                            label: 'TestRobot.java'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    iconName: 'folder-close',
                    label: 'edu',
                    hasCaret: true
                }
            ]
        }

        this.handleEditorUpdated = this.handleEditorUpdated.bind(this);
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

    render() {
        return (
            <div className="ftl-app-main">
                <FTLNavBar />
                <SplitPane split="vertical" defaultSize="80%" primary="second" className="ftl-splitter">
                    <SidebarView nodes={this.state.projectFiles}/>
                    <WorkArea activeFile={this.state.activeFile} onEditorUpdated={this.handleEditorUpdated} />
                </SplitPane>
            </div>
        );
    }
}

export default FTLApp;
