import React, { Component } from 'react';
import { AuthContext } from '../../../../authorization/AuthContext';
import PhotoCreate from '../../PhotoCreate/PhotoCreate';
import PhotoUpdate from '../../PhotoUpdate/PhotoUpdate';
import PhotoDelete from '../../PhotoDelete/PhotoDelete';
import '../PhotoDisplay.css';
import APIURL from '../../../../../helpers/environment';
import { Container, Row, Col, Button, Card, CardImg, CardBody, CardHeader, CardFooter, } from 'reactstrap';

class MyPhotoDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            photos: []
        }
    }

    fetchMyPhotos = () => {
        let url = `${APIURL}/photos/myphotos/`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.sessionToken
            }
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({ photos: data.userPhotos })
            // console.log(data.userPhotos);
        })
    }

    componentDidMount(){
        this.fetchMyPhotos();
    }    

    render(){
        return(
            <div className="PhotoHolder">
                <div className="ControlWrapper">
                    <Button className="DisplayButton" onClick={this.props.handleAllPhotos} > PHOTOS </Button>
                    <PhotoCreate className="CreateButton" mode='my' fetchMyPhotos={this.fetchMyPhotos} />
                </div>
                <h1 className="PhotoHeader">{this.props.currentUser}</h1>
                <Container>
                    <Row>
                        {this.state.photos.map(photos => 
                            <Col className="CardHolder" sm="4" key={photos.id}>
                                <Card className="PhotoCard">
                                    <CardHeader className="UserName"></CardHeader>
                                    <CardImg width="100%" src={ photos.path } alt='' />
                                    <CardBody className="Caption">
                                        {photos.caption}
                                    </CardBody>
                                    <CardFooter className="UserButtons">
                                        <PhotoUpdate photoId={photos.id} fetchMyPhotos={this.fetchMyPhotos} />
                                        <PhotoDelete photoId={photos.id} fetchMyPhotos={this.fetchMyPhotos} />
                                    </CardFooter>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        )
    }
}
export default props => (
    <AuthContext.Consumer>
        {auth => <MyPhotoDisplay {...props} auth={auth} />}
    </AuthContext.Consumer>
)
