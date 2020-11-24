import React, {Component} from 'react';
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
        axios.get('/employee/login', {params: { 
            email: this.state.email, 
            pass: this.state.password 
        }}).then(response => {
            console.log("Query result is: ", response.data[0])
            if( response.data === '' ){
                this.setState({error : 1});
            }
            else {
                this.props.history.push({
                    pathname: '/employee/home',
                    employeeID: response.data[0].employeeId
                })
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

    backHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack();
    }

    alertDismiss = (event) => { 
        event.preventDefault();
        this.setState({error : 0});
    }
    
    renderAlert = () => {
        if(this.state.error === 0) return null;
        return (
            <div className='loginError'>
                <p style={{'padding':'3px 0px 0px'}}>Invalid email or password.</p>
                <button style={{'height':'30px', 'width':'30px', 'padding':'0px', 'margin':'0px'}} className='btn btn-outline-light' onClick={this.alertDismiss}>{Constants.DELETE_ICON}</button>
            </div>
        )
    }
    render(){
        return (
            <div className='verticalFlex main-container' style={{ 'height':'100vh', 'backgroundColor':Constants.BGCOLOR_GREEN}}>
                <div className='labLogin background'></div>
                {this.renderAlert()}
                <div className="loginBox">
                    <h2>Employee Login</h2>
                    <form className='loginForm' onSubmit={this.login}>
                        <div class="input-field col s12">
                            <input className='validate' id='email' type='email' onChange={this.emailHandler}></input>
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div class="input-field col s12">
                            <input className='validate' id='password' type='password' onChange={this.passwordHandler}></input>
                            <label htmlFor='password'>Password</label>
                        </div>
                        <div>
                            <button type='button' className='btn btn-outline-primary' style={{'margin':'10px', 'width':'100px'}}
                                onClick={this.backHandler}>Back</button>
                            <input type='submit' className='btn btn-outline-primary' value='Sign In' 
                                style={{'margin':'10px', 'width':'100px'}}></input>
                        </div>    
                    </form>
                </div>
            </div> 
        )
    }
}

export default EmployeeLogin;