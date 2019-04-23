import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Button } from 'reactstrap';
import './NavAuthM.css';

export default class NavAuthM extends Component {
    constructor(props){
        super(props);
    }

    render() {

        let title = this.props.login ? 'SIGN UP' : 'LOG IN';

        return(
            <div className="NavMobile">
                <Navbar id="NavAuthM" light expand="md">
                    <NavbarBrand></NavbarBrand>
                    <NavbarBrand><Button id="NavButtonM"onClick={this.props.authToggle} > {title} </Button></NavbarBrand>
                    <NavbarBrand></NavbarBrand>
                </Navbar>
            </div>
        );
    }

}