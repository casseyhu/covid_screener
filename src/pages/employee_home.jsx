import React, { Component } from 'react';
import * as Constants from '../constants';
import axios from 'axios';


class EmployeeHome extends Component {
    state = { 
        employeeID: '',
        results: []
    }

    componentDidMount() {
        let { employeeid } = this.props.location
        if (employeeid){
            localStorage.setItem('employeeID', employeeid);
        }
        else {
            employeeid = localStorage.getItem('employeeID');
        }
        axios.get('/tests/for', {params: {
            employeeID: employeeid
        }}).then((response) => {
            this.setState({
                employeeID: employeeid,
                results: response.data
            })
        });
    }

    render() { 
        const { employeeID, results } = this.state;
        return ( 
        <div className="employeeBody">
            {Constants.EMPLOYEE_TOP}
            <div className="employeeWrapper">
                <div className="employeeContainer">
                    <h2>🔮</h2>
                    <h2>Employee Home</h2>
                    <p>Here are your test results.</p>
                    <p>Employee ID: {employeeID}</p>
                    <table className='table-two-col'>
                        <thead >
                            <tr>
                                <th scope='col'>Collection Date</th>
                                <th scope='col'>Result</th>
                            </tr>
                        </thead>
                        <tbody style={{'textAlign':'left'}}>
                            {results.map((res,i) => {
                                var datetime = new Date(res.collectionTime);
                                return (
                                    <tr key={i}>
                                        <td>&nbsp;{datetime.toLocaleDateString()}&nbsp;&nbsp;{datetime.toLocaleTimeString()}</td>
                                        <td>{res.result}</td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                </div> 
            </div>
            {Constants.EMPLOYEE_BOTTOM}
        </div>  
         );
    }
}
 
export default EmployeeHome;