import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';

const LabHome = (props) => {

    useEffect( () => {
        if (props.location.labid){
            localStorage.setItem('labID', props.location.labid);
        }
    }, [props.location.labid])

    return (
        <>
        <div className='verticalFlex main-container' id='labHomeCont'>
            <div className="labHomeWrap">
                <h1>⚗️</h1>
                <h1 style={{'margin':'10px'}}>Lab Tech Home</h1>
                <p>Select one to continue.</p>
                <Link to="/labtech/collect" className="loginBtn" style={{margin:'10px'}}>Test Collection</Link>
                <Link to="/labtech/pool" className="loginBtn" style={{margin:'10px'}}>Pool Mapping</Link>
                <Link to="/labtech/well" className="loginBtn" style={{margin:'10px'}}>Well Testing</Link>
            </div>
            {Constants.LAB_WAVE}
            
        </div>   
        </>
    )
}

export default LabHome;