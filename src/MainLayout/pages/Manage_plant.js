import React from "react";
import app from "../functions/axiosConfig";
import "../../css_sheet/global_theme.css";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Tooltip,
  Modal,
  Alert,
  Form,
} from "react-bootstrap";

const serverName = "https://salty-oasis-24147.herokuapp.com";

class Manage_plant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      current_plant: "",
      show_plant_create: false,
      show_del_dialog: false,

      pname: "",
      tds: -1.0,
      ph: -1.0,
      lux: -1.0,
      lights_on_hour: -1.0,
      lights_off_hour: -1.0,
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  validateForm() {
    const bool_result =
      this.state.pname.length > 0 &&
      this.state.tds > -1.0 &&
      this.state.ph > -1.0 &&
      this.state.lux > -1.0 &&
      this.state.lights_on_hour > -1.0 &&
      this.state.lights_off_hour > -1.0;
    return bool_result;
  }
  componentDidMount() {
    this.callData();
  }
  callData() {
    app
      .get(serverName + "/plant_management")
      .then((res) => {
        const plt_data = res.data.Data;
        this.setState({ plants: plt_data });
        console.log("state", this.state.plants);
      })
      .catch((error) => console.log(error));
  }
  handleClick(item) {
    const ix = item;
    this.setState({ current_plant: ix });
    console.log("current plant", this.state.current_plant);
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  handleSubmit(event) {
    const pname = this.state.pname;
    const ntds = parseFloat(this.state.tds);
    const nph = parseFloat(this.state.ph);
    const nlux = parseFloat(this.state.lux);
    const on = parseFloat(this.state.lights_on_hour);
    const off = parseFloat(this.state.lights_off_hour);
    app
      .post(
        serverName + "/plant_management/create_plant",
        {
          name: pname,
          tds: ntds,
          ph: nph,
          lux: nlux,
          lights_on_hour: on,
          lights_off_hour: off,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.status === 200) {
          this.callData();
          this.setState({ show_plant_create: false });
        } else {
          return <Alert variant={"danger"}>assignment unsuccessful!</Alert>;
        }
      });
  }
  handleDelete() {
    if (this.state.current_plant === "") {
      console.log("no plant to be deleted");
    } else {
      const cplant = this.state.plants[this.state.current_plant].plant_id;
      console.log("plant to be deleted ", cplant);
      app
        .post(
          serverName + "/plant_management/delete_plant",
          { plant_id: cplant },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.status === 200) {
            this.setState({ current_plant: "" });
            this.callData();
            this.setState({ show_del_dialog: false });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }
  PlantCreateModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create plant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  DeleteDialog(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Warning!</Modal.Title>
        </Modal.Header>
        {props.children}
      </Modal>
    );
  }
  renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Click to view plant information
      </Tooltip>
    );
  }

  render() {
    return (
      <Container fluid className="center-screen">
        <Row className="Panels">
          <Col align="center">
            <Card style={{ width: "40rem" }} bg="primary" text="light">
              <Card.Body>
                <Card.Title>Plants</Card.Title>
              </Card.Body>
              <ListGroup variant="dark">
                {/*Plants*/}
                {Object.keys(this.state.plants).map(
                  (item) => (
                    <ListGroupItem
                      action
                      onClick={() => this.handleClick(item)}
                    >
                      {this.state.plants[item].name}
                    </ListGroupItem>
                  ),
                  this
                )}
              </ListGroup>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "40rem" }} bg="primary" text="light">
              <Card.Body>
                <Card.Title>Information</Card.Title>
                {this.state.current_plant !== "" ? (
                  <Card.Text>
                    Plant name:{" "}
                    {this.state.plants[this.state.current_plant].name}
                    <br />
                    TDS: {this.state.plants[this.state.current_plant].tds}
                    <br />
                    PH: {this.state.plants[this.state.current_plant].ph}
                    <br />
                    LUX: {this.state.plants[this.state.current_plant].lux}
                    <br />
                    Light off:{" "}
                    {
                      this.state.plants[this.state.current_plant]
                        .lights_off_hour
                    }{" "}
                    Hours
                    <br />
                    Light on:{" "}
                    {
                      this.state.plants[this.state.current_plant].lights_on_hour
                    }{" "}
                    Hours
                  </Card.Text>
                ) : (
                  <div></div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col align="center">
            <Button
              variant="dark"
              onClick={() => this.setState({ show_plant_create: true })}
            >
              Create new Plant
            </Button>
            <Button
              variant="dark"
              onClick={() => {
                if (this.state.current_plant !== "") {
                  this.setState({ show_del_dialog: true });
                } else {
                  console.log("no current user!");
                }
              }}
            >
              Delete selected Plant
            </Button>
            <this.DeleteDialog
              show={this.state.show_del_dialog}
              onHide={() => this.setState({ show_del_dialog: false })}
            >
              <Modal.Body>
                You are about to delete{" "}
                {this.state.current_plant !== ""
                  ? this.state.plants[this.state.current_plant].name
                  : ""}{" "}
                !
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={this.handleDelete.bind(this)}>
                  Delete
                </Button>
                <Button
                  onClick={() => this.setState({ show_del_dialog: false })}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </this.DeleteDialog>
            <this.PlantCreateModal
              show={this.state.show_plant_create}
              onHide={() => this.setState({ show_plant_create: false })}
            >
              {/*
                            "name":String,
                            "tds":float64,
                            "ph":float64,
                            "lux":float64,
                            "lights_on_hour":float64,
                            "lights_off_hour":float64
                         */}
              <Form>
                <Form.Group>
                  <Form.Label>Plant name</Form.Label>
                  <Form.Control
                    name="pname"
                    onChange={this.handleChange.bind(this)}
                    type="string"
                    placeholder="plantname"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>TDS</Form.Label>
                  <Form.Control
                    name="tds"
                    onChange={this.handleChange.bind(this)}
                    type="string"
                    placeholder="0.0"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>PH</Form.Label>
                  <Form.Control
                    name="ph"
                    onChange={this.handleChange.bind(this)}
                    type="string"
                    placeholder="0.0"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>LUX</Form.Label>
                  <Form.Control
                    name="lux"
                    onChange={this.handleChange.bind(this)}
                    type="string"
                    placeholder="0.0"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Lights on hour</Form.Label>
                  <Form.Control
                    name="lights_on_hour"
                    onChange={this.handleChange.bind(this)}
                    type="string"
                    placeholder="0.0"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Lights off hour</Form.Label>
                  <Form.Control
                    name="lights_off_hour"
                    onChange={this.handleChange.bind(this)}
                    type="string"
                    placeholder="0.0"
                  />
                </Form.Group>
                <Button
                  disabled={!this.validateForm()}
                  onClick={this.handleSubmit.bind(this)}
                  variant="primary"
                >
                  Submit
                </Button>
              </Form>
            </this.PlantCreateModal>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Manage_plant;
