import React from 'react';
import '../../css_sheet/global_theme.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SignOutButton from '../TestFunction/QuickSignOut';

function Management_select(){
    let history = useHistory();
    return(
        <Container fluid className="Management_container">
            <Row>
                <Col><div onClick={()=> history.push("/management/module")}>ModuleGroup Management</div></Col>
                <Col><div onClick={()=> history.push("/management/user")}>User Management</div></Col>
                <Col><div onClick={()=> history.push("/management/plant")}>Plant Management</div></Col>
            </Row>
            <SignOutButton/>
        </Container>
    )
}

export default Management_select;