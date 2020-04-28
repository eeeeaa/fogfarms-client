import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import app from "../../functions/axiosConfig";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { FormControlLabel } from "@material-ui/core";

const ModuleParameterControl = () => {
  const { sensorModule, loadData, groupName } = useContext(ModuleDataContext);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowAuto, setModalShowAuto] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [onAuto, setOnAuto] = useState(false);
  const [currentGroupData, setCurrentGroupData] = useState({});

  const [tds, setTds] = useState();
  const [ph, setPh] = useState();
  const [humidity, setHumidity] = useState();
  const [time_on, setTime_on] = useState();
  const [time_off, setTime_off] = useState();

  const updateCheckedStatus = async () => {
    setError(undefined);
    if (!isLoading) {
      try {
        setLoading(true);
        const res = await app.post("/dashboard/set_env_param", {
          module_group_id: groupName,
          tds: tds,
          ph: ph,
          humidity: humidity,
          lights_on_hour: time_on,
          lights_off_hour: time_off,
        });
        loadData();
        recievePost();
        setModalShow(false);
      } catch {
        setError("something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const updateAutoStatus = async () => {
    setError(undefined);
    if (!isLoading) {
      try {
        setLoading(true);
        console.log(groupName);
        const res = await app.post("/dashboard/toggle_auto", {
          module_group_id: groupName,
        });
        setOnAuto(!onAuto);
        setModalShowAuto(false);
      } catch {
        setError("something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  useEffect(() => {
    recievePost();
  }, []);

  const recievePost = () => {
    app
      .post("/dashboard/module_group", {
        module_group_id: groupName,
      })
      .then((res) => {
        const receivedData = res.data.on_auto;
        setCurrentGroupData(res.data);
        setOnAuto(receivedData);
      });
  };

  return (
    <div>
      <Form>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={onAuto}
              onClick={() => setModalShowAuto(true)}
            />
          }
          label={`On Auto`}
        />
        <Form.Group controlId="formTDS">
          <Form.Label>TDS Current : {currentGroupData.tds}</Form.Label>
          <Form.Control
            required
            type="number"
            step="10"
            value={tds}
            onChange={(e) => setTds(parseInt(e.target.value, 10))}
            placeholder="Range: 540-860"
          />
        </Form.Group>
        <Form.Group controlId="formPh">
          <Form.Label>Ph Current : {currentGroupData.ph}</Form.Label>
          <Form.Control
            required
            type="number"
            value={ph}
            onChange={(e) => setPh(parseInt(e.target.value, 10))}
            min="1"
            max="14"
            step="0.1"
            placeholder="1-14"
          />
        </Form.Group>
        <Form.Group controlId="formHumidity">
          <Form.Label>
            Humidity Current : {currentGroupData.humidity}%
          </Form.Label>
          <Form.Control
            required
            type="number"
            value={humidity}
            onChange={(e) => setHumidity(parseInt(e.target.value, 10))}
            min="0"
            max="100"
            step="0.1"
            placeholder="x %"
          />
        </Form.Group>
        <Form.Group controlId="formLightOn">
          <Form.Label>
            Lights On Hour Current : {currentGroupData.lights_on_hour}
          </Form.Label>
          <Form.Control
            required
            type="number"
            value={time_on}
            onChange={(e) => setTime_on(parseInt(e.target.value, 10))}
            placeholder="2.5 = 2 hour 30 min"
          />
        </Form.Group>
        <Form.Group controlId="formLightoff">
          <Form.Label>
            Lights Off Hour Current : {currentGroupData.lights_off_hour}
          </Form.Label>
          <Form.Control
            required
            type="number"
            value={time_off}
            onChange={(e) => setTime_off(parseInt(e.target.value, 10))}
            placeholder="2.5 = 2 hour 30 min"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setModalShow(true);
          }}
        >
          Submit
        </Button>
      </Form>
      <ConfirmationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={() => {
          updateCheckedStatus();
        }}
        closeText="Back"
        title="Adjust Parameters"
        message="Are you sure you want to make the change?"
        confirmText="Confirm"
        loading={isLoading}
        error={error}
      />
      <ConfirmationModal
        show={modalShowAuto}
        onHide={() => setModalShowAuto(false)}
        onConfirm={() => {
          updateAutoStatus();
        }}
        closeText="Back"
        title="Auto Setting"
        message="Are you sure you want to make the change?"
        confirmText="Confirm"
        loading={isLoading}
        error={error}
      />
    </div>
  );
};

export default ModuleParameterControl;
