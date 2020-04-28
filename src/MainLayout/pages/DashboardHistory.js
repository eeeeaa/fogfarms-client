import React from "react";
import "../../css_sheet/global_theme.css";
import ModuleSelect from "../components/ModuleGroup/ModuleSelect";
import ModuleControllerHeader from "../components/ModuleController/ModuleControllerHeader";
import ModuleContextProvider from "../contexts/ModuleContext";
import ModuleHistory from "../components/History/ModuleHistory";
import { Container, Row, Col, Card } from "react-bootstrap";
import ModuleControllerTabs from "../components/ModuleController/ModuleControllerTabs";
import "../../css_sheet/dashboard.css";
import "../../css_sheet/notFromCode.css";

const DashboardHistory = () => {
  return (
    <div className="dashBoard">
      <Container>
        <Row>
          <ModuleContextProvider>
            <Col>
              <ModuleSelect />
            </Col>
            <Col xs={6}>
              <Card>
                <Card.Body>
                  <ModuleHistory />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <ModuleControllerHeader />
              <ModuleControllerTabs />
            </Col>
          </ModuleContextProvider>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardHistory;
