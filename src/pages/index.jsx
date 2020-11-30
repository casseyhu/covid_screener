import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';

class MainPage extends Component {

    render() {
        return (
            <>
            <div className='verticalFlex main-container'>
                <svg className='bkgdSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" ><path fill="#819FF7" fillOpacity="1" 
                    d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,154.7C672,171,768,213,864,208C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                <div className='mainBackground background'></div>
                <div className="loginBox">
                    <h2 style={{margin:'10px'}}>Welcome 👋🏼</h2>
                    <p style={{paddingBottom: '20px'}}>Choose one to continue.</p>
                    <Link to="/labtech"><button className="loginBtn">Lab Worker</button></Link>
                    <Link to="/employee"><button className="loginBtn">Employee</button></Link>
                </div>
                <footer className="footer">
                    <div className="copyright">
                        <p>© 2020 All Rights Reserved | Created by Cassey Hu, Eddie Xu, Melanie Chio</p>
                    </div>
                </footer>   
            </div>
             
            </> 
        )
    }
}
 
export default MainPage;