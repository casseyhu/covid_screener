import React, { Component } from 'react';
import * as Constants from '../constants';
import axios from 'axios';
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
        console.log(this.state.testsToDelete)
        if (this.state.testsToDelete.length === 0) return
        axios.delete('/tests/delete', { data: {
            testsToDelete: this.state.testsToDelete
        }}).then((response) => {
            console.log('deleted tests')
            axios.get('/tests/all').then((response) => {
                this.setState({
                    results: response.data,
                    testsToDelete: []
                })
            });
        })
    }

    render() {
        const { results } = this.state;
        return (
            <div style={{height:'100vh', backgroundColor:'white', textAlign:'center', margin:'40px'}}>
                <h2> Test Collection </h2>
                <div className='loginForm' style={{margin:'auto'}}>
                    <Form className='testCollectionForm'>
                        <Form.Group as={Row}>
                            <Form.Label column sm={5}>Employee ID</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="text" placeholder='Ex. 100' id='employeeID' onChange={this.inputHandler}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={5}>Test Barcode</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="text" placeholder='Ex. 001' id='testBarcode' onChange={this.inputHandler}/>
                            </Col>
                        </Form.Group>
                        <Button variant="outline-dark" type="submit" onClick={this.addTest} style={{width:'100px'}}>
                            Add
                        </Button>
                    </Form>

                </div>
                <table className='table-two-col' style={{margin:'auto'}}>
                    <thead>
                        <tr>
                            <th>
                                <button onClick={this.removeTest} style={{backgroundColor:'transparent', border:'none', color:'white'}}>
                                {Constants.TRASH_ICON}
                                </button>
                            </th>
                            <th scope='col'>Employee ID</th>
                            <th scope='col'>Test Barcode</th>
                            <th scope='col'>Lab ID</th>
                            <th scope='col'>Collection Time</th>
                        </tr>
                    </thead>
                    <tbody style={{'textAlign':'left'}}>
                        {results.map(res => {
                            const datetime = new Date(res.collectionTime);
                            const date = datetime.toLocaleDateString();
                            const time = datetime.toLocaleTimeString();
                            return (
                                <tr key={`${res.employeeID} ${res.testBarcode}`}>
                                    {/* <td><input type="checkbox" name={res.testBarcode} onChange={this.checkHandler}/></td> */}
                                    <td>
                                    <Form.Check 
                                        type={'checkbox'}
                                        name={res.testBarcode}
                                        onChange={this.checkHandler}
                                    /> </td>
                                    <td>{res.employeeID}</td>
                                    <td>{res.testBarcode}</td>
                                    <td>{res.collectedBy}</td>
                                    <td style={{whiteSpace:'pre-line'}}>
                                    {(date.slice(0,-4) + date.slice(-2)).padStart(8, '0') + (time.slice(0,-6) + time.slice(-3)).padStart(12, "\u00a0")}
                                    </td>
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