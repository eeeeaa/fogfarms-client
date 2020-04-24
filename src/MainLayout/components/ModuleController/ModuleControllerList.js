import React, { useContext, useState } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';

const ModuleControllerList = () => {
	const { controllers, foggers, leds, mixers, solenoid_valves } = useContext(ModuleDataContext);
	return <div className="controller-list">
				<ul>
					{
					solenoid_valves?.map((x,y)=> {
						console.log("valves : ",solenoid_valves)
						return <span>
							<h6 className="control-equip">Valves {y}</h6>
							<input type="checkbox" className="slide"></input>
						</span>
						
					})
					}
				</ul>
			</div>
};

export default ModuleControllerList;