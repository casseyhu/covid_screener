import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../constants';
import Form from 'react-bootstrap/Form';

class WellTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wells: []
        }
    }

    render() {
        return (
            <div>
                <h1 style={{color:'white'}}> Test </h1>
            </div>
        )
    }
}


export default WellTable