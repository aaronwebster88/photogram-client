import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './Header.css';


const Header = () => {
    
        return(
            <div className="Header">
                <Navbar id="NavHeader" light expand="md">
                    <NavbarBrand></NavbarBrand>
                    <NavbarBrand id="NavbarBrandH" href="/">Photogram</NavbarBrand>
                    <NavbarBrand></NavbarBrand>
                </Navbar>
            </div>
        );
    }

export default Header;
