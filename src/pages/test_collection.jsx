import React, { Component } from 'react';
import * as Constants from '../constants';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import CollectionConstructor from '../components/CollectionConstructor';


class TestCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labID: '',
            results: [],
            testsToDelete: []
        }
    }

    componentDidMount() {
        axios.get('/tests/all').then((response) => {
            this.setState({
                labID: localStorage.getItem('labID'),
                results: response.data
            })
        });
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

    setResult = (res) => {
        this.setState({
            results: res
        })
    }

    removeTest = (e) => {
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
                <CollectionConstructor labID={this.state.labID} callback={this.setResult}/>
                {/* table-two-col  */}
                <table className='table-two-col table-fixed' style={{width:'60%', minWidth:'700px'}}>
                    <thead>
                        <tr>
                            <th>
                                <button onClick={this.removeTest} 
                                style={{backgroundColor:'transparent', border:'none', color:'white'}}>
                                {Constants.TRASH_ICON}
                                </button>
                            </th>
                            <th className='col2'>Employee ID</th>
                            <th className='col2'>Test Barcode</th>
                            <th className='col2'>Lab ID</th>
                            <th className='col4'>Collection Time</th>
                        </tr>
                    </thead>
                    <tbody style={{}}>
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
                                    <td className='col2a'>{res.employeeID}</td>
                                    <td className='col2'>{res.testBarcode}</td>
                                    <td className='col2'>{res.collectedBy}</td>
                                    <td className='col4' style={{whiteSpace:'pre-line'}}>
                                    {(date.slice(0,-4) + date.slice(-2)).padStart(8, "\u00a0") + (time.slice(0,-6) + time.slice(-3)).padStart(12, "\u00a0")}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {Constants.COLLECT_WAVE_1}
                {Constants.COLLECT_WAVE_2}
            </div>
        )
    }
}

export default TestCollection;