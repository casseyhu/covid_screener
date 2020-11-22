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
        // console.log(event.value, event.name, this.state.loginType)
        const type = this.state.loginType;
        switch (type) {
            case 'home':
                console.log('home login')
                break
            case 'collector':
                console.log('collector login')
                break
            default:
                break
        }

        // console.log("Employee login in with credentials: ", this.state.email, this.state.password);
        // axios.get('/employee/login', {params: { 
        //     email: this.state.email, 
        //     pass: this.state.password 
        // }}).then(response => {
        //     console.log("Query result is: ", response.data[0])
        //     if( response.data === '' ){
        //         console.log("Null result, can't log in. Make error animation?");
        //     }
        //     else {
        //         // Login was successful, the return should be employee ID. How to load the 
        //         // employee_home page with the correct employee ID from here? 
        //         this.props.history.push({
        //             pathname: '/labtech/collect',
        //             employeeID: response.data[0].employeeId
        //         })
        //     }
        // })
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

    render(){
        return (
            // <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
            //     'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_GREEN}}>
            //     <div className="loginBox">
            //         <h1 style={{'margin':'10px'}}>Lab Worker Login</h1>
            //         <input className='loginInput' type='email' placeholder='Email'></input>
            //         <input className='loginInput' type='password' placeholder='Password'></input>
            //         {/* <Link to="/labtech/collect" className="btn btn-outline-primary" style={{'margin':'10px'}}>Login Collector</Link>
            //         <Link to="/labtech/home" className="btn btn-outline-primary" style={{'margin':'5px'}}>Lab Login</Link> */}
            //     </div> 
            // </div>
            <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
            'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_GREEN}}>
                <div className="loginBox">
                    <h1 style={{'margin':'0px 10px 30px 10px'}}>Lab Worker Login</h1>
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