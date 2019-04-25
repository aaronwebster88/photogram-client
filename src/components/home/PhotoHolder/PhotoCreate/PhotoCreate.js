import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './PhotoCreate.css';
import APIURL from '../../../../helpers/environment';
import { AuthContext } from '../../../authorization/AuthContext';

class PhotoCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            path: '',
            modal: false,
            caption: ''
        }

        this.toggle = this.toggle.bind(this); 
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    uploadPhoto = (event) =>{
        event.persist();
        let upload = document.getElementById('upload');
        let caption = document.getElementById('caption');
        let formData = new FormData();
        formData.append('photo', upload.files[0]);
        formData.append('caption', this.state.caption);

        let url = `${APIURL}/photos/upload`

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': this.props.auth.sessionToken
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(this.props.mode === 'all') {
                this.props.fetchAllPhotos();
            } else {
                this.props.fetchMyPhotos();
            };
            this.toggle();
        })
        .catch(err => console.log("Error: " + err))
    }

    render(){
        return(
            <div className="PhotoButton">
                <Button id="UploadButton" color="info" onClick={this.toggle} > UPLOAD </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader id="UploadHeader"toggle={this.toggle}> Upload a photo </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label className="UploadLabel" for="UploadFile">Upload a photo.</Label>
                                <Input type="file" name="file" id="upload" accept="photo/*"/>
                                <FormText color="muted">
                                    100MB max. JPGs only.
                                </FormText>
                                <Label className="UploadLabel" for="UploadCaption">Add a caption.</Label>
                                <Input type="text" name="caption" id="caption" placeholder="Write a caption..." onChange={this.handleChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter className="UploadFooter">
                        <Button id="UploadSubmit" onClick={this.uploadPhoto}> UPLOAD </Button>{' '}
                        <Button id="UploadCancel" onClick={this.toggle}>CANCEL</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default props => (
    <AuthContext.Consumer>
        {auth => <PhotoCreate {...props} auth={auth} />}
    </AuthContext.Consumer>
)