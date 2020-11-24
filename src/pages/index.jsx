import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';


class MainPage extends Component {

    render() {
        return (
            <div className='verticalFlex main-container'>
                <div className='mainBackground background'></div>
                <div className="loginBox">
                    <h2 style={{'margin':'10px'}}>I AM ...</h2>
                    <Link to="/labtech" className="btn btn-outline-primary" style={{'margin':'10px', 'width':'130px'}}>Lab Worker</Link>
                    <Link to="/employee" className="btn btn-outline-primary" style={{'margin':'10px', 'width':'130px'}}>Employee</Link>
                </div>
            </div>        
        )
    }
}
 
export default MainPage;