import React, { useContext, useEffect, useState } from "react";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import app from "../../functions/axiosConfig";
import Button from "react-bootstrap/Button";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";

const ModuleControllerList = () => {
  const { controller, currentModule, sensorModule, loadData } = useContext(
    ModuleDataContext
  );
  const [checkedStatus, setCheckedStatus] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setCheckedStatus(controller?.solenoid_valve || []);
  }, [controller]);

  const updateCheckedStatus = async () => {
    setError(undefined);
    if (sensorModule && controller && !isLoading) {
      try {
        setLoading(true);
        const { fogger: foggers, led: leds, mixer: mixers } = controller;
        const res = await app.post("/dashboard/update_device_status", {
          module_id: sensorModule.module_id,
          foggers,
          leds,
          mixers,
          solenoid_valves: checkedStatus,
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

  const toggleChecked = (checked, index) => {
    setCheckedStatus(
      checkedStatus.map((v, i) => {
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
            {checkedStatus.map((checked, y) => {
              return (
                <span key={y}>
                  <h6 className="control-equip">Valves {y}</h6>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => toggleChecked(e.target.checked, y)}
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
