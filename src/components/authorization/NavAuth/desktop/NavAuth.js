import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Button } from 'reactstrap';
import './NavAuth.css';

export default class NavAuth extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        let title = this.props.login ? 'SIGN UP' : 'LOG IN';

        return(
            <div className="NavDesktop">
                <Navbar className="NavAuth" light expand="md">
                    <NavbarBrand href="/">Photogram</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button className="NavButton"onClick={this.props.authToggle} > {title} </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

}