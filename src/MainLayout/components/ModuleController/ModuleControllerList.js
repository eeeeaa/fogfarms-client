import React, { useContext, useEffect, useState } from "react";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import app from "../../functions/axiosConfig";
import Button from "react-bootstrap/Button";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";

const ModuleControllerList = () => {
  const { controller, sensorModule, loadData } = useContext(ModuleDataContext);
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
    setCheckedStatus((status) => {
      return {
        ...status,
        [key]: status[key].map((v, i) => {
          if (i === index) {
            return checked;
          } else {
            return v;
          }
        }),
      };
    });
  };

  return (
    <div className="controller-list">
      {controller && checkedStatus ? (
        <>
          <ul>
            {checkedStatus.fogger.map((checked, y) => {
              return (
                <span key={y}>
                  <h6 className="control-equip">Fogger {y + 1}</h6>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      toggleChecked("fogger", e.target.checked, y)
                    }
                    className="slide"
                  ></input>
                </span>
              );
            })}
            {checkedStatus.led.map((checked, y) => {
              return (
                <span key={y}>
                  <h6 className="control-equip">Led {y + 1}</h6>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => toggleChecked("led", e.target.checked, y)}
                    className="slide"
                  ></input>
                </span>
              );
            })}
            {checkedStatus.mixer.map((checked, y) => {
              return (
                <span key={y}>
                  <h6 className="control-equip">Mixer {y + 1}</h6>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      toggleChecked("mixer", e.target.checked, y)
                    }
                    className="slide"
                  ></input>
                </span>
              );
            })}
            {checkedStatus.solenoid_valve.map((checked, y) => {
              return (
                <span key={y}>
                  <h6 className="control-equip">Valves {y + 1}</h6>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      toggleChecked("solenoid_valve", e.target.checked, y)
                    }
                    className="slide"
                  ></input>
                </span>
              );
            })}
          </ul>
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
        closeText="don't close me senpai"
        title="U sure bro?"
        message="This will break na"
        confirmText="Break pai loey"
        loading={isLoading}
        error={error}
      />
    </div>
  );
};

export default ModuleControllerList;
