import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import './HeaderS.css';


export default class HeaderS extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="HeaderS">
                <Navbar id="NavHeaderS" light expand="md">
                    <Nav>
                        <NavItem className="NavItemM">
                            <Button id="PlaceholderHeader" size="sm" > PLACE </Button>
                        </NavItem>
                    </Nav>
                    <NavbarBrand id="NavbarBrandHS" href="/">Photogram</NavbarBrand>
                    <Nav>
                        <NavItem className="NavItemM">
                            <Button id="NavHomeMButton" size="sm" onClick={() => this.props.clickLogout()}> LOGOUT </Button>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
    
}


