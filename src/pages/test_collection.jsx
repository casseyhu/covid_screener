import React, { Component } from 'react';
import * as Constants from '../constants';
import axios from 'axios';

class TestCollection extends Component {
    state = {
        labID: '',
        results: []
    }

    componentDidMount() {
        const { labID } = this.props.location
        axios.get('/get/testCollection', {params: {
            labID: labID
        }}).then((response) => {
            this.setState({
                labID: labID,
                results: response.data
            })
        });
    }

    render() {
        const { results } = this.state;
        return (
            <div style={{'height':'100vh', 'backgroundColor':'white', 'textAlign':'center', 'padding':'40px 50px'}}>
                <h2> Test Collection </h2>
                <div className='loginForm' >
                <form className='testCollectionForm'>
                    <div className='form-group row' >
                        <label htmlFor='employeeID' className="form-label" style={{'minWidth':'30%'}}>Employee ID</label>
                        <div className="col" >
                            <input type='text' className="form-control" id='employeeID' placeholder='000'/>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor='testBarcode' className="form-label" style={{'minWidth':'30%'}}>Test Barcode</label>
                        <div className="col" >
                            <input type='text' className="form-control" id='testBarcode' placeholder='000'/>
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-dark">Add</button>
                </form>
                </div>
                <table className='table-two-col' style={{'margin':'20px auto', 'width':'90%',}}>
                    <thead>
                        <tr>
                            <th><button type="button" className="btn btn-outline-light">
                                {Constants.TRASH_ICON}
                            </button></th>
                            <th scope='col'>Employee ID</th>
                            <th scope='col'>Test Barcode</th>
                        </tr>
                    </thead>
                    <tbody style={{'textAlign':'left'}}>
                        {results.map(res => {
                            return (
                                <tr key={res.employeeID+res.testBarcode}>
                                    <td><input type="checkbox" value="" /></td>
                                    <td>{res.employeeID}</td>
                                    <td>{res.testBarcode}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TestCollection;