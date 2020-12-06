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
            <svg className="employeeTopSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <defs><linearGradient id="gradient"><stop offset="5%" stop-color="#1E3071" /><stop offset="95%" stop-color="#1D317C" /></linearGradient>
            </defs><path fill="url(#gradient)" fill-opacity="1" d="M0,160L40,181.3C80,203,160,245,240,261.3C320,277,400,267,480,224C560,181,640,107,720,85.3C800,64,880,96,960,96C1040,96,1120,64,1200,85.3C1280,107,1360,181,1400,218.7L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
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
            <svg className="employeeSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <defs><linearGradient id="gradientBottom"><stop offset="80%" stop-color="#1E3071" /><stop offset="20%" stop-color="#182C73" /></linearGradient>
            </defs><path fill="url(#gradientBottom)" fill-opacity="1" d="M0,64L20,58.7C40,53,80,43,120,69.3C160,96,200,160,240,165.3C280,171,320,117,360,122.7C400,128,440,192,480,208C520,224,560,192,600,160C640,128,680,96,720,80C760,64,800,64,840,80C880,96,920,128,960,165.3C1000,203,1040,245,1080,224C1120,203,1160,117,1200,112C1240,107,1280,181,1320,208C1360,235,1400,213,1420,202.7L1440,192L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"></path></svg>
        </div>  
         );
    }
}
 
export default EmployeeHome;