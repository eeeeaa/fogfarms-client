import React from 'react';
import axios from 'axios';
import app from '../axiosConfig';
import '../css_sheet/global_theme.css';
import { Container, Row, Col, Card, ListGroup,ListGroupItem, Button,Tooltip,OverlayTrigger,Modal } from 'react-bootstrap';

const serverName = "https://salty-oasis-24147.herokuapp.com"

class Manage_plant extends React.Component{
    constructor(props) {
      super(props);
      this.state = {plants: [],current_plant:''};
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
    
      componentDidMount() {
        app.get(serverName + "/plant_management")
          .then(res => {
            const plt_data = res.data;
            this.setState({plants:plt_data});
            console.log("state", this.state.plants)
          }).catch(error => console.log(error))
      }
      handleClick(item) {
        const plant_name = item;
        this.setState({current_plant:plant_name});
        console.log("current plant",this.state.current_plant);
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
                    Plant
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
            Click to view plant information
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
                            <Card.Title>Plants</Card.Title>
                        </Card.Body>
                        <ListGroup variant="dark">
                            {/*Users*/}
                            { 
                            Object.keys(this.state.plants)
                            .map(item => 
                                <ListGroupItem action onClick={() => this.handleClick(item)}>
                                  {item}
                                  </ListGroupItem>, this)
                            }
                        </ListGroup>
                        
                    </Card>
                </Col>
                
            </Row>
            <Row>
                <Col align='center'>
                    <Button variant='dark'>
                        Create new Plant  
                    </Button>
                    <Button variant='dark'>
                        Delete Plant  
                    </Button>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default Manage_plant;