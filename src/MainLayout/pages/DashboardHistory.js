import React from "react";
import "../../css_sheet/global_theme.css";
import ModuleSelect from "../components/ModuleGroup/ModuleSelect";
import ModuleControllerHeader from "../components/ModuleController/ModuleControllerHeader";
import ModuleDataContextProvider from "../contexts/ModuleDataContext";
import ModuleContextProvider from "../contexts/ModuleContext";
import ModuleHistory from "../components/History/ModuleHistory";
import { Container, Row, Col } from "react-bootstrap";
import ModuleControllerTabs from "../components/ModuleController/ModuleControllerTabs";
import "../../css_sheet/dashboard.css";
import "../../css_sheet/notFromCode.css";
import ModuleHistoryContextProvider from "../contexts/ModuleHistoryContext";

const DashboardHistory = () => {
  return (
    <div className="dashBoard">
      <Container>
        <Row>
          <ModuleHistoryContextProvider>
            <ModuleDataContextProvider>
              <ModuleContextProvider>
                <Col>
                  <ModuleSelect />
                </Col>
                <Col xs={6}>
                  <ModuleHistory />
                </Col>
                <Col>
                  <ModuleControllerHeader />
                  <ModuleControllerTabs />
                </Col>
              </ModuleContextProvider>
            </ModuleDataContextProvider>
          </ModuleHistoryContextProvider>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardHistory;
