import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './PhotoUpdate.css';
import APIURL from '../../../../helpers/environment';
import { AuthContext } from '../../../authorization/AuthContext';

class PhotoUpdate extends Component {
    constructor(props){
        super(props);
        this.state ={
            path: '',
            id: '',
            modal: false,
            caption: ''
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    updatePhoto = (event) =>{
        event.preventDefault();
        let update = document.getElementById('edit');
        let caption = document.getElementById('editCaption');
        let formData = new FormData();
        formData.append('photo', update.files[0]);
        formData.append('caption', this.state.caption);

        let url = `${APIURL}/photos/`

        fetch(url+`${this.props.photoId}`, {
            method: 'PUT',
            headers: {
                'Authorization': this.props.auth.sessionToken
            },
            body: formData
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
                <Button className="UpdateButton" onClick={this.toggle} > EDIT </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader className="UpdateHeader" toggle={this.toggle}> Edit a photo </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label className="UpdateLabel" for="UploadFile">Upload a new photo to replace the current photo.</Label>
                                <Input type="file" name="file" id="edit" accept="photo/*"/>
                                <FormText color="muted">
                                    100MB max. JPGs only.
                                </FormText>
                                <Label className="UpdateLabel" for="UploadCaption">Add a new caption.</Label>
                                <Input type="text" name="caption" id="editCaption" placeholder="Update the caption..." onChange={this.handleChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter className="UpdateFooter">
                        <Button className="UpdateSubmit" onClick={this.updatePhoto}> UPLOAD </Button>{' '}
                        <Button className="UpdateCancel" onClick={this.toggle}>CANCEL</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default props => (
    <AuthContext.Consumer>
        {auth => <PhotoUpdate {...props} auth={auth} />}
    </AuthContext.Consumer>
)
