import React from 'react';
import '../../css_sheet/global_theme.css';
import ModuleSelect from '../components/ModuleGroup/ModuleSelect';
import ModuleContextProvider from '../contexts/ModuleContext';
import ModuleSelectHeader from '../components/ModuleGroup/ModuleSelectHeader';
import ControlledContextProvider from '../contexts/ControlledContext';
import ModuleControllerHeader from '../components/ModuleController/ModuleControllerHeader';
import ModuleDataContextProvider from '../contexts/ModuleDataContext';
import ModuleDataGraph from '../components/ModuleData/ModuleDataGraph';
import ModuleDataGrowUnit from '../components/ModuleData/ModuleDataGrowUnit';
import { Container, Row, Col } from 'react-bootstrap';
import ModuleControllerTabs from '../components/ModuleController/ModuleControllerTabs';
import SignoutButton from '../TestFunction/QuickSignOut';

const Dashboard = () => {
	return (
		<div className="dashBoard">
			<Container>
				<Row>
					<Col>
						<ModuleContextProvider>
							<ModuleSelectHeader />
							<ModuleSelect />
						</ModuleContextProvider>
					</Col>
					<Col xs={6}>
						<ModuleDataContextProvider>
							<ModuleDataGraph />
							<ModuleDataGrowUnit />
						</ModuleDataContextProvider>
					</Col>
					<Col>
						<ControlledContextProvider>
							<ModuleControllerHeader />
							<ModuleControllerTabs />
						</ControlledContextProvider>
					</Col>
				</Row>
			</Container>
			<SignoutButton />
		</div>
	);
};

export default Dashboard;
