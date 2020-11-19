import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';

class MainPage extends Component {
    render() { 
        return ( 
            <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
            'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_MILKCOFFEE}}>
            <h1 style={{'margin':'10px'}}>I AM ...</h1>
            <Link to="/labtech" className="btn btn-outline-primary" style={{'margin':'10px', 'width':'150px'}}>Lab Worker</Link>
            <Link to="/employee" className="btn btn-outline-primary" style={{'margin':'10px', 'width':'150px'}}>Employee</Link>
        </div>      
         );
    }
}
 
export default MainPage;