import React, { useContext } from "react";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import ModuleDataDetail from "./ModuleDataDetail";
import { Card, CardColumns} from "react-bootstrap";
import Image from 'react-bootstrap/Image'

const ModuleDataGrowUnit = () => {
  const { sensorModule, nutrient_amount } = useContext(ModuleDataContext);
  return (
    <div className="grow-list">
      <ul>
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
            <p>hihi</p>)
        }
      </ul>
    </div>
  );
};

export default ModuleDataGrowUnit;
