import React, { Component } from 'react';
import * as Constants from '../constants';
import axios from 'axios';
import moment from 'moment';

class TestCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labID: '',
            results: [],
            employeeID: '',
            testBarcode: '',
            testsToDelete: []
        }
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

        axios.get('/tests/all').then((response) => {
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
            this.setState({
                testsToDelete: this.state.testsToDelete.filter(obj => obj !== event.target.name)
            })
        }
    }

    /* Adding new Test Collection to EmployeeTest and display */
    /* EmployeeTest values: testBarcode, employeeID, collectionTime, collectedBy */
    /* testBarcode && employeeId: User input | collectionTime: day.now() | collectedBy: this.state.labId */
    addTest = (event) => {
        event.preventDefault();
        axios.post('/tests/add', {
            testBarcode: this.state.testBarcode,
            employeeID: this.state.employeeID,
            collectionTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            collectedBy: this.state.labID
        }).then((response) => {
            /* RELOAD AND RERENDER THE PAGE TO SHOW THE NEWLY ADDED TEST */
            axios.get('/tests/all').then((response) => {
                this.setState({
                    results: response.data
                })
            });
        })
    }

    removeTest = (e) => {
        const tests = this.state.testsToDelete;
        const testsToDelete = [];
        console.log(tests)
        for (var i = 0; i < tests.length; i++) {
            testsToDelete.push(tests[i].split(" "));
        }
        console.log(testsToDelete)
        axios.delete('/tests/delete', { data: {
            testsToDelete: testsToDelete
        }}).then((response) => {
            console.log('deleted tests')
            axios.get('/tests/all').then((response) => {
                this.setState({
                    results: response.data
                })
            });
        })
    }

    render() {
        const { results } = this.state;
        return (
            <div style={{height:'100vh', backgroundColor:'white', textAlign:'center', padding:'40px 50px'}}>
                <h2> Test Collection </h2>
                <div className='loginForm' >
                <form className='testCollectionForm'>
                    <div className='form-group row' >
                        <label htmlFor='employeeID' className="form-label" style={{minWidth:'30%'}}>Employee ID</label>
                        <div className="col" >
                            <input type='text' className="form-control" id='employeeID' placeholder='000' onChange={this.inputHandler}/>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor='testBarcode' className="form-label" style={{minWidth:'30%'}}>Test Barcode</label>
                        <div className="col" >
                            <input type='text' className="form-control" id='testBarcode' placeholder='000' onChange={this.inputHandler}/>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-outline-dark" onClick={this.addTest} value="Add"></input>
                </form>
                </div>
                <table className='table-two-col' style={{margin:'auto'}}>
                    <thead>
                        <tr>
                            <th><a href="/#" style={{color:'white'}} onClick={this.removeTest}>{Constants.TRASH_ICON}</a></th>
                            <th scope='col'>Collection Time</th>
                            <th scope='col'>Employee ID</th>
                            <th scope='col'>Test Barcode</th>
                            <th scope='col'>Lab ID</th>
                        </tr>
                    </thead>
                    <tbody style={{'textAlign':'left'}}>
                        {results.map(res => {
                            const datetime = new Date(res.collectionTime);
                            const date = datetime.toLocaleDateString();
                            const time = datetime.toLocaleTimeString();
                            return (
                                <tr key={`${res.employeeID} ${res.testBarcode}`}>
                                    <td><input type="checkbox" name={`${res.employeeID} ${res.testBarcode}`} onChange={this.checkHandler}/></td>
                                    <td>{date.slice(0,-4) + date.slice(-2)} &nbsp;&nbsp;{time.slice(0,-6) + time.slice(-3)} </td>
                                    <td>{res.employeeID}</td>
                                    <td>{res.testBarcode}</td>
                                    <td>{res.collectedBy}</td>
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