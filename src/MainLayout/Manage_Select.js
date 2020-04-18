import React from 'react';
import '../css_sheet/global_theme.css';
import { Container, Row, Col } from 'react-bootstrap';

function Management_select(){
    return(
        <Container fluid className="Management_container">
            <Row>
                <Col>ModuleGroup Management</Col>
                <Col>User Management</Col>
                <Col>Plant Management</Col>
            </Row>
        </Container>
    )
}

export default Management_select;