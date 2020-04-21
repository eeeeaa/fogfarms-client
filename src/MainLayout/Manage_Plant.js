import React from 'react';
import '../css_sheet/global_theme.css';
import { Container, Row,Col } from 'react-bootstrap';

function Manage_plant(){
    return(
        <Container fluid className="Management_container">
            <Row>
                <Col>Manage Plant</Col>
            </Row>
        </Container>
    )
}

export default Manage_plant;