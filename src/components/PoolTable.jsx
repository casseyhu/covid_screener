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
                pools: response.data,
                poolsToDelete: []
            })
        })
    }

    componentDidMount() {
        this.getPools()
    }

    componentDidUpdate(prevProps) {
        if(this.props.refreshToggle !== prevProps.refreshToggle) {
            this.getPools();
        }
    } 

    deletePool = (e) => {
        // https://piazza.com/class/ke1ckdikw1kuz?cid=263
        // Should we make an alertbox that tells the user that 
        // Deleting 'x' set of pools would delete the corresponding wells
        // in welltesting? @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        if (this.state.poolsToDelete.length === 0) return
        axios.delete('/pools/delete', { data: {
            poolsToDelete: this.state.poolsToDelete
        }}).then((response) => {
            this.getPools()
        })

    }

    checkHandler = (event) => {
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
                <table className='table-two-col' style={{borderColor:'inherit'}}>
                    <thead>
                        <tr> 
                            <th scope='col' style={{width:'20%'}}>
                                <button onClick={this.deletePool} style={{backgroundColor:'transparent', border:'none', color:'white'}}>
                                {Constants.TRASH_ICON}
                                </button>
                            </th>
                            <th scope='col' style={{width:'25%'}}>Pool Barcode</th>
                            <th scope='col' style={{width:'45%'}}>Test Barcodes</th>
                            <th scope='col' style={{width:'5%'}}></th>
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
                                    <td style={{alignContent:'center', alignItems:'center'}}>
                                        <button type='button' className='btn btn-info' style={{width:'inherit'}} value='Edit'>Edit</button>
                                    </td>
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