import React, { Component } from 'react';
import PoolConstructor from '../components/PoolConstructor';
import PoolTable from '../components/PoolTable';
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
            <div className='poolContainer' >
                {/* <h2> Pool Mapping </h2> */}
                <PoolConstructor parentCallback={this.newPoolSubmission} />
                <PoolTable allPools={this.state.existingPools} />
                <svg className="poolWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><defs><linearGradient id="poolGrad"  x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#1D2C7C" /><stop offset="100%" stopColor="#061874" /></linearGradient>
                </defs><path fill="url(#poolGrad)" fillOpacity="1" d="M0,128L16,133.3C32,139,64,149,96,176C128,203,160,245,192,256C224,267,256,245,288,202.7C320,160,352,96,384,74.7C416,53,448,75,480,117.3C512,160,544,224,576,234.7C608,245,640,203,672,186.7C704,171,736,181,768,170.7C800,160,832,128,864,112C896,96,928,96,960,106.7C992,117,1024,139,1056,133.3C1088,128,1120,96,1152,117.3C1184,139,1216,213,1248,218.7C1280,224,1312,160,1344,149.3C1376,139,1408,181,1424,202.7L1440,224L1440,320L1424,320C1408,320,1376,320,1344,320C1312,320,1280,320,1248,320C1216,320,1184,320,1152,320C1120,320,1088,320,1056,320C1024,320,992,320,960,320C928,320,896,320,864,320C832,320,800,320,768,320C736,320,704,320,672,320C640,320,608,320,576,320C544,320,512,320,480,320C448,320,416,320,384,320C352,320,320,320,288,320C256,320,224,320,192,320C160,320,128,320,96,320C64,320,32,320,16,320L0,320Z"></path></svg>
            </div>   
        )
    }
}

export default PoolMapping;