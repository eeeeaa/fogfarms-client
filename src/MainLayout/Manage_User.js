import React from 'react';
import '../css_sheet/global_theme.css';
import SignOutButton from './TestFunction/QuickSignOut';

function Manage_user(){
    return(
        <div>
            <h1>manage user</h1>
            <SignOutButton/>
        </div>
    );
}

export default Manage_user;