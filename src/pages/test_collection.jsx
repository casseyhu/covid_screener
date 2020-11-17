import React from 'react';
import * as Constants from '../constants';

const TestCollection = () => {
    return (
        <div style={{'height':'100vh', 'backgroundColor':'white', 'textAlign':'center', 'padding':'40px 50px'}}>
            <h2 > Test Collection </h2>
            <div style={{'display':'flex', 'justifyContent':'center', 'alignItems':'center'}}>
            <form style={{'margin':'25px 10px', 'maxWidth':'50%', 'textAlign':'center'}}>
                <div className='form-group row' >
                    <label for='employeeID' className="form-label" style={{'minWidth':'30%'}}>Employee ID</label>
                    <div class="col" >
                        <input type='text' className="form-control" id='employeeID' placeholder='000'/>
                    </div>
                </div>
                <div className='form-group row'>
                    <label for='testBarcode' className="form-label" style={{'minWidth':'30%'}}>Test Barcode</label>
                    <div className="col" >
                        <input type='text' className="form-control" id='testBarcode' placeholder='000'/>
                    </div>
                </div>
                <button type="button" className="btn btn-outline-dark">Add</button>
            </form>
            </div>
            <table className='table table-hover' style={{'margin':'20px auto', 'width':'90%',}}>
                <thead style={{'backgroundColor':'#dddcdb'}}>
                    <tr>
                        <th ></th>
                        <th scope='col'>Employee ID</th>
                        <th scope='col'>Test Barcode</th>
                    </tr>
                </thead>
                <tbody style={{'textAlign':'left'}}>
                    <tr>
                        <td><div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        </div></td>
                        <td>123</td>
                        <td>456</td>
                    </tr>
                    <tr>
                        <td><div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        </div></td>
                        <td>123</td>
                        <td>456</td>
                    </tr>
                </tbody>
            </table>
            <button type="button" className="btn btn-outline-danger">Delete</button>
        </div>
        // <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
        //     'height':'100vh', 'flexDirection':'column', 'backgroundColor':'#c6e3f7'}}>
        //     <h1 style={{'margin':'10px'}}>Test Collection</h1>
        //     <h2> BLAH BLAH bleh </h2>
        // </div>   
    )
}

export default TestCollection;