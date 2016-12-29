import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class FTLNavBar extends Component {

    render() {
        return (
            <Navbar inverse className="ftl-navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        FTL IDE
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavDropdown title="File">
                        <MenuItem>New File</MenuItem>
                        <MenuItem>Save</MenuItem>
                    </NavDropdown>
                    <NavDropdown title="View">
                        <MenuItem active>Console</MenuItem>
                        <MenuItem>Robot Output</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem>Right Aligned Item</NavItem>

                </Nav>
                <Navbar.Form pullRight>
                    <Button>Hi</Button>
                </Navbar.Form>
            </Navbar>
        );
    }
}

export default FTLNavBar;
