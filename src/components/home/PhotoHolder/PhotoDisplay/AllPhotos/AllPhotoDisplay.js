import React, { Component } from 'react';
import { AuthContext } from '../../../../authorization/AuthContext';
import PhotoCreate from '../../PhotoCreate/PhotoCreate';
import { Container, Row, Col, Card, CardHeader, CardImg, CardBody, Button } from 'reactstrap';
import '../PhotoDisplay.css';
import APIURL from '../../../../../helpers/environment';

class AllPhotoDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            photos: [],
            mode: ''
        }
    }

    fetchAllPhotos = () => {
        let url = `${APIURL}/photos/allphotos/`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.sessionToken
            }
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({ photos: data.photos })
            console.log(data.photos);
        })
    }

    componentDidMount() {
        console.log('in component did mount')
        this.fetchAllPhotos();
    }

    render(){
        return(
            <div className="PhotoHolder">
                <div className="ControlWrapper">
                    <Button className="DisplayButton" onClick={this.props.handleMyPhotos} > PROFILE </Button>
                    <PhotoCreate className="CreateButton" mode='all' fetchAllPhotos={this.fetchAllPhotos} />
                </div>
                <br></br>
                <Container>
                        {this.state.photos.map(photos => 
                            <Row key={photos.id} >
                                <Col sm="2"></Col>
                                <Col sm="8">
                                    <Card>
                                        <CardHeader className="UserName">{photos.username}</CardHeader>
                                        <CardImg width="100%" src={ photos.path } alt='' />
                                        <CardBody className="Caption">
                                            {photos.caption}
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="2"></Col>
                            </Row>
                        )}
                </Container>
            </div>
        )
    }
}
export default props => (
    <AuthContext.Consumer>
        {auth => <AllPhotoDisplay {...props} auth={auth} />}
    </AuthContext.Consumer>
)