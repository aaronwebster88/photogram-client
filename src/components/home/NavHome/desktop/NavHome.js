import React, { Component } from 'react';
import './NavHome.css'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';

export default class NavHome extends Component {
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
        return(
            <div className="NavDesktopHome">
                <Navbar className="NavHome" light expand="md">
                    <NavbarBrand href="/">Photogram</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink id="CurrentUser" disabled href="#">{this.props.currentUser}</NavLink>
                            </NavItem>
                            <NavItem>
                                <Button className ="NavHomeButton"onClick={() => this.props.clickLogout()}> Logout </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

}