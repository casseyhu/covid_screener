import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../constants';
import Form from 'react-bootstrap/Form';

// General info:
// 1. Only one pool goes into a well. So, we can assume (Well, Pool) is a unique key?
// 2. [EDITING] If someone edits a well and sets the result to positive, all employees
//      in that Pool will have their tests set to positive !!!
// 3. [EDITING] When the well gets edited to be postive/negative/inprogress, the 
//      testingEndTime field in the welltesting table is to be updated to date.now().

class WellTesting extends Component {
    constructor(props){
        super(props);
        this.state = {
            wellTests: []
        };
    }
    
    getWells() {
        axios.get('/wells/all').then((response) => {
            console.log(response.data)
            this.setState({
                wellTests: response.data
            })
        })
    }

    componentDidMount(){ 
        this.getWells();
    }
    
    
    
    
    render () {
        return (
            <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
                'height':'100vh', 'flexDirection':'column', 'backgroundColor':'#c6e3f7'}}>
                <h1 style={{'margin':'10px'}}>Well Testing</h1>
                <h1> BLAH BLAH </h1>
            </div>   
        )
    }
}

export default WellTesting;