import React from 'react';
import { Link } from 'react-router-dom';


const EmployeeLogin = () => {
    return (
        <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
            'height':'100vh', 'flexDirection':'column', 'backgroundColor':'skyblue'}}>
            <h1 style={{'margin':'10px'}}>Employee Login</h1>
            <input type='email' placeholder='email'></input>
            <input type='password' placeholder='password'></input>
            <Link to="/employee/home" className="btn btn-outline-primary" style={{'margin':'5px'}}>Login</Link>
        </div> 
    )
}

export default EmployeeLogin;