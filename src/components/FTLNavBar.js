import React, { Component } from 'react';
import { AnchorButton, Button, Tag, Intent, Tooltip, Position } from '@blueprintjs/core';

class FTLNavBar extends Component {

    render() {
        var intent = this.props.connectionState.connected ? Intent.SUCCESS : Intent.DANGER;
        var connectTooltipString = this.props.connectionState.connected ?
                                   'Connected' : 'Not Connected';
        var clientIdString = 'Client ID: ' + (this.props.connectionState.clientId ?
                                              this.props.connectionState.clientId :
                                              'Unassigned');
        return (
            <nav className="pt-navbar">
                <div className="pt-navbar-group pt-align-left">
                    <div className="pt-navbar-heading" style={{marginRight: '30px'}}>FTL IDE</div>
                </div>
                <div className="pt-navbar-group pt-align-left">
                    <Tooltip content="Build Project" position={Position.BOTTOM}>
                        <AnchorButton className="pt-minimal" iconName="build" />
                    </Tooltip>
                    <span className="pt-navbar-divider"></span>
                    <Tooltip content="Run Project" position={Position.BOTTOM}>
                        <Button className="pt-minimal" iconName="play" />
                    </Tooltip>
                    <Tooltip content="Stop Project" position={Position.BOTTOM}>
                        <Button className="pt-minimal" iconName="stop" />
                    </Tooltip>
                </div>
                <div className="pt-navbar-group pt-align-right">
                    <Tooltip content={connectTooltipString} position={Position.BOTTOM}>
                        <Tag intent={intent}>{clientIdString}</Tag>
                    </Tooltip>
                </div>

            </nav>
        );
    }
}

export default FTLNavBar;
