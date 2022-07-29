// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";

import MainHome from "./App";

function Buttons() {
    return (
        <Router>
            <Routes>
                <Route path = "" element = {<MainHome/>}/>
            </Routes>
        </Router>
    );
};

export default Buttons;
