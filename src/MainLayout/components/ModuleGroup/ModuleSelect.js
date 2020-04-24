import React, { useContext, useState } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';
import Module from './Module';
import ModuleSelectHeader from './ModuleSelectHeader';

const ModuleSelect = () => {
	const { datas, currentModule, setCurrentModule} = useContext(ModuleDataContext);
	return <div className="moduleSelect">
				<ModuleSelectHeader />
				<div className='module-list'>
					<ul>
						<li onClick={() => {setCurrentModule('allmodule')}}>
							<div className="moduleName">
								All Modules
							</div>
						</li>
						{datas.map((data) => {
							return <li onClick={() => {setCurrentModule(data.name)}}>
									<Module name={data.name}/></li>
						})}
					</ul>
				</div>
			</div>
		};

export default ModuleSelect;