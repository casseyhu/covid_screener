import React, { Component } from 'react';
import axios from 'axios';

class LoginContainer extends Component {
    state = {
        email: '',
        password: '',
        error: 0,
    }

    login = (event) => {
        event.preventDefault();
        axios.get(`/login/${this.props.path}`, {params: { 
            email: this.state.email, 
            pass: this.state.password 
        }}).then(response => {
            if ( response.data === '' ){
                this.setState({error : 1});
            } else {
                this.props.redirectPath(response);
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
    
    
    render() { 
        const { userType } = this.props;

        return ( 
            <div className='verticalFlex main-container'>
                <div className='LoginBackground background'/>
                
                {this.state.error === 1 && 
                <div class="alert alert-danger alert-dismissible" style={{width:'420px'}}>
                    <a href="#" class="close" data-dismiss="alert" aria-label="close" onClick={this.alertDismiss}>&times;</a>
                    Invalid email or password.
                </div>}

                <div className="loginBox">
                    <h2>{userType} Login</h2>
                    <form className='loginForm' onSubmit={this.login}>
                        <input className='loginInput' type='email' placeholder='Email' onChange={this.emailHandler}></input>
                        <input className='loginInput' type='password' placeholder='Password' onChange={this.passwordHandler}></input>
                        <div>
                            <button type='button' className='loginContBtn'
                                onClick={this.backHandler}>Back</button>
                            <input type='submit' className='loginContBtn' value='Sign In' 
                                style={{ 'margin-left':'20px'}}></input>
                        </div>    
                    </form>
                </div>
            </div> 
        );
    }
}
 
export default LoginContainer;