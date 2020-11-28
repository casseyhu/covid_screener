import React from 'react';
import LoginContainer from '../components/LoginContainer';

const LabLogin = (props) => {

    const redirectPath = (response) => {
        this.props.history.push({
            pathname: '/labtech/home',
            labid: response.data[0].labID
        })
    }

    return (
        <LoginContainer history={props.history} userType="Lab Worker" path="labemployee" redirectPath={redirectPath}/>
    )
}

export default LabLogin;