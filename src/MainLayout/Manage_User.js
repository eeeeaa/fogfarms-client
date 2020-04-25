import React from 'react';
import axios from 'axios';
import app from '../axiosConfig';
import '../css_sheet/global_theme.css';
import { Container, Row, Col, Card, ListGroup,ListGroupItem, Button,Tooltip,Modal,Dropdown,Alert,Form,ButtonGroup } from 'react-bootstrap';

const serverName = "https://salty-oasis-24147.herokuapp.com"

class Manage_user extends React.Component{
    constructor(props) {
      super(props);
      this.state = {users: [],current_user:'',current_group:'',show_usr_create:false,show_alert:false};
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
    }
    
      componentDidMount() {
        this.callData();
      }
      callData(){
        app.get(serverName + "/user_management")
        .then(res => {
          const usr_data = res.data;
          this.setState({users:usr_data});
          console.log("state", this.state.users)
        }).catch(error => console.log(error))
      }
      handleClick(item) {
        this.setState({current_user:item});
        console.log("current user",this.state.current_user);
      }
      handleSelect(eventKey,event){
          console.log("user: ",this.state.current_user,"group:",this.state.current_group,"key: ",eventKey);
          const cuser = this.state.current_user;
          const cgroup = this.state.current_group;
          const level = parseInt(eventKey)
          app.post(serverName + '/user_management/assign',
          {
            "username": cuser,
	        "module_group_label": cgroup,
	        "permission_level": level
          }
          ,{headers:{"Content-Type" : "application/json"}})
              .then(res => {
                      console.log(res);
                      console.log(res.data);
                      if (res.status === 200) {
                        this.callData();
                      }
        }).catch(error => {
            this.setState({show_alert:true});
            console.log(error.message);
          })
      }
      display_permission(key){
        switch (key){
            case 0: return 'None';break;
            case 1: return 'Monitor';break;
            case 2: return 'Control';break;
            case 3: return 'Supervisor';break;
            case 4: return 'Adminstrator';break;
            default: return 'whattt';break;
         }
      }
      handleDelete(){
          app.post(serverName + '/user_management/delete',
          {"username": this.state.current_user},{headers:{"Content-Type" : "application/json"}}
          )
          .then(res => {
                    console.log(res);
                    console.log(res.data);
                    if (res.status === 200) {
                         this.callData();
                    }
            }).catch(error => {
                 this.setState({show_alert:true});
                 console.log(error.message);
            })
      }
      RegisterUserModal(props) {
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
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="string" placeholder="username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                         </Button>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button onClick={props.onHide}>Close</Button> */}
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
            <Alert variant={'danger'} show = {this.state.show_alert} onClose ={()=>this.setState({show_alert:false})} dismissible>
                    Operation unsuccessful!
            </Alert>
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
                            <Card.Title>Module group permission level</Card.Title>
                        </Card.Body>
                        <ListGroup variant="dark">
                          {/*module group permission levels*/}
                          {
                            this.state.current_user !== '' ?
                            Object.keys(this.state.users[this.state.current_user])
                            .map(item =>
                                item !== "null" ? 
                                <ListGroupItem>
                                <Dropdown style={{width : '100%'}} drop= 'right' onSelect={this.handleSelect} onClick={()=>this.setState({current_group:item})}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {item} : {this.display_permission(this.state.users[this.state.current_user][item])}
                                     </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey={0}>None</Dropdown.Item>
                                        <Dropdown.Item eventKey={1}>Monitor</Dropdown.Item>
                                        <Dropdown.Item eventKey={2}>Control</Dropdown.Item>
                                        <Dropdown.Item eventKey={3}>Supervisor</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </ListGroupItem>
                                :<div></div>
                                , this
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
                    <Button variant='dark' onClick={() => this.setState({show_usr_create:true})}>
                        Register new user  
                    </Button>
                    <Button variant='warning' onClick={this.handleDelete}>
                        Delete currently selected user
                    </Button>
                    <this.RegisterUserModal
                                            show={this.state.show_usr_create}
                                            onHide={() => this.setState({show_usr_create:false})}/>
                    
                </Col>
            </Row>
        </Container>
        );
    }
}

export default Manage_user;