import React, { Component } from 'react';
import NavAuth from '../NavAuth/desktop/NavAuth';
import Header from '../NavAuth/mobile/Header';
import NavAuthM from '../NavAuth/mobile/NavAuthM';
import SignUp from '../Signup/SignUp';
import LogIn from '../Login/LogIn';
import LandingImage from '../LandingImage/LandingImage';
import { Container, Row, Col } from 'reactstrap';

export default class Auth extends Component { 
    constructor(props){
        super(props);
        this.state = {
            login: false
        }
    }

    authToggle = (event) => {
        event.preventDefault();

        const login = this.state.login;

        this.setState({
            login: !login
        })
    }

    render(){
        return(
            <div>
                <Header />
                <NavAuth authToggle={this.authToggle} login={this.state.login} />   
                <Container>
                    <Row>
                        <Col sm="4">
                            { !this.state.login ? <SignUp setCurrentUser={this.props.setCurrentUser} /> : <LogIn setCurrentUser={this.props.setCurrentUser} />}
                        </Col>
                        <Col sm="8">
                            <LandingImage />
                        </Col>
                    </Row>
                </Container>
                <NavAuthM authToggle={this.authToggle} login={this.state.login} />
            </div>
        )
    }    
}

