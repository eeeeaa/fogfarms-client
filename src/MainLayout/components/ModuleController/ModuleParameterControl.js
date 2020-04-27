import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';
import app from '../../functions/axiosConfig';

const ModuleParameterControl = () => {
  const {sensorModule, loadData} = useContext(ModuleDataContext)
  const [modalShow, setModalShow] = useState(false)
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [tds, setTds] = useState()
  const [ph, setPh] = useState()
  const [humidity, setHumidity] = useState()
  const [time_on, setTime_on] = useState()
  const [time_off, setTime_off] = useState()

  const updateCheckedStatus = async () => {
    setError(undefined);
    if (sensorModule && !isLoading) {
      try {
        setLoading(true);
        const res = await app.post("/dashboard/set_env_parameter", {
          module_id: sensorModule.module_id,
          tds:tds,
          ph:ph,
          humidity:humidity,
          lights_on_hour:time_on,
          lights_off_hour:time_off
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

    return ( 
        <div>
          <Form>
            <Form.Check 
              type="switch"
              id="custom-switch"
              label="Check this switch"
            />
            <Form.Group controlId="formTDS">
              <Form.Label>TDS Value</Form.Label>
              <Form.Control 
              required
              type="number" 
              step="10" 
              value={tds}
              onChange={(e) => setTds(e.target.value)}
              placeholder="Recommened Value 540-860" />
            </Form.Group>
            <Form.Group controlId="formPh">
              <Form.Label>Ph value</Form.Label>
              <Form.Control
              required
              type="number"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
              min="1" 
              max="14" 
              step="0.1" 
              placeholder="1-14" />
            </Form.Group>
            <Form.Group controlId="formHumidity">
              <Form.Label>Humidity Percentage</Form.Label>
              <Form.Control 
              required
              type="number" 
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              min="0" 
              max="100" 
              step="0.1" 
              placeholder="x %" />
            </Form.Group>
            <Form.Group controlId="formLightOn">
              <Form.Label>Lights On Hour</Form.Label>
              <Form.Control 
              required
              type="number" 
              value={time_on}
              onChange={(e) => setTime_on(e.target.value)}
              placeholder="2.5 = 2 hour 30 min" />
            </Form.Group>
            <Form.Group controlId="formLightoff">
              <Form.Label>Lights Off Hour</Form.Label>
              <Form.Control 
              required
              type="number" 
              value={time_off}
              onChange={(e) => setTime_off(e.target.value)}
              placeholder="2.5 = 2 hour 30 min" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={() => setModalShow(true)}>
              Submit
            </Button>
          </Form>
          <ConfirmationModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          onConfirm = {() => updateCheckedStatus()}
          closeText="Back"
          title="Adjust Parameters"
          message="Are you sure you want to make the change?"
          confirmText="Confirm"
          loading={isLoading}
          error={error}
        />
        </div>
     );
}
 
export default ModuleParameterControl;