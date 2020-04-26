import React from "react";
import "../../css_sheet/global_theme.css";
import ModuleSelect from "../components/ModuleGroup/ModuleSelect";
import ModuleControllerHeader from "../components/ModuleController/ModuleControllerHeader";
import ModuleDataContextProvider from "../contexts/ModuleDataContext";
import ModuleDataGraph from "../components/ModuleData/ModuleDataGraph";
import ModuleDataGrowUnit from "../components/ModuleData/ModuleDataGrowUnit";
import { Container, Row, Col } from "react-bootstrap";
import ModuleControllerTabs from "../components/ModuleController/ModuleControllerTabs";

const Dashboard = () => {
  return (
    <div className="dashBoard">
      <Container>
        <Row>
          <ModuleDataContextProvider>
            <Col>
              <ModuleSelect />
            </Col>
            <Col xs={6}>
              <ModuleDataGraph />
              <ModuleDataGrowUnit />
            </Col>
            <Col>
              <ModuleControllerHeader />
              <ModuleControllerTabs />
            </Col>
          </ModuleDataContextProvider>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
