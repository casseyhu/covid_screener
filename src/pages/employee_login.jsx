import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Constants from '../constants';
import axios from 'axios';


class EmployeeLogin extends Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: ''
        }
    }
    
    login = (event) => {
        event.preventDefault();
        console.log("Employee login in with credentials: ", this.state.email, this.state.password);
        axios.get('/employee/login', {params: { email: this.state.email, 
            pass: this.state.password }}).then(response => {
                console.log("Query result is: ", response.data[0])
                if(response.data === '' || response.data.length === undefined || response.data.length === 0){
                    console.log("Null result, can't log in. Make error animation?");
                }
                else {
                    // Login was successful, the return should be employee ID. How to load the 
                    // employee_home page with the correct employee ID from here? 
                    this.props.history.push('/employee/home')
                }
        })
    }

    emailHandler = (event) => {
        event.preventDefault();
        this.setState({email : event.target.value});
    }

    passwordHandler = (event) => {
        event.preventDefault();
        this.setState({password : event.target.value});
    }

    render(){
        return (
            <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
                'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_GREEN}}>
                <h1 style={{'margin':'10px'}}>Employee Login</h1>
                <form className='loginForm' onSubmit={this.login}>
                    <input className='loginInput' type='email' placeholder='email' onChange={this.emailHandler}></input>
                    <input className='loginInput' type='password' placeholder='password' onChange={this.passwordHandler}></input>
                    <input type='submit' className="btn btn-outline-primary" value='Login' style={{'margin':'5px'}}></input>
                </form>
            </div> 
        )
    }
}

export default EmployeeLogin;