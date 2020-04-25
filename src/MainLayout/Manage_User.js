import React from 'react';
import axios from 'axios';
import app from '../axiosConfig';
import '../css_sheet/global_theme.css';
import { Container, Row, Col, Card, ListGroup,ListGroupItem, Button,Tooltip,OverlayTrigger,Modal } from 'react-bootstrap';

const serverName = "https://salty-oasis-24147.herokuapp.com"

class Manage_user extends React.Component{
    constructor(props) {
      super(props);
      this.state = {users: [],current_user:''};
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
    
      componentDidMount() {
        app.get(serverName + "/user_management")
          .then(res => {
            const usr_data = res.data;
            this.setState({users:usr_data});
            console.log("state", this.state.users)
          }).catch(error => console.log(error))
      }
      handleClick(item) {
        const id = item;
        this.setState({current_user:id});
        console.log("current user",this.state.current_user);
      }
      MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Register user
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                props.children
              }
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
      renderTooltip(props) {
        return (
          <Tooltip id="button-tooltip" {...props}>
            Click to change module group
          </Tooltip>
        );
      }

    render(){
        
        return(
            
            <Container fluid className='center-screen'>
            <Row className='Panels'>
                <Col align='center'>
                    <Card style={{ width: '40rem' }}>
                        <Card.Body>
                            <Card.Title>Users</Card.Title>
                        </Card.Body>
                        <ListGroup variant="dark">
                            {/*Users*/}
                            { 
                            Object.keys(this.state.users)
                            .map(item => 
                                <ListGroupItem action onClick={() => this.handleClick(item)}>
                                  {item}
                                  </ListGroupItem>, this)
                            }
                        </ListGroup>
                        
                    </Card>
                </Col>
                <Col align='center'>
                    <Card style={{ width: '40rem' }}>
                        <Card.Body>
                            <Card.Title>Module groups</Card.Title>
                        </Card.Body>
                        <ListGroup variant="dark">
                          {/*module group permission levels*/}
                          {
                            this.state.current_user !== '' ?
                            Object.keys(this.state.users[this.state.current_user])
                            .map(item =>
                                <ListGroupItem>
                                    {item}
                                </ListGroupItem>, this
                            )
                            :
                            <div></div>          
                          }
                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col align='center'>
                    <Button variant='dark'>
                        Register new user  
                    </Button>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default Manage_user;