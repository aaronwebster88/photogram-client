import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, InputGroupAddon, Input, Button, Alert } from 'reactstrap';
import '../Authorization.css'
import { AuthContext } from '../AuthContext';
import APIURL from '../../../helpers/environment';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            err: '',
            alertvisible: true
        }
    }

    onDismiss = () => {
        this.setState({ alertvisible: false });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        fetch(`${APIURL}/users/login/`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            if(response.ok) {
                return response.json()
            } else {
                throw new Error('Username or password do not match!');
            }
        }).then((data) => {
            // console.log(data.user.username);
            this.props.auth.setToken(data.sessionToken);
            this.props.setCurrentUser(data.user.username);
        }).catch(err => this.setState({
            err: err.message
        }))
        event.preventDefault()
    }

    render() {
        return(
            <div className='wrapperAuth'>
                <h1 className="header" >Log in</h1>
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
                            <InputGroupAddon addonType="prepend">Password&nbsp;</InputGroupAddon>
                            <Input id="password" type="password" name="password" placeholder="enter password" onChange={this.handleChange} />
                        </InputGroup>
                    </FormGroup>
                    {this.state.err === '' ? null : <Alert color="danger" isOpen={this.state.alertvisible} toggle={this.onDismiss} >{this.state.err}</Alert>}
                    <Button className="ButtonForm" type="submit"> Submit </Button>
                </Form>
            </div>
        )
    }
}

export default props => (
    <AuthContext.Consumer>
        {auth => <LogIn {...props} auth={auth} />}
    </AuthContext.Consumer>
)