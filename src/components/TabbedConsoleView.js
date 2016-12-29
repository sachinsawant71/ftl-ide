import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from '@blueprintjs/core';

class TabbedConsoleView extends Component {

    // TBD - We should include a factory method that decides what kind of
    // component to display in the tab panel.
    render() {
        return (
            <Tabs className="ftl-console-tabs">
                <TabList>
                    <Tab>Console</Tab>
                    <Tab>Robot Output</Tab>
                </TabList>

                { /* Console Panel*/ }
                <TabPanel>
                    <div>This is a console!</div>
                </TabPanel>

            { /* Robot Output Panel*/ }
                <TabPanel>
                    <div>This is the Robot Output!</div>
                </TabPanel>
            </Tabs>
        );
    }
}

export default TabbedConsoleView;
