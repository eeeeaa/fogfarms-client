import React, { useContext } from 'react';
import '../../css_sheet/global_theme.css';
import SignOutButton from '../TestFunction/QuickSignOut';

function Manage_module(){
    return(
        <div>
            <h1>manage module</h1>
            <SignOutButton/>
        </div>
    );
}
export default Manage_module;