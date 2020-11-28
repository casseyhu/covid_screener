import React from 'react';
import LoginContainer from '../components/LoginContainer';

const EmployeeLogin = (props) => {

    const redirectPath = (response) => {
        this.props.history.push({
            pathname: '/employee/home',
            employeeID: response.data[0].employeeId
        })
    }

    return (
        <LoginContainer history={props.history} userType="Employee" path="employee" redirectPath={redirectPath}/>
    )
}

export default EmployeeLogin;