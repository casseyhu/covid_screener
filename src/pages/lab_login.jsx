import React, {Component} from 'react';
import * as Constants from '../constants';
import axios from 'axios';

class LabLogin extends Component {
    state = {
        email: '',
        password: '',
        loginType: '',
        error: 0
    }

    login = (event) => {
        event.preventDefault();
        var labID = '';
        axios.get('/labemployee/login', {params: { 
            email: this.state.email, 
            pass: this.state.password 
        }}).then(response => {
            if( response.data === '' ){
                this.setState({error : 1});
            }
            else {
                labID = response.data[0].labID
                switch (this.state.loginType) {
                    case 'home':
                        console.log(labID)
                        this.props.history.push({
                            pathname: '/labtech/home',
                            labID: labID
                        })
                        break
                    case 'collector':
                        this.props.history.push({
                            pathname: '/labtech/collect',
                            labID: labID
                        })
                        break
                    default:
                        break
                }
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
            <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
            'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_GREEN}}>
                {this.renderAlert()}
                <div className="loginBox">
                    <h1 >Lab Worker Login</h1>
                    <form className='loginForm' onSubmit={this.login}>
                        <input className='loginInput' type='email' placeholder='Email' onChange={this.emailHandler}></input>
                        <input className='loginInput' type='password' placeholder='Password' onChange={this.passwordHandler}></input>
                        <div>
                            <button type='button' className='btn btn-outline-primary' style={{'width':'70px'}}
                                onClick={this.backHandler}>Back</button>
                            <input type='submit' className='btn btn-outline-primary' onClick={() => {
                                this.setState({loginType:'collector'})}} value='Login Collector' 
                                style={{'margin':'10px', 'width':'130px'}}></input>
                            <input type='submit' className='btn btn-outline-primary' onClick={() => {
                                this.setState({loginType:'home'})}} 
                                value='Lab Login' style={{'width':'100px'}}></input>
                        </div>    
                    </form>
                </div>
            </div> 
        )
    }
}

export default LabLogin;