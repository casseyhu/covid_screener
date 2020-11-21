import React, {Component} from 'react';
<<<<<<< HEAD
=======
import { useForm } from 'react-hook-form';
>>>>>>> 735fc7af75d0b02c1267b56bd7fc288a68cb8055
import * as Constants from '../constants';
import axios from 'axios';


class EmployeeLogin extends Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            error: 0
        }
    }
    
    login = (event) => {
        event.preventDefault();
<<<<<<< HEAD
        console.log("Employee login in with credentials: ", this.state.email, this.state.password);
        axios.get('/employee/login', {params: { email: this.state.email, 
            pass: this.state.password }}).then(response => {
                console.log("Query result is: ", response.data[0])
                if(response.data === '' || response.data.length === undefined 
                    || response.data.length === 0){
                    console.log("memes")
                }
                else {
                    // Login was successful, the return should be employee ID. How to load the 
                    // employee_home page with the correct employee ID from here? 
                    this.props.history.push('/employee/home')
                }
=======
        // console.log("Employee login in with credentials: ", this.state.email, this.state.password);
        axios.get('/employee/login', {params: { 
            email: this.state.email, 
            pass: this.state.password 
        }}).then(response => {
            console.log("Query result is: ", response.data[0])
            if( response.data === '' ){
                console.log("Null result, can't log in. Make error animation?");
            }
            else {
                // Login was successful, the return should be employee ID. How to load the 
                // employee_home page with the correct employee ID from here? 
                this.props.history.push({
                    pathname: '/employee/home',
                    employeeID: response.data[0].employeeId
                })
            }
>>>>>>> 735fc7af75d0b02c1267b56bd7fc288a68cb8055
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

    backHandler = (event) => {
        event.preventDefault();
        console.log("going back!:")
        this.props.history.goBack();
    }
    
    render(){
        if(this.state.error === 1) {

        }
        return (
            <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
                'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_GREEN}}>
                <div className="loginBox">
                    <h1 style={{'margin':'0px 10px 30px 10px'}}>Employee Login</h1>
                    <form className='loginForm' onSubmit={this.login}>
                        <input className='loginInput' type='email' placeholder='Email' style={{'margin':'10px'}} onChange={this.emailHandler}></input>
                        <input className='loginInput' type='password' placeholder='Password' onChange={this.passwordHandler}></input>
                        <div>
                            <button type='button' className='btn btn-outline-primary' style={{'margin':'10px', 'width':'80px'}}
                                onClick={this.backHandler}>Back</button>
                            <input type='submit' className='btn btn-outline-primary' value='Sign In' 
                                style={{'margin':'10px', 'width':'80px'}}></input>
                        </div>    
                    </form>
                </div>
            </div> 
        )
    }
}

export default EmployeeLogin;