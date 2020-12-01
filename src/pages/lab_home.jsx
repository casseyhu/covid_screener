import React from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';


const LabHome = (props) => {
    return (
        <>
        <div className='verticalFlex main-container' id='labHomeCont'>
            <div className="labHomeWrap">
                <h1 style={{'margin':'10px'}}>Welcome back to your lab!</h1>
                <p>Select one to continue.</p>
                <Link to="/labtech/collect" labid={props.labid} className="loginBtn" style={{margin:'10px'}}>Test Collection</Link>
                <Link to="/labtech/pool" labid={props.labid} className="loginBtn" style={{margin:'10px'}}>Pool Mapping</Link>
                <Link to="/labtech/well" labid={props.labid} className="loginBtn" style={{margin:'10px'}}>Well Testing</Link>
            </div>
            <svg className="labWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><defs><linearGradient id="labGrad"  x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1D2C7C" /><stop offset="100%" stop-color="#061874" /></linearGradient>
                </defs><path fill="url(#labGrad)" fill-opacity="1" d="M0,192L13.3,165.3C26.7,139,53,85,80,90.7C106.7,96,133,160,160,197.3C186.7,235,213,245,240,256C266.7,267,293,277,320,261.3C346.7,245,373,203,400,160C426.7,117,453,75,480,96C506.7,117,533,203,560,213.3C586.7,224,613,160,640,154.7C666.7,149,693,203,720,224C746.7,245,773,235,800,192C826.7,149,853,75,880,80C906.7,85,933,171,960,224C986.7,277,1013,299,1040,277.3C1066.7,256,1093,192,1120,160C1146.7,128,1173,128,1200,138.7C1226.7,149,1253,171,1280,165.3C1306.7,160,1333,128,1360,133.3C1386.7,139,1413,181,1427,202.7L1440,224L1440,320L1426.7,320C1413.3,320,1387,320,1360,320C1333.3,320,1307,320,1280,320C1253.3,320,1227,320,1200,320C1173.3,320,1147,320,1120,320C1093.3,320,1067,320,1040,320C1013.3,320,987,320,960,320C933.3,320,907,320,880,320C853.3,320,827,320,800,320C773.3,320,747,320,720,320C693.3,320,667,320,640,320C613.3,320,587,320,560,320C533.3,320,507,320,480,320C453.3,320,427,320,400,320C373.3,320,347,320,320,320C293.3,320,267,320,240,320C213.3,320,187,320,160,320C133.3,320,107,320,80,320C53.3,320,27,320,13,320L0,320Z"></path></svg>
        </div>   
        </>
    )
}

export default LabHome;