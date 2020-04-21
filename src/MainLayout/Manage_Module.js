import React from 'react';
import axios from 'axios';
import app from '../axiosConfig';
import '../css_sheet/global_theme.css';
import { Container, Row, Col, Card, ListGroup,ListGroupItem, Button } from 'react-bootstrap';
const serverName = "https://salty-oasis-24147.herokuapp.com"
class Manage_module extends React.Component{
    state = {
        module_groups: []
      }
    
      componentDidMount() {
        app.get(serverName + "/modulegroup_management")
          .then(res => {
            const module_groups = res;
            this.setState({module_groups});
            console.log(module_groups)
          })
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
                            { /* this.state.module_groups.map(module_group => 
                                <ListGroupItem>{module_group.modulegrouplabel}</ListGroupItem>) */
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
                            <ListGroupItem>Module A</ListGroupItem>
                            <ListGroupItem>Module B</ListGroupItem>
                            <ListGroupItem>Module C</ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col align='center'>
                    <Button variant='dark'>
                        Enter
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