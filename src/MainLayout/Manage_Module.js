import React from 'react';
import '../css_sheet/global_theme.css';
import { Container, Row, Col, Card, ListGroup,ListGroupItem, Button } from 'react-bootstrap';

function Manage_module(){
    return(
        <Container fluid className='center-screeny'>
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
                            <ListGroupItem>ModuleG A</ListGroupItem>
                            <ListGroupItem>ModuleG B</ListGroupItem>
                            <ListGroupItem>ModuleG C</ListGroupItem>
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
export default Manage_module;