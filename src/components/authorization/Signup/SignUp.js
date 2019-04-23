import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import '../Authorization.css';
import { AuthContext } from '../AuthContext';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        fetch("http://localhost:3000/users/signup/", {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => response.json()
        ).then((data) => {
            console.log(data);
            this.props.auth.setToken(data.sessionToken);
            this.props.setCurrentUser(data.user.username);
        })
        event.preventDefault()
    }

    render(){
        return(
            <div className='wrapperAuth'>
                <h1 className="header" >Sign up</h1>
                <br></br>
                <Form onSubmit={this.handleSubmit} >
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Username</InputGroupAddon>
                            <Input id="username" type="text" name="username" placeholder="enter username" onChange={this.handleChange} />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputGroupAddon>
                            <Input id="email" type="email" name="email" placeholder="enter email" onChange={this.handleChange} />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Password&nbsp;</InputGroupAddon>
                            <Input id="password" type="password" name="password" placeholder="enter password" onChange={this.handleChange} />
                        </InputGroup>
                    </FormGroup>
                    <Button className="ButtonForm" type="submit"> Submit </Button>
                </Form>
            </div>
        )
    }
}

export default props => (
    <AuthContext.Consumer>
        {auth => <SignUp {...props} auth={auth} />}
    </AuthContext.Consumer>
)