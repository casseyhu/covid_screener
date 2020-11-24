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
                {/* <a class="waves-effect waves-light btn" style={{'height':'30px', 'width':'30px', 'padding':'0px', 'margin':'0px'}} onClick={this.alertDismiss}>X</a> */}
            </div>
        )
    }
    render(){
        return (
            <div className='verticalFlex main-container' style={{ 'height':'100vh', 'backgroundColor':Constants.BGCOLOR_GREEN}}>
                <div className='employeeLogin background'></div>
                {this.renderAlert()}
                <div className="loginBox">
                    <h2>Lab Worker Login</h2>
                    <form className='loginForm' onSubmit={this.login}>
                        <div class="input-field col s12">
                            <input className='loginInput' id='email' type='email' onChange={this.emailHandler}></input>
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div class="input-field col s12">
                            <input className='loginInput' id='password' type='password' onChange={this.passwordHandler}></input>
                            <label htmlFor='password'>Password</label>
                        </div>
                        <div>
                            <button type='button' className='btn btn-outline-primary' style={{'width':'70px'}}
                                onClick={this.backHandler}>Back</button>
                            <input type='submit' className='btn btn-outline-primary' onClick={() => {
                                this.setState({loginType:'collector'})}} value='Collector Login' 
                                style={{'margin':'10px'}}></input>
                            <input type='submit' className='btn btn-outline-primary' onClick={() => {
                                this.setState({loginType:'home'})}} 
                                value='Lab Login'></input>
                        </div>    
                    </form>
                </div>
            </div> 
        )
    }
}

export default LabLogin;