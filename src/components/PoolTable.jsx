import React, { Component } from 'react';
import axios from 'axios';


class PoolTable extends Component {
    constructor(props){
        super(props)
        this.state = { 
            pools: []
        }
    }

    getPools() {
        axios.get('/pools/all').then((response) => {
            this.setState({
                pools: response.data
            })
        })
    }

    componentDidMount() {
        this.getPools()
    }

    componentDidUpdate(prevProps) {
        if(this.props.allPools !== prevProps.allPools) {
            this.getPools();
        }
    } 
    
    render() { 
        return ( 
        <ul>
            {this.state.pools.map(res => {
                return (
                    <li>
                        {res.poolBarcode}, {res.barcodes}
                    </li>
                )
            })}
        </ul>
        );
    }
}
 
export default PoolTable;