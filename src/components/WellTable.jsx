import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../constants';
import Form from 'react-bootstrap/Form';

class WellTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wells: [],
            wellsToDelete: []
        }
    }


    getWells() {
        axios.get('/wells/all').then((response) => { 
            this.setState({
                wells:response.data,
                wellsToDelete : []
            })
        })
    }

    componentDidMount(){
        this.getWells()
    }

    deleteWell = (event) => {

    }

    checkHandler = (event) => {

    }

    editWell = (e) => {

    }

    render() {
        return (
            <div className='wellTableContainer'>
                <table className='table-two-col' style={{borderColor: 'inherit'}}>
                    <thead>
                        <tr>
                            <th scope='col' style={{width:'20%'}}>
                                <button onClick={this.deleteWell} style={{backgroundColor:'transparent', border:'none', color:'white'}}>
                                {Constants.TRASH_ICON}
                                </button>
                            </th>
                            <th scope='col' style={{width:'25%'}}>Well Barcode</th>
                            <th scope='col' style={{width:'25%'}}>Pool Barcode</th>
                            <th scope='col' style={{width:'25%'}}>Status</th> 
                            <th scope='col' style={{width: '5%'}}></th>
                        </tr>
                    </thead>
                    <tbody style={{textAlign:'left'}}>
                        {this.state.wells.map((res) => {
                            return(
                                <tr key={`${res.wellBarcode}`}>
                                    <td>
                                        <Form.Check 
                                            type={'checkbox'}
                                            name={res.wellBarcode}
                                            onChange={this.checkHandler}
                                            style={{paddingLeft:'30px'}}
                                        /> 
                                    </td>
                                    <td>{res.wellBarcode}</td> 
                                    <td>{res.poolBarcode}</td>
                                    <td>{res.result}</td>
                                    <td style={{alignContent:'center', alignItems:'center'}}>
                                        <button type='button' className='btn btn-info' style={{width:'inherit'}} value='Edit'
                                            onClick={this.editWell}>Edit</button>
                                    </td>
                                </tr>
                            )}
                        )}
                    </tbody>
                </table>
            </div> 
        )
    }
}


export default WellTable
