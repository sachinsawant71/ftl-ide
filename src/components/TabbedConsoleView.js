import React, { Component } from 'react';
import TabPanel from 'react-tab-panel';

class TabbedConsoleView extends Component {

    // TBD - We should include a factory method that decides what kind of
    // component to display in the tab panel.
    render() {
        return (
            <TabPanel style={{marginTop: '8px' }} className="console-tabs">
                <div tabTitle="Console">This is a console!</div>
                <div tabTitle="Robot Output">This is the Robot Output</div>
            </TabPanel>
        );
    }
}

export default TabbedConsoleView;
