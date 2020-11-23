import React, { Component } from 'react';
import * as Constants from '../constants';
import axios from 'axios';

class TestCollection extends Component {
    state = {
        labID: '',
        results: []
    }

    componentDidMount() {
        let labID = '';
        /* Save the labID to local storage on the first load. */
        if(this.props.location.labID){
            // console.log("First session load, saving labID to local storage");
            localStorage.setItem('labID', JSON.stringify(this.props.location.labID));
            labID = this.props.location.labID;
            console.log(labID);
        }
        else {
            labID = localStorage.getItem('labID');
            if(labID) labID = JSON.parse(labID);
            // console.log("Saved labID load: ", labID);
        }

        // const { labID } = this.props.location
        axios.get('/get/testCollection', {params: {
            labID: labID
        }}).then((response) => {
            console.log(labID, response.data)
            this.setState({
                labID: labID,
                results: response.data
            })
        });
    }

    /* Adding new Test Collection to EmployeeTest and display */
    /* EmployeeTest values: testBarcode, employeeID, collectionTime, collectedBy */
    /* testBarcode && employeeId: User input | collectionTime: day.now() | collectedBy: this.state.labId */
    addTest = (event) => {
        event.preventDefault();
        console.log(this.state.labID) 

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
                    <input type="submit" className="btn btn-outline-dark" onClick={this.addTest} value="Add"></input>
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