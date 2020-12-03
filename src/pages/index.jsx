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
                <svg className='bkgdSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <defs><linearGradient id="gradient"><stop offset="10%" stopColor="#0A1652" /><stop offset="90%" stopColor="#081660" /></linearGradient>
                </defs><path fill="url(#gradient)" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,154.7C672,171,768,213,864,208C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                <svg className="bkgdSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><defs><linearGradient id="homeGrad"><stop offset="10%" stopColor="#1D2C7C" /><stop offset="90%" stopColor="#061874" /></linearGradient>
                </defs><path fill="url(#homeGrad)" fillOpacity="1" d="M0,160L14.1,149.3C28.2,139,56,117,85,90.7C112.9,64,141,32,169,53.3C197.6,75,226,149,254,170.7C282.4,192,311,160,339,160C367.1,160,395,192,424,176C451.8,160,480,96,508,101.3C536.5,107,565,181,593,197.3C621.2,213,649,171,678,165.3C705.9,160,734,192,762,208C790.6,224,819,224,847,208C875.3,192,904,160,932,165.3C960,171,988,213,1016,192C1044.7,171,1073,85,1101,90.7C1129.4,96,1158,192,1186,197.3C1214.1,203,1242,117,1271,90.7C1298.8,64,1327,96,1355,117.3C1383.5,139,1412,149,1426,154.7L1440,160L1440,320L1425.9,320C1411.8,320,1384,320,1355,320C1327.1,320,1299,320,1271,320C1242.4,320,1214,320,1186,320C1157.6,320,1129,320,1101,320C1072.9,320,1045,320,1016,320C988.2,320,960,320,932,320C903.5,320,875,320,847,320C818.8,320,791,320,762,320C734.1,320,706,320,678,320C649.4,320,621,320,593,320C564.7,320,536,320,508,320C480,320,452,320,424,320C395.3,320,367,320,339,320C310.6,320,282,320,254,320C225.9,320,198,320,169,320C141.2,320,113,320,85,320C56.5,320,28,320,14,320L0,320Z"></path></svg>
            </div>
             
            </> 
        )
    }
}
 
export default MainPage;