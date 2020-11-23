import React, { Component } from 'react';
import * as Constants from '../constants';
import axios from 'axios';
import moment from 'moment';

class TestCollection extends Component {
    state = {
        labID: '',
        results: [],
        employeeID: '',
        testBarcode: '',
        testsToDelete: []
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

        axios.get('/get/testCollection').then((response) => {
            // console.log(labID, response.data)
            this.setState({
                labID: labID,
                results: response.data
            })
        });
    }

    inputHandler = (event) => {
        switch (event.target.id) {
            case ('employeeID'):
                this.setState({employeeID: event.target.value});
                break
            case ('testBarcode'):
                this.setState({testBarcode: event.target.value});
                break
            default:
                break
        }
    }

    checkHandler = (event) => {
        if (event.target.checked) {
            this.state.testsToDelete.push(event.target.name)
        } else {
            this.state.testsToDelete = this.state.testsToDelete.filter(obj => obj !== event.target.name);
        }
        console.log(this.state.testsToDelete)
    }

    /* Adding new Test Collection to EmployeeTest and display */
    /* EmployeeTest values: testBarcode, employeeID, collectionTime, collectedBy */
    /* testBarcode && employeeId: User input | collectionTime: day.now() | collectedBy: this.state.labId */
    addTest = (event) => {
        event.preventDefault();
        axios.post('/labtech/collect/add', {
            testBarcode: this.state.testBarcode,
            employeeID: this.state.employeeID,
            collectionTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            collectedBy: this.state.labID
        }).then((response) => {
            /* RELOAD AND RERENDER THE PAGE TO SHOW THE NEWLY ADDED TEST */
            axios.get('/get/testCollection', {params: {
                labID: this.state.labID
            }}).then((response) => {
                this.setState({
                    labID: this.state.labID,
                    results: response.data
                })
            });
        })
    }

    removeTest = (event) => {
        const tests = this.state.testsToDelete;
        for (var i = 0; i < tests.length; i++) {
            const testField = tests[i].split(" ");
            console.log(testField[0].toString(), testField[1])
            axios.delete('/labtech/collect/delete', { data: {
                employeeID: testField[0].toString(),
                testBarcode: testField[1]
            }}).then((response) => {
                console.log('...')
            })
        }
        this.setState({
            testsToDelete: []
        })
        axios.get('/get/testCollection', {params: {
            labID: this.state.labID
        }}).then((response) => {
            this.setState({
                labID: this.state.labID,
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
                            <input type='text' className="form-control" id='employeeID' placeholder='000' onChange={this.inputHandler}/>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor='testBarcode' className="form-label" style={{'minWidth':'30%'}}>Test Barcode</label>
                        <div className="col" >
                            <input type='text' className="form-control" id='testBarcode' placeholder='000' onChange={this.inputHandler}/>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-outline-dark" onClick={this.addTest} value="Add"></input>
                </form>
                </div>
                <table className='table-two-col' style={{'margin':'20px auto'}}>
                    <thead>
                        <tr>
                            <th><button type="button" className="btn btn-outline-light" onClick={this.removeTest}>
                                {Constants.TRASH_ICON}
                            </button></th>
                            <th scope='col'>Employee ID</th>
                            <th scope='col'>Test Barcode</th>
                        </tr>
                    </thead>
                    <tbody style={{'textAlign':'left'}}>
                        {results.map(res => {
                            return (
                                <tr key={`${res.employeeID} ${res.testBarcode}`}>
                                    <td><input type="checkbox" name={`${res.employeeID} ${res.testBarcode}`} onChange={this.checkHandler}/></td>
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