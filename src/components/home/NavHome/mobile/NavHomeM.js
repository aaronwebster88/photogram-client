import React, { Component } from 'react';
import './NavHomeM.css'
import PhotoCreate from '../../PhotoHolder/PhotoCreate/PhotoCreate';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

export default class NavHomeM extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="NavMobileHome">
                <Navbar className="NavHomeM" light expand="md">
                        <Nav id="NavM">
                            <NavItem id="CurrentUserM" disabled href="#">
                                <Button id="PlaceHolderBtn" size="sm">{this.props.currentUser}</Button>
                            </NavItem>
                        </Nav>
                </Navbar>
            </div>
        );
    }

}