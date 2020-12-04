import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../constants';
import Form from 'react-bootstrap/Form';
import WellConstructor from '../components/WellConstructor'
import WellTable from '../components/WellTable'

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
            labID: '',
            refresh: false,
            wellToEdit: ''
        };
    }

    componentDidMount(){ 
        this.setState({
            labID: localStorage.getItem('labID')
        })
    }
    
    refresh = () => {
        this.setState({
            refresh: !this.state.refresh
        })
    }
    
    editWell = (well) => {
        console.log("Editing a well");
        this.setState({
            wellToEdit: well
        })
    }

    render () {
        return (
            <div className='wellOuterWrap'>
                <h2>Well Testing 🧫</h2>
                <div className='wellContainer'>
                    <WellConstructor refresh={this.refresh} wellToEdit={this.state.wellToEdit}/>
                    <WellTable refresh={this.refresh} refreshToggle={this.state.refresh} editWell={this.editWell}/>
                </div>   
                {Constants.POOL_WAVE}
            </div>
        )
    }
}

export default WellTesting;