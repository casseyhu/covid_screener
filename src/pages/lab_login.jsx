import React from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';

const LabLogin = () => {
    return (
        <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
            'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_GREEN}}>
            <div className="loginBox">
                <h1 style={{'margin':'10px'}}>Lab Worker Login</h1>
                <input className='loginInput' type='email' placeholder='Email'></input>
                <input className='loginInput' type='password' placeholder='Password'></input>
                <Link to="/labtech/collect" className="btn btn-outline-primary" style={{'margin':'10px'}}>Login Collector</Link>
                <Link to="/labtech/home" className="btn btn-outline-primary" style={{'margin':'5px'}}>Lab Login</Link>
            </div> 
        </div>
    )
}

export default LabLogin;