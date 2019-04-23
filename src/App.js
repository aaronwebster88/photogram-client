import React, { Component } from 'react';
import './App.css';
import Splash from './components/home/PhotoHolder/Splash';
import Auth from './components/authorization/Auth/Auth'
import {
  BrowserRouter as Router} from 'react-router-dom';
import { AuthContext } from './components/authorization/AuthContext';

class App extends Component {
  constructor() {
    super();
    this.setToken = (token) => {
      localStorage.setItem('token', token);
      this.setState({ sessionToken: token });
    }

    this.state = {
      sessionToken: '',
      username: '',
      setToken: this.setToken
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && !this.state.sessionToken) {
      this.setState({sessionToken: token});
    }
    if (username && !this.state.username) {
      this.setState({username: username})
    }
  }

  setCurrentUser = (username) => {
    this.setState({
      username: username
    })
    localStorage.setItem('username', username);
    console.log(this.state.username);
  }
  
  clickLogout = () => {
    this.setState({
      sessionToken: '',
      username: ''
    });
    localStorage.clear();
  }

  protectedViews = () => {
    return this.state.sessionToken === undefined || this.state.sessionToken === '' ? <Auth setCurrentUser={this.setCurrentUser} /> : <Splash clickLogout={this.clickLogout} currentUser={this.state.username} />
  }

  render() {
    return (
      <Router>
        <AuthContext.Provider value={this.state}>
          <div>
            { this.protectedViews() }
          </div>
        </AuthContext.Provider>
      </Router>
      
    );
  }
}

export default App;
