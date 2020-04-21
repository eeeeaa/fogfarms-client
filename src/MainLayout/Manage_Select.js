import React from 'react';
import '../css_sheet/global_theme.css';
import { Container, Row,Col, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

function Management_select(){
    return(
        <Container fluid className="Management_container">
            <Row>
                <Col>
                    <LinkContainer to='/manage-module' exact>
                        <Button>
                            ModuleGroup Management
                        </Button>
                    </LinkContainer>
                </Col>
                <Col>
                    <LinkContainer to='/manage-user' exact>
                        <Button>
                            User Management
                        </Button>
                    </LinkContainer>
                </Col>
                <Col>
                    <LinkContainer to='/manage-plant' exact>
                        <Button>
                            Plant Management
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
        </Container>
    )
}

export default Management_select;