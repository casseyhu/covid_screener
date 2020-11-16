import React from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';

const LabLogin = () => {
    return (
        <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
            'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_GREEN}}>
            <h1 style={{'margin':'10px'}}>Lab Worker Login</h1>
            <input class='loginInput' type='email' placeholder='email'></input>
            <input class='loginInput' type='password' placeholder='password'></input>
            <Link to="/lab/collect" className="btn btn-outline-primary" style={{'margin':'10px'}}>Login Collector</Link>
            <Link to="/lab/home" className="btn btn-outline-primary" style={{'margin':'5px'}}>Lab Login</Link>
        </div> 
    )
}

export default LabLogin;