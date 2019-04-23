import React, { Component } from 'react';
import NavHome from '../NavHome/desktop/NavHome';
import AllPhotoDisplay from './PhotoDisplay/AllPhotos/AllPhotoDisplay';
import MyPhotoDisplay from './PhotoDisplay/MyPhotos/MyPhotosDisplay';

export default class Splash extends Component {
    constructor(props){
        super(props);
        this.state ={
            display: '',
            mode: '',
        }
    }

    handleMyPhotos = (event) => {
        console.log('reset display')
        event.preventDefault();
        this.setState({
            display: 'MyPhotos',
        }, console.log(this.state))
    }

    handleAllPhotos = (event) => {
        console.log('reset display')
        event.preventDefault();
        this.setState({
            display: 'AllPhotos',
        }, console.log(this.state))
    }

    clearDisplay = (event) => {
        console.log('clearing display');
        this.setState({
            display: ''
        }, console.log(this.state))
    }

    render(){
        return(
            <div>
                <NavHome clickLogout={this.props.clickLogout} currentUser={this.props.currentUser} />
                <br/>
                {this.state.display === 'AllPhotos' || this.state.display === '' ? <AllPhotoDisplay handleMyPhotos={this.handleMyPhotos} /> : <MyPhotoDisplay handleAllPhotos={this.handleAllPhotos} currentUser={this.props.currentUser} /> }
            </div>
        )
    }
    
}

