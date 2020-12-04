import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


const CollectionConstructor = (props) => {
    const [employeeID, setEmployeeID] = useState('');
    const [testBarcode, setTestBarcode] = useState('');

    /* Adding new Test Collection to EmployeeTest and display */
    const addTest = (event) => {
        event.preventDefault();
        axios.post('/tests/add', {
            testBarcode: testBarcode,
            employeeID: employeeID,
            collectedBy: props.labID
        }).then((response) => {
            /* RELOAD AND RERENDER THE PAGE TO SHOW THE NEWLY ADDED TEST */
            axios.get('/tests/all').then((response) => {
                props.callback(response.data)
            });
        })
    }

    return (
        <Form className='testCollectionForm verticalFlex' style={{width:'50%'}}>
            <Form.Group as={Row} style={{width:'60%'}}>
                <Form.Label style={{width:'30%'}}>Employee ID</Form.Label>
                <Col>
                    <Form.Control type="text" placeholder='Ex. 100' id='employeeID' onChange={(e) => setEmployeeID(e.target.value)}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} style={{width:'60%'}}>
                <Form.Label style={{width:'30%'}}>Test Barcode</Form.Label>
                <Col >
                    <Form.Control type="text" placeholder='Ex. 001' id='testBarcode' onChange={(e) => setTestBarcode(e.target.value)}/>
                </Col>
            </Form.Group>
            <Button variant="outline-light" type="submit" onClick={addTest} style={{width:'100px'}}>
                Add
            </Button>
        </Form>
    )
}

export default CollectionConstructor