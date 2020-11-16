import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './pages/index';
import LabLogin from './pages/lab_login';
import LabHome from './pages/lab_home';
import TestCollection from './pages/test_collection';
import PoolMapping from './pages/pool_mapping';
import WellTesting from './pages/well_testing';
import EmployeeLogin from './pages/employee_login';
import EmployeeHome from './pages/employee_home';


function App() {
    return <BrowserRouter>
        <Switch>
            {/* Let user choose between lab worker login or employee login */}
            <Route exact path="/" component={MainPage}/>
            {/* For lab worker login  */}
            <Route exact path="/lab" component={LabLogin}/>
                {/* When user clicks lab login during login */}
                <Route exact path="/lab/home" component={LabHome}/>
                    {/* When user clicks pool mapping from lab home */}
                    <Route exact path="/lab/pool" component={PoolMapping}/>
                    {/* When user clicks well testing from lab home */}
                    <Route exact path="/lab/well" component={WellTesting}/>
                {/* When user clicks login collector during login */}
                <Route exact path="/lab/collect" component={TestCollection}/>
            {/* For employee login to check results */}
            <Route exact path="/employee" component={EmployeeLogin}/>
                {/* Display results for employee after login */}
                <Route exact path="/employee/home" component={EmployeeHome}/>
        </Switch>
    </BrowserRouter>

}

export default App;
