import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../constants';
import Form from 'react-bootstrap/Form';

class PoolTable extends Component {
    constructor(props){
        super(props)
        this.state = { 
            pools: [],
            poolsToDelete: []
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
        // this.setState({pools: this.props.allPools})
        if(this.props.allPools !== prevProps.allPools) {
            this.getPools();
        }
    } 

    deletePool() {
        if (this.state.poolsToDelete.length === 0) return
        axios.delete('/pools/delete', { data: {
            poolsToDelete: this.state.poolsToDelete
        }}).then((response) => {
            console.log('deleted tests')
            axios.get('/pools/all').then((response) => {
                this.setState({
                    results: response.data,
                    testsToDelete: []
                })
            });
        })

    }

    checkHandler = (event) => {
        // console.log(event.target.name)
        if (event.target.checked) {
            this.state.poolsToDelete.push(event.target.name)
        } else {
            this.setState({
                poolsToDelete: this.state.poolsToDelete.filter(obj => obj !== event.target.name)
            })
        }
    }
    
    render() { 
        return ( 
            <div className='poolTableContainer'>
                <table className='table-two-col' >
                    <thead>
                        <tr>
                            <th>
                                <button onClick={this.deletePool} style={{backgroundColor:'transparent', border:'none', color:'white'}}>
                                {Constants.TRASH_ICON}
                                </button>
                            </th>
                            <th scope='col'>Pool Barcode</th>
                            <th scope='col'>Test Barcodes</th>
                        </tr>
                    </thead>
                    <tbody style={{textAlign:'left'}}>
                        {this.state.pools.map(res => {
                            return (
                                <tr key={`${res.poolBarcode}`}>
                                    <td>
                                    <Form.Check 
                                        type={'checkbox'}
                                        name={res.poolBarcode}
                                        onChange={this.checkHandler}
                                        style={{paddingLeft:'30px'}}
                                    /> </td>
                                    <td>{res.poolBarcode}</td>
                                    <td>{res.barcodes}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default PoolTable;