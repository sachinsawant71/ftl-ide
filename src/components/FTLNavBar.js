import React, { Component } from 'react';
import { AnchorButton, Button, Tag, Intent, Tooltip, Position } from '@blueprintjs/core';

class FTLNavBar extends Component {

    render() {
        var connTagIntent = this.props.connectionState.connected ? Intent.SUCCESS : Intent.DANGER;
        var connectTooltipString = this.props.connectionState.connected ?
                                   'Connected' : 'Not Connected';
        var clientIdString = 'Client ID: ' + (this.props.connectionState.clientId ?
                                              this.props.connectionState.clientId :
                                              'Unassigned');

        var activeClientMessage = "Hi!";
        var relinquishButtonStyle = {};
        if (this.props.activeClientStatus.isActive) {
            activeClientMessage = "You are the active user"
            relinquishButtonStyle.display = undefined;
        }
        else {
            activeClientMessage = "You are number " + this.props.activeClientStatus.position + " in line";
            relinquishButtonStyle.display = "none";
        }

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
                    <Tag className="pt-minimal" intent={Intent.PRIMARY}>{activeClientMessage}</Tag>
                    <Tooltip position={Position.BOTTOM} content="Give up your place in line">
                        <Button className="pt-minimal" iconName="redo" style={relinquishButtonStyle}>Give Up Position</Button>
                    </Tooltip>
                    <span className="pt-navbar-divider"></span>
                    <Tooltip content={connectTooltipString} position={Position.BOTTOM}>
                        <Tag intent={connTagIntent}>{clientIdString}</Tag>
                    </Tooltip>
                </div>

            </nav>
        );
    }
}

export default FTLNavBar;
