import React, { useContext } from 'react';
import '../../css_sheet/global_theme.css';
import SignOutButton from '../TestFunction/QuickSignOut';
import { ModuleDataContext } from '../contexts/ModuleDataContext';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Manage_module(){
    const {fetchPost} = useContext(ModuleDataContext)
    let history = useHistory();
    const group_id = {
		module_group_id: 1
	}
    return(
        <div>
            <h1>manage module</h1>
            <Button onClick={() => {fetchPost('/dashboard', group_id); history.push('/dashboard')}}>Module Group 1</Button>
            <SignOutButton/>
        </div>
    );
}
export default Manage_module;