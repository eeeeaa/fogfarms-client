import React from "react";
import "../../css_sheet/global_theme.css";
import { Container, Button, Card, CardDeck } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Management_select() {
  return (
    <Container fluid className="center-vertical">
      <CardDeck>
        <Card>
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          />
          <Card.Body>
            <Card.Title>Module groups</Card.Title>
            <LinkContainer to="/manage-module" exact>
              <Button variant="success">Enter</Button>
            </LinkContainer>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Manage module groups</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1517732306149-e8f829eb588a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
          />
          <Card.Body>
            <Card.Title>Users</Card.Title>
            <LinkContainer to="/manage-user" exact>
              <Button variant="success">Enter</Button>
            </LinkContainer>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Manage users</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1551970634-747846a548cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          />
          <Card.Body>
            <Card.Title>Plants</Card.Title>
            <LinkContainer to="/manage-plant" exact>
              <Button variant="success">Enter</Button>
            </LinkContainer>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Manage plant specifications</small>
          </Card.Footer>
        </Card>
      </CardDeck>
    </Container>
  );
}

export default Management_select;
