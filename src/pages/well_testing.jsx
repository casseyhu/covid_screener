import React, { Component } from 'react';
import * as Constants from '../constants';
import WellConstructor from '../components/WellConstructor'
import WellTable from '../components/WellTable'


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
                <h2>Well Testing 💡</h2>
                <div className='wellContainer'>
                    <WellConstructor refresh={this.refresh} wellToEdit={this.state.wellToEdit}/>
                    <WellTable refreshToggle={this.state.refresh} editWell={this.editWell}/>
                </div>   
                {Constants.POOL_WAVE}
            </div>
        )
    }
}

export default WellTesting;