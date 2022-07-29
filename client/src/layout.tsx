import React, {useEffect} from 'react';
import {Outlet} from 'react-router';

function Layout() {
    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default Layout;