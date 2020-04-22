import React, { useContext, useState } from 'react';
import { ModuleDataContext } from '../../contexts/ModuleDataContext';
import Module from './Module';
import ModuleSelectHeader from './ModuleSelectHeader';

const ModuleSelect = () => {
	const { datas } = useContext(ModuleDataContext);
	const [currentModule, setCurrentModule] = useState('allmodule');
	// console.log('Modules Group datas: ', datas[0]?.controller); but whyyyyyyy
	return <div className="moduleSelect">
				<ModuleSelectHeader />
				<div className='module-list'>
					<ul>
						<li onClick={() => {setCurrentModule('allmodule')}}>
							<div className="moduleName">
								All Modules
							</div>
						</li>
						{/* fix here */}
						{datas.map((data) => {
							console.log("Module Select :",data.controller)
							return <Module name={data.name}/>;
						})}
					</ul>
				</div>
			</div>
		};

export default ModuleSelect;