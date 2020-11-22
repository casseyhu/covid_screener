import React, {Component} from 'react';
import * as Constants from '../constants';
import axios from 'axios';


class EmployeeHome extends Component {
    state = { 
        employeeID: '',
        results: []
    }

    componentDidMount() {
        const { employeeID } = this.props.location
        axios.get('/get/employeeTests', {params: {
            employeeID: employeeID
        }}).then((response) => {
            this.setState({
                employeeID: employeeID,
                results: response.data
            })
        });
    }

    render() { 
        const { employeeID, results } = this.state;
        var i = 0;
        return ( 
        <div style={{ 'height':'100vh', 'textAlign':'center', 'padding':'40px 50px'}}>
            <h2 > Employee Home </h2>
            <table className='table-two-col'>
                <thead >
                    <tr>
                        <th scope='col'>Collection Date</th>
                        <th scope='col'>Result</th>
                    </tr>
                </thead>
                <tbody style={{'textAlign':'left'}}>
                    {results.map(res => {
                        var datetime = new Date(res.collectionTime);
                        i += 1;
                        return (
                            <tr key={i}>
                                <td>&nbsp;{datetime.getMonth()+'/'+datetime.getDate()+'/'+datetime.getFullYear()}</td>
                                <td>{res.result}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>   
         );
    }
}
 
export default EmployeeHome;