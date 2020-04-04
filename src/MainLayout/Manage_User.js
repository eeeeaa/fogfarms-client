import React from 'react';
import '../css_sheet/global_theme.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Manage_user(){
    return(
        <Container fluid>
            <Row className='Panels'>
                <Col align='center'>User Panel</Col>
                <Col align='center'>ModuleGroup permission Panel</Col>
            </Row>
            <Row className='Buttons'>
                <Col align='center'>
                    <Button>
                        Enter
                    </Button>
                </Col>
                <Col align='center'>Trash</Col>
            </Row>
        </Container>
    );
}

export default Manage_user;