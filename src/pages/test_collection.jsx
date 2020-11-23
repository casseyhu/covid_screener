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
        const { labID, results } = this.state;

        return (
            <div style={{'height':'100vh', 'backgroundColor':'white', 'textAlign':'center', 'padding':'40px 50px'}}>
                <h2> Test Collection </h2>
                <div className='loginForm' >
                <form className='testCollectionForm'>
                    <div className='form-group row' >
                        <label for='employeeID' className="form-label" style={{'minWidth':'30%'}}>Employee ID</label>
                        <div className="col" >
                            <input type='text' className="form-control" id='employeeID' placeholder='000'/>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label for='testBarcode' className="form-label" style={{'minWidth':'30%'}}>Test Barcode</label>
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
                                {/* Delete Button */}
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button></th>
                            <th scope='col'>Employee ID</th>
                            <th scope='col'>Test Barcode</th>
                        </tr>
                    </thead>
                    <tbody style={{'textAlign':'left'}}>
                        {results.map(res => {
                            return (
                                <tr>
                                    <td><input type="checkbox" value="" /></td>
                                    <td>{res.employeeID}</td>
                                    <td>{res.testBarcode}</td>
                                </tr>
                            )
                        })}
                        {/* <tr>
                            <td><input type="checkbox" value="" /></td>
                            <td>123</td>
                            <td>456</td>
                        </tr> */}
                    </tbody>
                </table>
                {/* <button type="button" className="btn btn-outline-danger">Delete</button> */}
            </div>
            // <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
            //     'height':'100vh', 'flexDirection':'column', 'backgroundColor':'#c6e3f7'}}>
            //     <h1 style={{'margin':'10px'}}>Test Collection</h1>
            //     <h2> BLAH BLAH bleh </h2>
            // </div>   
        )
    }
}

export default TestCollection;