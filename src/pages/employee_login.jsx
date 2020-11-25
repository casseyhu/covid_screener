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
        axios.get('/login/employee', {params: { 
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
        this.setState({email : event.target.value});
    }

    passwordHandler = (event) => {
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
            <div className='verticalFlex main-container'>
                <div className='LoginBackground background'></div>
                {this.renderAlert()}
                <div className="loginBox">
                    <h2>Employee Login</h2>
                    <form className='loginForm' onSubmit={this.login}>
                        <input className='loginInput' type='email' placeholder='Email' onChange={this.emailHandler}></input>
                        <input className='loginInput' type='password' placeholder='Password' onChange={this.passwordHandler}></input>
                        <div>
                            <button type='button' className='btn btn-outline-primary' style={{'width':'100px'}}
                                onClick={this.backHandler}>Back</button>
                            <input type='submit' className='btn btn-outline-primary' value='Sign In' 
                                style={{margin:'10px', width:'100px'}}></input>
                        </div>    
                    </form>
                </div>
            </div> 
        )
    }
}

export default EmployeeLogin;