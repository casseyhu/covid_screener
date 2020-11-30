import React, { Component } from 'react';
import PoolConstructor from '../components/PoolConstructor'
import PoolTable from '../components/PoolTable'
import axios from 'axios';

class PoolMapping extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labID: '',
            existingPools: []
        }
    }

    componentDidMount() {
        let labID = '';
        /* Save the labID to local storage on the first load. */
        if(this.props.location.labID){
            localStorage.setItem('labID', JSON.stringify(this.props.location.labID));
            labID = this.props.location.labID;
        }
        else {
            labID = localStorage.getItem('labID');
            if(labID) labID = JSON.parse(labID);
        }

        console.log("Trying to get all pools")
        axios.get('/pools/all').then((response) => {
            this.setState({existingPools: response.data})
            console.log("Set state of results: ", this.state.pools)
        });
    }


    newPoolSubmission = (newPoolValues) => {
        console.log("Back in parent pool_mapping page after submitting new pool");
        console.log(this.state.existingPools)
        console.log(newPoolValues)
        this.setState({existingPools : newPoolValues}, () => {
            this.forceUpdate();
        });
        // shouuld force a new reload of the page after the state changes. 
        // reload should clear te pool constuctor (maybe) then reload the pooltable. 
    }

    render() {
        return (
            <div className='horizontalFlex' style={{height:'100vh',  backgroundColor:'#c6e3f7'}}>
                <PoolConstructor parentCallback={this.newPoolSubmission} style={{position:'absolute', top:'100px', left:'50px'}}/>
                <PoolTable allPools={this.state.existingPools}/>
                {/* <PoolTable /> */}
            </div>   
        )
    }
}

export default PoolMapping;