import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';

class MainPage extends Component {

    render() {
        return (
            <>
            <div className='verticalFlex main-container'>
                <div className='mainBackground background'></div>
                <div className="loginBox">
                    <h2 style={{margin:'10px'}}>Welcome 👋🏼</h2>
                    <p style={{paddingBottom: '20px'}}>Choose one to continue.</p>
                    <Link to="/labtech"><button className="loginBtn">Lab Worker</button></Link>
                    <Link to="/employee"><button className="loginBtn">Employee</button></Link>
                </div>
                
                <footer className="footer">
                    <div className="copyright">
                        <p style={{'color':'white'}}>© 2020 All Rights Reserved | Created by Cassey Hu, Eddie Xu, Melanie Chio</p>
                    </div>
                </footer>   
                {Constants.HOME_WAVE_1} {Constants.HOME_WAVE_2}
            </div>
             
            </> 
        )
    }
}
 
export default MainPage;