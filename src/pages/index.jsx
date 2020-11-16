import React from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';


const MainPage = () => {
    return (
            <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
            'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_MILKCOFFEE}}>
            <h1 style={{'margin':'10px'}}>I AM ...</h1>
            <Link to="/lab" className="btn btn-outline-primary" style={{'margin':'10px'}}>Lab Worker</Link>
            <Link to="/employee" className="btn btn-outline-primary" style={{'margin':'10px'}}>Employee</Link>
        </div>        
    )
}

export default MainPage;