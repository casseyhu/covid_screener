import React from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';


const LabHome = () => {
    return (
        <div className='verticalFlex main-container'>
            <h1 style={{'margin':'10px'}}>Lab Home</h1>
            <Link to="/labtech/pool" className="btn btn-outline-primary" style={{'margin':'10px'}}>Pool Mapping</Link>
            <Link to="/labtech/well" className="btn btn-outline-primary" style={{'margin':'10px'}}>Well Testing</Link>
        </div>   
    )
}

export default LabHome;