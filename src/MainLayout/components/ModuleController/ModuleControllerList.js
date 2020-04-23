import React, { useContext } from 'react';
import ControllerDetail from './ControllerDetail';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const ModuleControllerList = () => {
	const { datas } = useContext(ModuleDataContext);
	const cons = datas[0]?.controller;
	const allCon = {foggger:cons?.fogger , led:cons?.led ,mixer:cons?.mixer ,solenoid_valve:cons?.solenoid_valve} 
	return <div className="controller-list">
				<ul>
					{console.log("Testing : ",allCon?.fogger)}
				</ul>
			</div>
};

export default ModuleControllerList;

{/* {allCon?.map((con) => {
						console.log(con)
						return <ControllerDetail con={con} />;
					})} */}