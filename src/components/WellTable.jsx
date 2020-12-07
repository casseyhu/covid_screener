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

    componentDidUpdate(prevProps) {
        if(this.props.refreshToggle !== prevProps.refreshToggle) {
            this.getWells();
        }
    } 

    deleteWell = (event) => {
        if (this.state.wellsToDelete.length === 0) return
        axios.delete('/wells/delete', { data: {
            wellsToDelete: this.state.wellsToDelete
        }}).then((response) => {
            this.getWells()
        })
    }

    checkHandler = (event) => {
        if (event.target.checked) {
            this.state.wellsToDelete.push(event.target.name)
        } else {
            this.setState({
                wellsToDelete: this.state.wellsToDelete.filter(obj => obj !== event.target.name)
            })
        }
    }

    editWell(well) {
        console.log(well);
        this.props.editWell(well);        
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
                                        <button type='button' className='btn btn-dark' style={{width:'inherit'}} value='Edit'
                                            onClick={() => {this.editWell(res)}}>Edit</button>
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
