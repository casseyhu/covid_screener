import React, { Component } from 'react';
import PoolConstructor from '../components/PoolConstructor';
import PoolTable from '../components/PoolTable';
import axios from 'axios';
import * as Constants from '../constants';


class PoolMapping extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labID: '',
            refresh: false
        }
    }

    componentDidMount() {
        this.setState({
            labID: localStorage.getItem('labID')
        })
    }

    refresh = () => {
        this.setState({
            refresh: !this.state.refresh
        })
    }

    render() {
        return (
            <>
            <div className='poolOuterWrap'>
                <h2>Pool Mapping 🕰</h2>
                <div className='poolContainer'>
                    <PoolConstructor refresh={this.refresh} />
                    <PoolTable refreshToggle={this.state.refresh} />
                </div>  
                {Constants.POOL_WAVE}
            </div>
            </> 
        )
    }
}

export default PoolMapping;