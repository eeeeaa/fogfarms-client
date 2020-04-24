import React from 'react';
import axios from 'axios';
import app from '../axiosConfig';
import '../css_sheet/global_theme.css';
import { Container, Row, Col, Card, ListGroup,ListGroupItem, Button,Tooltip,OverlayTrigger,Modal } from 'react-bootstrap';

const serverName = "https://salty-oasis-24147.herokuapp.com"

class Manage_module extends React.Component{
    constructor(props) {
      super(props);
      this.state = {module_groups: [],current_group : '',move_to_group:'',module_to_move:'',show_move:false,show_create:false};
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
    
      componentDidMount() {
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
      handleMove(item){
        const selected = item;
        this.setState({move_to_group:selected})
        console.log("want to move " + this.state.module_to_move + " to module group " + this.state.move_to_group)
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
                                <ListGroupItem action onClick={() => this.handleMove(item)}>
                                  {this.state.module_groups[item].module_group_id === 0 ? 'Unassigned': item}
                                </ListGroupItem>, this)
                              }
                            </this.MyVerticallyCenteredModal>
                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col align='center'>
                    <Button variant='dark'>
                        Enter
                    </Button>
                    <Button variant='dark'>
                        assign  
                    </Button>
                </Col>
                <Col align='center'>Trash</Col>
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