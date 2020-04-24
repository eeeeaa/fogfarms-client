import React, { useContext, useState } from 'react';
import ControllerDetail from './ControllerDetail';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const ModuleControllerList = () => {
	const { controllers } = useContext(ModuleDataContext);
	const fogger = controllers.fogger
	const led = controllers.led
	const mixer = controllers.mixer
	const solenoid_valve = controllers.solenoid_valve
	const [test, setTest] = useState([false,false])
	console.log("Controllers : ", test)
	// setTest([true,false])
	// console.log("Controllers : ", test)
	
	return <div className="controller-list">
				<ul>
					hi
					{/* {console.log("Testing : ",allCon?.fogger)} */}
				</ul>
			</div>
};

export default ModuleControllerList;

{/* {allCon?.map((con) => {
						console.log(con)
						return <ControllerDetail con={con} />;
					})} */}