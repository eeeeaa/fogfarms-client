import React, { useContext } from "react";
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
  OverlayTrigger,
  Modal,
  Alert,
  Form,
} from "react-bootstrap";
import { ModuleDataContext } from "../contexts/ModuleDataContext";
import { LinkContainer } from "react-router-bootstrap";

class Manage_module extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      module_groups: [],
      current_group: "",
      plants: [],
      module_to_move: -1,
      show_move: false,
      show_create: false,
      show_module: false,
      show_del_dialog: false,
      module_to_create: "",
      module_to_delete: "",
      show_alert: false,
      locations: [],
      dist_plant: "",

      plant_id: 0,
      location_id: -1,
      tds: -1.0,
      ph: -1.0,
      humidity: -1.0,
      on_auto: true,
      module_group_label: "",
      lights_off_hour: -1.0,
      lights_on_hour: -1.0,
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateForm() {
    const bool_result =
      this.state.plant_id > -1 &&
      this.state.location_id > -1 &&
      this.state.tds > -1.0 &&
      this.state.ph > -1.0 &&
      this.state.humidity > -1.0 &&
      this.state.module_group_label.length > 0 &&
      this.state.lights_off_hour > -1.0 &&
      this.state.lights_on_hour > -1.0;
    console.log("boolean", bool_result);
    return bool_result;
  }
  validateCreate() {
    return this.state.module_to_create.length > 0;
  }
  validateDelMod() {
    return this.state.module_to_delete.length > 0;
  }

  componentDidMount() {
    this.callData();
    this.callPlants();
    this.callLocation();
  }
  callLocation() {
    app
      .get("/modulegroup_management/get_all_location")
      .then((res) => {
        const loc_data = res.data.locations;
        this.setState({ locations: loc_data });
        console.log("state_loc", this.state.locations);
      })
      .catch((error) => console.log(error));
  }
  callPlants() {
    app
      .get("/plant_management")
      .then((res) => {
        const plt_data = res.data.Data;
        this.setState({ plants: plt_data });
        console.log("state_plant", this.state.plants);
      })
      .catch((error) => console.log(error));
  }
  callData() {
    app
      .get("/modulegroup_management")
      .then((res) => {
        const mod_data = res.data;
        this.setState({ module_groups: mod_data });
        console.log("state", this.state.module_groups);
      })
      .catch((error) => console.log(error));
  }
  handleClick(item) {
    const id = item;
    console.log("current group", id);
    this.setState({ current_group: id });
    Object.keys(this.state.plants).map((plant) => {
      if (
        this.state.plants[plant].plant_id ===
        this.state.module_groups[id].plant_id
      ) {
        this.setState({ dist_plant: this.state.plants[plant].name });
      }
    });
    // alert('You clicked ' + this.state.current_group);
  }
  handleRightClick(stuff) {
    const module = stuff;
    console.log("current module", module);
  }
  handleMove(dest_group) {
    console.log(
      "want to move " +
        this.state.module_to_move +
        " to module group " +
        dest_group
    );
    console.log(this.state.module_groups);
    app
      .post(
        "/modulegroup_management/assign",
        {
          module_group_id: dest_group,
          module_ids: [this.state.module_to_move],
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.status === 200) {
          this.callData();
          this.setState({ show_move: false });
        } else {
          this.setState({ show_alert: true });
        }
      });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  handleSubmit(event) {
    console.log(event);
    const pid = parseInt(this.state.plant_id);
    const lid = parseInt(this.state.location_id);
    const ntds = parseFloat(this.state.tds);
    const nph = parseFloat(this.state.ph);
    const nhu = parseFloat(this.state.humidity);
    const auto = this.state.on_auto;
    const label = this.state.module_group_label;
    const off = parseFloat(this.state.lights_off_hour);
    const on = parseFloat(this.state.lights_on_hour);
    app
      .post(
        "/modulegroup_management/create",
        {
          plant_id: pid,
          location_id: lid,
          tds: ntds,
          ph: nph,
          humidity: nhu,
          on_auto: auto,
          module_group_label: label,
          lights_off_hour: off,
          lights_on_hour: on,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.status === 200) {
          this.callData();
          this.callPlants();
          this.setState({ show_create: false });
        } else {
          this.setState({ show_alert: true });
        }
      });
  }
  handleCreate() {
    console.log("to be created", this.state.module_to_create);
    const cmod = this.state.module_to_create;
    app
      .post(
        "/modulegroup_management/create_module",
        {
          module_label: cmod,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.status === 200) {
          this.callData();
          this.setState({ show_module: false });
        } else {
          this.setState({ show_alert: true });
        }
      });
  }
  handleDeleteModule() {
    console.log("to be deleted", this.state.module_to_delete);
    const dmod = parseInt(this.state.module_to_delete);
    app
      .post(
        "/modulegroup_management/delete_module",
        {
          module_id: dmod,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.status === 200) {
          this.callData();
          this.setState({ show_module: false });
        } else {
          this.setState({ show_alert: true });
        }
      });
  }
  handleDeleteGroup() {
    if (this.state.current_group !== "") {
      const cgroup = parseInt(
        this.state.module_groups[this.state.current_group].module_group_id
      );
      console.log("group to be deleted", cgroup);
      app
        .post(
          "/modulegroup_management/delete_modulegroup",
          {
            module_group_id: cgroup,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.status === 200) {
            this.setState({ current_group: "" });
            this.callData();
            this.setState({ show_del_dialog: false });
          } else {
            this.setState({ show_alert: true });
          }
        });
    } else {
      this.setState({ show_alert: true });
      console.log("current user empty!");
    }
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
  CreateModuleModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Module group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/*parameters form*/}
          {/* "plant_id":INT,
                "location_id":INT,
                "tds":float64,
                "ph":float64,
                "humidity":float64,
                "on_auto":bool,
                "module_group_label":string,
                "lights_off_hour":float64,
                "lights_on_hour":float64 */}
          {props.children}
        </Modal.Body>
      </Modal>
    );
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
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
  ModuleModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
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
  render() {
    return (
      <Container fluid className="center-screen">
        <Alert
          variant={"danger"}
          show={this.state.show_alert}
          onClose={() => this.setState({ show_alert: false })}
          dismissible
        >
          Operation unsuccessful!
        </Alert>
        <Row className="Panels">
          <Col align="center">
            <Card style={{ width: "40rem" }}>
              <Card.Body>
                <Card.Title>Module Groups</Card.Title>
                <Card.Text>
                  After selecting module group, list of modules will be display
                  on right side panel.
                </Card.Text>
              </Card.Body>
              <ListGroup variant="dark">
                {/*module group*/}
                {Object.keys(this.state.module_groups)
                  .sort(
                    (a, b) =>
                      this.state.module_groups[a].module_group_id -
                      this.state.module_groups[b].module_group_id
                  )
                  .map(
                    (item) => (
                      <ListGroupItem
                        action
                        onClick={() => this.handleClick(item)}
                      >
                        {this.state.module_groups[item].module_group_id === 0
                          ? "Unassigned"
                          : item}
                      </ListGroupItem>
                    ),
                    this
                  )}
              </ListGroup>
            </Card>
          </Col>
          <Col align="center">
            <Row>
              <Card style={{ width: "40rem" }}>
                <Card.Body>
                  <Card.Title>Modules</Card.Title>
                </Card.Body>
                <ListGroup variant="dark">
                  {this.state.current_group !== "" ? (
                    this.state.module_groups[
                      this.state.current_group
                    ].Modules.sort((a, b) => a - b).map((module) => (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip}
                      >
                        <ListGroupItem
                          action
                          onClick={() =>
                            this.setState({
                              show_move: true,
                              module_to_move: module,
                            })
                          }
                        >
                          {module}
                        </ListGroupItem>
                      </OverlayTrigger>
                    ))
                  ) : (
                    <div></div>
                  )}
                  <this.MyVerticallyCenteredModal
                    show={this.state.show_move}
                    onHide={() => this.setState({ show_move: false })}
                  >
                    {Object.keys(this.state.module_groups)
                      .sort(
                        (a, b) =>
                          this.state.module_groups[a].module_group_id -
                          this.state.module_groups[b].module_group_id
                      )
                      .map(
                        (item) => (
                          <ListGroupItem
                            action
                            onClick={() =>
                              this.handleMove(
                                this.state.module_groups[item].module_group_id
                              )
                            }
                          >
                            {this.state.module_groups[item].module_group_id ===
                            0
                              ? "Unassigned"
                              : item}
                          </ListGroupItem>
                        ),
                        this
                      )}
                  </this.MyVerticallyCenteredModal>
                </ListGroup>
              </Card>
            </Row>
            <Row>
              <Card style={{ width: "40rem" }}>
                <Card.Body>
                  <Card.Title>Information</Card.Title>
                  {this.state.current_group !== "" ? (
                    <Card.Text>
                      Group name: {this.state.current_group}
                      <br />
                      Plant:{" "}
                      {this.state.dist_plant === ""
                        ? ""
                        : this.state.dist_plant}
                      <br />
                      Location ID:{" "}
                      {
                        this.state.module_groups[this.state.current_group]
                          .location_id
                      }
                      <br />
                      TDS:{" "}
                      {this.state.module_groups[this.state.current_group].tds}
                      <br />
                      PH:{" "}
                      {this.state.module_groups[this.state.current_group].ph}
                      <br />
                      Humidity:{" "}
                      {
                        this.state.module_groups[this.state.current_group]
                          .humidity
                      }
                      <br />
                      Auto:{" "}
                      {this.state.module_groups[this.state.current_group]
                        .on_auto + ""}
                      <br />
                      Light off:{" "}
                      {
                        this.state.module_groups[this.state.current_group]
                          .lights_off_hour
                      }{" "}
                      Hours
                      <br />
                      Light on:{" "}
                      {
                        this.state.module_groups[this.state.current_group]
                          .lights_on_hour
                      }{" "}
                      Hours
                    </Card.Text>
                  ) : (
                    <div></div>
                  )}
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <LinkContainer to="/dashboard" exact>
                <Button
                  variant="dark"
                  style={{ width: "200px" }}
                  onClick={() => {
                    const { setGroupName } = useContext(ModuleDataContext);
                  }}
                >
                  Enter
                </Button>
              </LinkContainer>
            </div>
            <div>
              <Button
                variant="dark"
                onClick={() => this.setState({ show_create: true })}
                style={{ width: "200px" }}
              >
                Create new module group
              </Button>
            </div>
            <div>
              <Button
                variant="dark"
                style={{ width: "200px" }}
                onClick={() => {
                  if (this.state.current_group !== "") {
                    this.setState({ show_del_dialog: true });
                  } else if (this.state.current_group === 0) {
                    this.setState({ show_alert: true });
                    console.log("cant delete unassigned!");
                  } else {
                    this.setState({ show_alert: true });
                    console.log("no current group!");
                  }
                }}
              >
                Delete selected module group
              </Button>
            </div>
          </Col>
          <Col>
            <Button
              style={{ width: "200px" }}
              onClick={() => this.setState({ show_module: true })}
            >
              Modules...
            </Button>
          </Col>
          <this.DeleteDialog
            show={this.state.show_del_dialog}
            onHide={() => this.setState({ show_del_dialog: false })}
          >
            <Modal.Body>
              You are about to delete module group {this.state.current_group} !
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={this.handleDeleteGroup.bind(this)}
              >
                Delete
              </Button>
              <Button onClick={() => this.setState({ show_del_dialog: false })}>
                Cancel
              </Button>
            </Modal.Footer>
          </this.DeleteDialog>
          <this.ModuleModal
            show={this.state.show_module}
            onHide={() => this.setState({ show_module: false })}
          >
            <Form>
              <Form.Group>
                <Row>
                  <Form.Label>Create module</Form.Label>
                  <Form.Control
                    name="module_to_create"
                    placeholder="module name"
                    onChange={this.handleChange.bind(this)}
                  ></Form.Control>
                  <Button
                    variant="info"
                    style={{ width: "200px" }}
                    disabled={!this.validateCreate()}
                    onClick={this.handleCreate.bind(this)}
                  >
                    create
                  </Button>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row>
                  <Form.Label>Delete module</Form.Label>
                  <Form.Control
                    as="select"
                    name="module_to_delete"
                    onChange={this.handleChange.bind(this)}
                  >
                    {Object.keys(this.state.module_groups).map(
                      (item) => (
                        <>
                          {this.state.module_groups[item].Modules.map(
                            (module) => (
                              <option value={module}>{module}</option>
                            )
                          )}
                        </>
                      ),
                      this
                    )}
                  </Form.Control>
                  <Button
                    variant="info"
                    style={{ width: "200px" }}
                    disabled={!this.validateDelMod()}
                    onClick={this.handleDeleteModule.bind(this)}
                  >
                    Delete
                  </Button>
                </Row>
              </Form.Group>
            </Form>
          </this.ModuleModal>
          <this.CreateModuleModal
            show={this.state.show_create}
            onHide={() => this.setState({ show_create: false })}
          >
            <Form>
              <Form.Group>
                <Form.Label>Plants</Form.Label>
                <Form.Control
                  as="select"
                  name="plant_id"
                  onChange={this.handleChange.bind(this)}
                >
                  {Object.keys(this.state.plants).map((item) => (
                    <option value={this.state.plants[item].plant_id}>
                      {this.state.plants[item].name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>location id</Form.Label>
                <Form.Control
                  name="location_id"
                  onChange={this.handleChange.bind(this)}
                  as="select"
                >
                  {Object.keys(this.state.locations).map((item) => (
                    <option value={this.state.locations[item].location_id}>
                      {this.state.locations[item].city}:
                      {this.state.locations[item].province}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>TDS</Form.Label>
                <Form.Control
                  name="tds"
                  onChange={this.handleChange.bind(this)}
                  placeholder="0.0"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>PH</Form.Label>
                <Form.Control
                  name="ph"
                  onChange={this.handleChange.bind(this)}
                  placeholder="0.0"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Humidity</Form.Label>
                <Form.Control
                  name="humidity"
                  onChange={this.handleChange.bind(this)}
                  placeholder="0.0"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Automation</Form.Label>
                <Form.Control
                  name="on_auto"
                  onChange={this.handleChange.bind(this)}
                  as="select"
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Group Label</Form.Label>
                <Form.Control
                  name="module_group_label"
                  onChange={this.handleChange.bind(this)}
                  type="string"
                  placeholder="groupname"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Light off hour</Form.Label>
                <Form.Control
                  name="lights_off_hour"
                  onChange={this.handleChange.bind(this)}
                  placeholder="0.0"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Light on hour</Form.Label>
                <Form.Control
                  name="lights_on_hour"
                  onChange={this.handleChange.bind(this)}
                  placeholder="0.0"
                />
              </Form.Group>

              <Button
                variant="primary"
                disabled={!this.validateForm()}
                onClick={this.handleSubmit.bind(this)}
              >
                Submit
              </Button>
            </Form>
          </this.CreateModuleModal>
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
