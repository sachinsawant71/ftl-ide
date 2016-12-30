import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/clike/clike';
import { NonIdealState, Spinner } from '@blueprintjs/core';

var DEFAULT_EDITOR_OPTIONS = {
    lineNumbers: true,
    readOnly: false,
    mode: 'text/x-java',
    indentUnit: 4,
    autoSave: true,
    preserveScrollPosition: true
};

/** 
 * @class CursorPosition
 * @property {number} line 
 *      The line where the cursor is
 * @property {number} ch 
 *      The character (or column) where the cursor is
 */

/**
 * @class SelectionDescription
 * @property {CursorPosition} anchor 
 *      The start of the selection
 * @property {CursorPosition} head 
 *      The end of the selection
 */

/**
 * @class Viewport
 * @property {number} from 
 *      Line number of the start of the viewport
 * @property {number} to 
 *      Line number of the end of the viewport
 */

/**
 * @class EditorInfo
 * @property {string} contents 
 *      The contents of this code editor
 * @property {CursorPosition} cursor 
 *      The position of the cursor in the editor
 * @property {SelectionDescription[]} selections
 *      List of selections active in the editor
 * @property {object} scrollInfo
 *      Information about the scrolled state of the editor
 * @property {Viewport} viewport
 *      Information about the current viewport of the editor
 */

/**
 * A wrapper around a CodeMirror editor
 *
 * This component manages the state of a CodeMirror editor. It takes in
 * an EditorInfo struct, which is used to populate the state of this widget.
 */
class EditorView extends Component {
    constructor(props) {
        super(props);

        var editorInfo = props.editorInfo;

        if (editorInfo !== undefined) {
            if (editorInfo.isPending) {
                this.state = {
                    isPending: true
                };
                this.hasEditor = false;
            }
            else {
                this.state = {
                    contents: editorInfo.contents || '',
                    cursor: editorInfo.cursor,
                    selections: editorInfo.selections,
                    scrollInfo: editorInfo.scrollInfo,
                    viewport: editorInfo.viewport,
                    editorOptions: Object.assign({}, DEFAULT_EDITOR_OPTIONS, editorInfo.editorOptions),
                    filePath: editorInfo.filePath,
                    isPending: undefined
                }

                this.hasEditor = true;
            }
        }
        else {
            this.state = {};
            this.hasEditor = false;
        }

        // Pre-bind methods
        this.handleChange = this.handleChange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        if (!this.hasEditor) {
            return;
        }
        
        // Component gets created here. Use the current state to configure the editor
        // First, add a ref to the editorInstance
        this.editorInstance = this.editorRef.getCodeMirror();

        // Set up scroll position
        if (this.state.scrollInfo) {
            this.editorInstance.scrollTo(this.state.scrollInfo.left, this.state.scrollInfo.top);
        }
        else if (this.state.viewport) {
            this.editorInstance.scrollIntoView(this.state.viewport);
        }

        if (this.state.cursor) {
            this.editorInstance.setCursor(this.state.cursor);
        }

        if (this.state.selections && this.state.selections.length > 0) {
            this.editorInstance.setSelections(this.state.selections);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.editorInfo) {
            var editorInfo = newProps.editorInfo;

            if (editorInfo.isPending) {
                this.setState({
                    isPending: true,
                    contents: undefined,
                    filePath: undefined,
                });
                this.hasEditor = false;
            }
            else {
                this.setState({
                    contents: editorInfo.contents || '',
                    cursor: editorInfo.cursor,
                    selections: editorInfo.selections,
                    scrollInfo: editorInfo.scrollInfo,
                    viewport: editorInfo.viewport,
                    editorOptions: Object.assign({}, DEFAULT_EDITOR_OPTIONS, editorInfo.editorOptions),
                    filePath: editorInfo.filePath,
                    isPending: undefined
                });

                this.hasEditor = true;
            }
        }
        else {
            this.setState({
                contents: undefined,
                filePath: undefined,
                isPending: undefined,
            });
            this.hasEditor = false;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.isPending !== nextState.isPending) {
            return true;
        }
        if (this.state.filePath === nextState.filePath) {
            return false;
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.hasEditor && !this.editorInstance) {
            this.editorInstance = this.editorRef.getCodeMirror();
        }

        // Set up scroll position
        if (this.state.scrollInfo) {
            this.editorInstance.scrollTo(this.state.scrollInfo.left, this.state.scrollInfo.top);
        }
        else if (this.state.viewport) {
            this.editorInstance.scrollIntoView(this.state.viewport);
        }

        if (this.state.cursor) {
            this.editorInstance.setCursor(this.state.cursor);
        }

        if (this.state.selections && this.state.selections.length > 0) {
            this.editorInstance.setSelections(this.state.selections);
        }
    }

    componentWillUnmount() {
        var finalState = Object.assign({}, this.state);
        // Update the cursor and selections
        finalState.cursor = this.editorInstance.getCursor();
        finalState.selections = this.editorInstance.listSelections();
        finalState.viewport = this.editorInstance.getViewport();
        finalState.scrollInfo = this.editorInstance.getScrollInfo();

        this.props.onStateUpdated(finalState);
    }

    handleChange(newCode) {
        this.setState({
            contents: newCode
        });

        this.props.onStateUpdated(this.state);
    }

    handleScroll() {
        // Grab the current viewport
        // TBD - Debounce this a little bit
        this.setState({
            viewport: this.editorInstance.getViewport(),
            scrollInfo: this.editorInstance.getScrollInfo()
        });

        this.props.onStateUpdated(this.state);
    }


    render() {
        if (this.state.isPending || this.state.contents === undefined) {
            var visual;
            var description;
            var title;

            if (this.state.isPending) {
                visual = <Spinner />;
                description = <span>Please wait, loading file</span>;
                title = "Loading...";
            }
            else {
                visual = "document";
                description = <span>There was no file selected. Select one in the file tree on the left</span>;
                title = "No File Selected";
            }

            return (
                <div className="ftl-non-ideal-host">
                    <NonIdealState
                        visual={visual}
                        title={title}
                        description={description} />
                </div>
            )
        }
        else {
            return (
                <CodeMirror ref={(editor) => { this.editorRef = editor; }} 
                            value={this.state.contents} 
                            onChange={this.handleChange} 
                            onScroll={this.handleScroll}
                            options={this.state.editorOptions} />
            );
        }
    }
};

export default EditorView;