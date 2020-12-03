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
        console.log(event.target.name)
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
            <div className="testCollectionContainer">
                <h2> Test Collection 🧪</h2>
                <Form className='testCollectionForm verticalFlex'>
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
                    <Button variant="outline-light" type="submit" onClick={this.addTest} style={{width:'100px'}}>
                        Add
                    </Button>
                </Form>

                <table className='table-two-col'>
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
                                    <td>
                                    <Form.Check 
                                        type={'checkbox'}
                                        name={res.testBarcode}
                                        onChange={this.checkHandler}
                                        style={{paddingLeft:'30px'}}
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
                <svg className="collectWave"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><defs><linearGradient id="labGrad"  x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#1D3397" /><stop offset="100%" stopColor="#031050" /></linearGradient>
                </defs><path fill="url(#labGrad)"  fillOpacity="1" d="M0,256L40,224C80,192,160,128,240,96C320,64,400,64,480,58.7C560,53,640,43,720,42.7C800,43,880,53,960,48C1040,43,1120,21,1200,53.3C1280,85,1360,171,1400,213.3L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
                <svg className="collectWave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><defs><linearGradient id="labGrad"  x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#03135F" /><stop offset="100%" stopColor="#031050" /></linearGradient>
                </defs><path fill="url(#labGrad)" fillOpacity="1" d="M0,192L34.3,165.3C68.6,139,137,85,206,101.3C274.3,117,343,203,411,224C480,245,549,203,617,160C685.7,117,754,75,823,90.7C891.4,107,960,181,1029,213.3C1097.1,245,1166,235,1234,240C1302.9,245,1371,267,1406,277.3L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>
            </div>
        )
    }
}

export default TestCollection;