import React from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';


const LabHome = (props) => {
    return (
        <div className='verticalFlex main-container'>
            <h1 style={{'margin':'10px'}}>Lab Home</h1>
            <Link to="/labtech/collect" labid={props.labid} className="btn btn-outline-primary" style={{margin:'10px', width:'170px'}}>Test Collection</Link>
            <Link to="/labtech/pool" labid={props.labid} className="btn btn-outline-primary" style={{margin:'10px', width:'170px'}}>Pool Mapping</Link>
            <Link to="/labtech/well" labid={props.labid} className="btn btn-outline-primary" style={{margin:'10px', width:'170px'}}>Well Testing</Link>
        </div>   
    )
}

export default LabHome;