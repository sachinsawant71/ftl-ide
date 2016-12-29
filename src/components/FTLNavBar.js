import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';

class FTLNavBar extends Component {

    render() {
        return (
            <nav className="pt-navbar">
                <div className="pt-navbar-group pt-align-left">
                    <div className="pt-navbar-heading">FTL IDE</div>
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
