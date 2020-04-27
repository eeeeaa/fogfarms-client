import React, { useContext, useEffect, useState } from "react";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import app from "../../functions/axiosConfig";
import Button from "react-bootstrap/Button";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { ModuleContext } from "../../contexts/ModuleContext";

const ModuleControllerList = () => {
  const { controller, sensorModule, loadData } = useContext(ModuleDataContext);
  const { modules } = useContext(ModuleContext);
  const [checkedStatus, setCheckedStatus] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setCheckedStatus(controller);
  }, [controller]);

  const updateCheckedStatus = async () => {
    setError(undefined);
    if (sensorModule && controller && !isLoading) {
      try {
        setLoading(true);
        const res = await app.post("/dashboard/update_device_status", {
          module_id: sensorModule.module_id,
          foggers: checkedStatus.fogger,
          leds: checkedStatus.led,
          mixers: checkedStatus.mixer,
          solenoid_valves: checkedStatus.solenoid_valve,
        });
        loadData();
        setModalShow(false);
      } catch {
        setError("something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleChecked = (key, checked, index) => {
    setCheckedStatus((status) => ({
      ...status,
      [key]: status[key].map((v, i) => {
        if (i === index) {
          return checked;
        } else {
          return v;
        }
      }),
    }));
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

  return (
    <div className="controller-list">
      {controller && checkedStatus ? (
        <>
          <FormGroup>
            {checkedStatus.fogger.map((checked, y) => {
              return (
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={checked}
                      onChange={(e) =>
                        toggleChecked("fogger", e.target.checked, y)
                      }
                    />
                  }
                  label={`Fogger Box${y + 1}`}
                />
              );
            })}
            {checkedStatus.led.map((checked, y) => {
              return (
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={checked}
                      onChange={(e) =>
                        toggleChecked("led", e.target.checked, y)
                      }
                    />
                  }
                  label={`Led Box ${y + 1}`}
                />
              );
            })}
            {checkedStatus.mixer.map((checked, y) => {
              return (
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={checked}
                      onChange={(e) =>
                        toggleChecked("mixer", e.target.checked, y)
                      }
                    />
                  }
                  label={`Mixer Box ${y + 1}`}
                />
              );
            })}
            {checkedStatus.solenoid_valve.map((checked, y) => {
              return (
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={checked}
                      onChange={(e) =>
                        toggleChecked("solenoid_valve", e.target.checked, y)
                      }
                    />
                  }
                  label={`Valve Box ${y + 1}`}
                />
              );
            })}
          </FormGroup>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Save changes
          </Button>
        </>
      ) : (
        <p>Please select module</p>
      )}
      <ConfirmationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={() => updateCheckedStatus()}
        closeText="Back"
        title="Adjust Equiment"
        message="Are you sure you want to make the change?"
        confirmText="Confirm"
        loading={isLoading}
        error={error}
      />
    </div>
  );
};

export default ModuleControllerList;
