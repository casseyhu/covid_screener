import React, { Component } from 'react';
import PoolConstructor from '../components/PoolConstructor'
import PoolTable from '../components/PoolTable'
import axios from 'axios';

class PoolMapping extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labID: '',
            newPool: [],
            pools: []
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
            this.setState({pools: response.data})
            console.log("Set state of results: ", this.state.pools)
        });
    }

    newPoolCallback = (newPool) => {
        console.log("Back in parent pool_mapping page");
        this.setState({newPool : newPool});
        console.log("After recieving new pool: ", this.state.newPool);
    }

    render() {
        return (
            <div className='verticalFlex' style={{height:'100vh',  backgroundColor:'#c6e3f7'}}>
                <PoolConstructor parentCallback={this.newPoolCallback}/>
                {/* <PoolTable allPools={this.pools}/> */}
            </div>   
        )
    }
}

export default PoolMapping;