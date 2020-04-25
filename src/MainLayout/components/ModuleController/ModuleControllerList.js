import React, { useContext, useEffect, useState } from "react";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import app from "../../functions/axiosConfig";
import Button from "react-bootstrap/Button";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";

const ModuleControllerList = () => {
  const { controller, sensorModule, loadData } = useContext(
    ModuleDataContext
  );
  const [checkedStatusFogger, setCheckedStatusFogger] = useState();
  const [checkedStatusLed, setCheckedStatusLed] = useState();
  const [checkedStatusMixer, setCheckedStatusMixer] = useState();
  const [checkedStatusValve, setCheckedStatusValve] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setCheckedStatusFogger(controller?.fogger || []);
    setCheckedStatusLed(controller?.led || []);
    setCheckedStatusMixer(controller?.mixer || []);
    setCheckedStatusValve(controller?.solenoid_valve || []);
  }, [controller]);

  const updateCheckedStatus = async () => {
    setError(undefined);
    if (sensorModule && controller && !isLoading) {
      try {
        setLoading(true);
        const res = await app.post("/dashboard/update_device_status", {
          module_id: sensorModule.module_id,
          foggers:checkedStatusFogger,
          leds:checkedStatusLed,
          mixers:checkedStatusMixer,
          solenoid_valves: checkedStatusValve,
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

  const toggleCheckedF = (checked, index) => {
    setCheckedStatusFogger(
      checkedStatusFogger.map((v, i) => {
        if (i === index) {
          return checked;
        } else {
          return v;
        }
      })
    );
  };
  const toggleCheckedL = (checked, index) => {
    setCheckedStatusLed(
      checkedStatusLed.map((v, i) => {
        if (i === index) {
          return checked;
        } else {
          return v;
        }
      })
    );
  };
  const toggleCheckedM = (checked, index) => {
    setCheckedStatusMixer(
      checkedStatusMixer.map((v, i) => {
        if (i === index) {
          return checked;
        } else {
          return v;
        }
      })
    );
  };
  const toggleCheckedV = (checked, index) => {
    setCheckedStatusValve(
      checkedStatusValve.map((v, i) => {
        if (i === index) {
          return checked;
        } else {
          return v;
        }
      })
    );
  };

  return (
    <div className="controller-list">
      {controller ? (
        <>
          <ul>
            {checkedStatusFogger.map((checked, y) => {
              return (
                <span key={y}>
                  <h6 className="control-equip">Fogger {y + 1}</h6>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => toggleCheckedF(e.target.checked, y)}
                    className="slide"
                  ></input>
                </span>
              );
            })}
            {checkedStatusLed.map((checked, y) => {
              return (
                <span key={y}>
                  <h6 className="control-equip">Led {y + 1}</h6>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => toggleCheckedL(e.target.checked, y)}
                    className="slide"
                  ></input>
                </span>
              );
            })}
            {checkedStatusMixer.map((checked, y) => {
              return (
                <span key={y}>
                  <h6 className="control-equip">Mixer {y + 1}</h6>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => toggleCheckedM(e.target.checked, y)}
                    className="slide"
                  ></input>
                </span>
              );
            })}
            {checkedStatusValve.map((checked, y) => {
              return (
                <span key={y}>
                  <h6 className="control-equip">Valves {y + 1}</h6>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => toggleCheckedV(e.target.checked, y)}
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
