import React from 'react';
import axios from 'axios';
import app from '../axiosConfig';
import '../css_sheet/global_theme.css';
import { Container, Row, Col, Card, ListGroup,ListGroupItem, Button,Tooltip,OverlayTrigger,Modal,Alert,Form,} from 'react-bootstrap';

const serverName = "https://salty-oasis-24147.herokuapp.com"

class Manage_module extends React.Component{
    constructor(props) {
      super(props);
      this.state = {module_groups: [],current_group : '',plants:[],module_to_move:-1,show_move:false,show_create:false};
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
    
      componentDidMount() {
        this.callData();
        this.callPlants();
      }
      callPlants(){
        app.get(serverName + "/plant_management")
          .then(res => {
            const plt_data = res.data.Data;
            this.setState({plants:plt_data});
            console.log("state_plant", this.state.plants)
          }).catch(error => console.log(error))
      }
      callData(){
        app.get(serverName + "/modulegroup_management")
          .then(res => {
            const mod_data = res.data;
            this.setState({module_groups:mod_data});
            console.log("state", this.state.module_groups)
          }).catch(error => console.log(error))
      }
      handleClick(item) {
        const id = item;
        console.log("current group",id);
        this.setState({current_group: id});
        // alert('You clicked ' + this.state.current_group);
      }
      handleRightClick(stuff){
        const module = stuff;
        console.log("current module",module);
        
      }
      handleMove(dest_group){
        console.log("want to move " + this.state.module_to_move + " to module group " + dest_group)
        console.log(this.state.module_groups)
        app.post(serverName + '/modulegroup_management/assign', {  
          "module_group_id": dest_group,
          "module_ids": [this.state.module_to_move]
        },{headers:{"Content-Type" : "application/json"}})
            .then(res => {
                    console.log(res);
                    console.log(res.data);
                    if (res.status === 200) {
                      this.callData();
                      this.setState({show_move:false});
                    }
                    else{
                      return(
                        <Alert variant={'danger'}>
                          assignment unsuccessful!
                        </Alert>
                      )
                    }
      })
      }
      CreateModuleModal(props){
        return(
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                 Create Module group
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/*parameters form*/}
              {
                /* "plant_id":INT,
                "location_id":INT,
                "tds":float64,
                "ph":float64,
                "humidity":float64,
                "on_auto":bool,
                "module_group_label":string,
                "lights_off_hour":float64,
                "lights_on_hour":float64 */
            
              }
              <Form>
                        <Form.Group>
                            <Form.Label>Plants</Form.Label>
                            <Form.Control as="select">
                                {props.children}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>location id</Form.Label>
                            <Form.Control placeholder="username" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>TDS</Form.Label>
                            <Form.Control placeholder="0.0" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>PH</Form.Label>
                            <Form.Control  placeholder="0.0" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Humidity</Form.Label>
                            <Form.Control placeholder="0.0" />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Automation</Form.Label>
                          <Form.Control as="select">
                              <option>True</option>
                              <option>False</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Group Label</Form.Label>
                            <Form.Control type="string" placeholder="groupname" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Light off hour</Form.Label>
                            <Form.Control  placeholder= "0.0" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Light on hour</Form.Label>
                            <Form.Control  placeholder="username" />
                        </Form.Group>

                        
                        <Button variant="primary" type="submit">
                            Submit
                         </Button>
                    </Form>
            </Modal.Body>
          </Modal>
        );
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
                Move to....
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                props.children
              }
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
            <Row className='Panels'>
                <Col align='center'>
                    <Card style={{ width: '40rem' }}>
                        <Card.Body>
                            <Card.Title>Module Groups</Card.Title>
                            <Card.Text>
                                After selecting module group, 
                                list of modules will be display on right side panel.
                             </Card.Text>
                        </Card.Body>
                        <ListGroup variant="dark">
                            {/*module group*/}
                            { 
                            Object.keys(this.state.module_groups)
                            .sort((a, b) => this.state.module_groups[a].module_group_id - this.state.module_groups[b].module_group_id)
                            .map(item => 
                                <ListGroupItem action onClick={() => this.handleClick(item)}>
                                  {this.state.module_groups[item].module_group_id === 0 ? 'Unassigned': item}
                                  </ListGroupItem>, this)
                            }
                        </ListGroup>
                        
                    </Card>
                </Col>
                <Col align='center'>
                    <Card style={{ width: '40rem' }}>
                        <Card.Body>
                            <Card.Title>Modules</Card.Title>
                        </Card.Body>
                        <ListGroup variant="dark">
                          { 
                            this.state.current_group !== '' ?
                                this.state.module_groups[this.state.current_group].Modules
                                .sort((a, b) => a - b)
                                .map(module => 
                                      <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={this.renderTooltip}
                                      >
                                        <ListGroupItem action onClick={() => this.setState({show_move:true,module_to_move:module})}>
                                            {module}
                                        </ListGroupItem>
                                      </OverlayTrigger>
                                    )
                              :
                                <div></div>
                            }
                            <this.MyVerticallyCenteredModal
                                            show={this.state.show_move}
                                            onHide={() => this.setState({show_move:false})}
                            >
                              {
                              Object.keys(this.state.module_groups)
                                .sort((a, b) => this.state.module_groups[a].module_group_id - this.state.module_groups[b].module_group_id)
                                .map(item => 
                                <ListGroupItem action onClick={() => this.handleMove(this.state.module_groups[item].module_group_id)}>
                                  {this.state.module_groups[item].module_group_id === 0 ? 'Unassigned': item}
                                </ListGroupItem>, this)
                              }
                            </this.MyVerticallyCenteredModal>
                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col >
                    <div>
                    <Button variant='dark' style = { {width: '200px' }}>
                        Enter
                    </Button>
                    </div>
                    <div>
                    <Button variant='dark' onClick={() => this.setState({show_create:true})} style = { {width: '200px'} }>
                        Create new module group
                        
                    </Button>
                    </div>
                    <div>
                    <Button  variant ='dark' style = { {width: '200px'} }>
                        Delete selected module group
                    </Button>
                    </div>
                      
                </Col>
                <Col>
                    <Button style = { {width: '200px'} }>
                          Create new module
                    </Button>
                    <Button style = { {width: '200px'} }>
                          Delete module...
                    </Button>
                   
                          
                </Col>
                <this.CreateModuleModal
                                show={this.state.show_create}
                                onHide={() => this.setState({show_create:false})}>
                {

                  Object.keys(this.state.plants)
                    .map(item =>
                      <option>
                        {this.state.plants[item].name}
                      </option>
                    )
                }
                                              
                </this.CreateModuleModal>
            </Row>
        </Container>
        );
    }
}
/* class PersonList extends React.Component {
    state = {
      persons: []
    }
  
    componentDidMount() {
      axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(res => {
          const persons = res.data;
          this.setState({ persons });
        })
    }
  
    render() {
      return (
        <ul>
          { this.state.persons.map(person => <li>{person.name}</li>)}
        </ul>
      )
    }
  } */
export default Manage_module;