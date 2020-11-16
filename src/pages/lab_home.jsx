import React from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';


const LabHome = () => {
    return (
        <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
            'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_BLUE}}>
            <h1 style={{'margin':'10px'}}>Lab Home</h1>
            <Link to="/lab/pool" className="btn btn-outline-primary" style={{'margin':'10px'}}>Pool Mapping</Link>
            <Link to="/lab/well" className="btn btn-outline-primary" style={{'margin':'10px'}}>Well Testing</Link>
        </div>   
    )
}

export default LabHome;