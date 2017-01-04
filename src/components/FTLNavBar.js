import React, { Component } from 'react';
import { Button, Tag, Intent } from '@blueprintjs/core';

class FTLNavBar extends Component {

    render() {
        console.log("navbar props: ", this.props);
        var intent = this.props.clientId ? Intent.SUCCESS : Intent.DANGER;
        return (
            <nav className="pt-navbar">
                <div className="pt-navbar-group pt-align-left">
                    <div className="pt-navbar-heading">FTL IDE</div>
                </div>
                <div className="pt-navbar-group pt-align-left">
                    <Tag intent={intent}>{this.props.clientId}</Tag>
                </div>
                <div className="pt-navbar-group pt-align-right">
                    <Button className="pt-minimal" iconName="document" text="Files"/>
                    <span className="pt-navbar-divider"></span>
                    <Button className="pt-minimal" iconName="user" />
                    <Button className="pt-minimal" iconName="notifications" />
                </div>
            </nav>
        );
    }
}

export default FTLNavBar;
