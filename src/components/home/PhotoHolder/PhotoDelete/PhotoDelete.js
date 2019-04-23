import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './PhotoDelete.css';
import APIURL from '../../../../helpers/environment';
import { AuthContext } from '../../../authorization/AuthContext';

class PhotoDelete extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    deletePhoto = (event) =>{
        event.preventDefault();

        let url = `${APIURL}/photos/`

        fetch(url+`${this.props.photoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': this.props.auth.sessionToken
            },
        })
        .then(response => response.json())
        .then(data => {
            this.toggle();
            console.log('after toggle, before fetch to update component feed');

            this.props.fetchMyPhotos();
            
            console.log('after fetch to update user feed');
        })
        .catch(err => console.log("Error: " + err))
    }

    render(){
        return(
            <div>
                <Button className="DeleteButton" onClick={this.toggle} > DELETE PHOTO </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}> PhotoDelete </ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this photo?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.deletePhoto}>DELETE</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>CANCEL</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default props => (
    <AuthContext.Consumer>
        {auth => <PhotoDelete {...props} auth={auth} />}
    </AuthContext.Consumer>
)
