import React, {Component} from 'react';
import * as Constants from '../constants';
import axios from 'axios';


class EmployeeHome extends Component {
    state = { 
        results: []
    }

    componentDidMount() {
        axios.get('/get/employeeTests', {params: {
            // employeeID: this.props.location
            employeeID: '102'
        }}).then((response) => {
            this.setState({
                results: response.data
            })
        });
    }

    render() { 
        // const { employeeID } = this.props.location;
        const { employeeID } = '102';
        const { results } = this.state;
        var i = 0;
        console.log(employeeID);
        return ( 
        <div style={{ 'height':'100vh', 'backgroundColor':Constants.BGCOLOR_BLUE, 'textAlign':'center', 'padding':'40px 50px'}}>
            <h2 > Employee Home </h2>
            <table style={{'margin':'20px auto', 'marginTop':'40px', 'width':'90%'}} cellPadding='15'>
                <thead style={{'backgroundColor':'white'}}>
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