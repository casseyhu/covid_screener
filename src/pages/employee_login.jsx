import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Constants from '../constants';


class EmployeeLogin extends Component {
    
    
    
    render(){
        return (
            <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
                'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_GREEN}}>
                <h1 style={{'margin':'10px'}}>Employee Login</h1>
                <form style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
                'flexDirection':'column'}}>
                    <input class='loginInput' type='email' placeholder='email'></input>
                    <input class='loginInput' type='password' placeholder='password'></input>
                    <Link to="/employee/home" className="btn btn-outline-primary" style={{'margin':'5px'}}>Login</Link>
                </form>
            </div> 
        )
    }
}

export default EmployeeLogin;