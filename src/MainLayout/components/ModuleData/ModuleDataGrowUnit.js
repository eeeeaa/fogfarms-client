import React, { useContext } from "react";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import { Card, CardColumns} from "react-bootstrap";

const ModuleDataGrowUnit = () => {
  const { sensorModule, nutrient_amount } = useContext(ModuleDataContext);
  return (
    <div className="growListBox">
      {
        sensorModule ? (
          <div>
            <CardColumns>
              {sensorModule.grow_unit_lux.map((data, index) => {
                return(
                  <Card
                    bg={"dark"}
                  >
                    <Card.Body>
                      <Card.Title>Grow Unit {index + 1}</Card.Title>
                      <Card.Text>Lux: {sensorModule.grow_unit_lux[index]}</Card.Text>
                      <Card.Text>Humidity: {sensorModule.grow_unit_humidity[index]}</Card.Text>
                      <Card.Text>Temp: {sensorModule.grow_unit_temp[index]}</Card.Text>
                    </Card.Body>
                  </Card>
                )
              })}
            </CardColumns>
          </div>
        ) : (
          <p>No Module has been selected at the moment</p>)
      }
    </div>
  );
};

export default ModuleDataGrowUnit;
