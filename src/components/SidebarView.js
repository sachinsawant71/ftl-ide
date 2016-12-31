import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from '@blueprintjs/core';
import FileExplorer from './FileExplorer';

class SidebarView extends Component {
    render() {
        return (
            <Tabs className="ftl-sidebar">
                <TabList>
                    <Tab>File Explorer</Tab>
                </TabList>

                { /* File Explorer */ }
                <TabPanel>
                    <FileExplorer {...this.props} />
                </TabPanel>
            </Tabs>
        );
    }
};

export default SidebarView;