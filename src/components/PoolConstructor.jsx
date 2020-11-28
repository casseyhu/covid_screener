import React, { Component } from 'react'; 
import axios from 'axios';
import * as Constants from '../constants'

class PoolConstructor extends Component {
    constructor(props){
        super(props)
        this.state={
            poolBarcode: '',
            testBarcodes: [],
        }
    }

    componentDidMount(){
        console.log("Pool Constructor mounted:")
        // this.setState({poolBarcode: 400, testBarcodes: [100,200,300, 4, 5, 6, 7, 8, 9]}, () => {
        //     console.log("States of pool constructor: ", this.state, "|", this.state.poolBarcode, "|", this.state.testBarcodes)
        // })
    }

    // Can do some error check where each test barcode must be a number. 
    // For now, ignoring. 
    submitHandler = (event) => {
        event.preventDefault();
        console.log("Submitting new pool");
        /**
         * Format test barcodes in here? 
         * Might keep as a string with , as a delimiter (114,115,116,117..)
         * Or might convert to be a list [114, 115, 116, 117, ... ]
         */
        // axios.post('/pools/add', {
        //     poolBarcode: this.state.poolBarcode,
        //     testBarcodes: this.state.testBarcodes
        // })
    }

    inputHandler = (event) => {
        switch (event.target.id) {
            case ('poolBarcode'):
                this.setState({poolBarcode: event.target.value});
                break
            case ('testBarcodes'):
                this.setState({testBarcodes: event.target.value});
                break
            default:
                break
        }
    }

    deleteHandler = (event) => {
        event.preventDefault();
        // Delete the specific item from the state of testBarcodes
        console.log(this.key)
    }

    render() {
        let ctr = 0;
        return(
            <div className='poolConstructor'>
                <div className='divTitle'>
                        <h2> New Pool </h2>
                </div>
                <form className='poolAdditionForm' id='poolAdditionForm'>
                    <div className='form-group row' style={{width:'inherit'}}>
                        <label htmlFor='poolBarcode' className="form-label" style={{minWidth:'25%'}}>Pool Barcode</label>
                        <div className="col" >
                            <input type='text' className="form-control" id='poolBarcode' placeholder='000' onChange={this.inputHandler}/>
                        </div>
                    </div>
                    <div className='form-group row' style={{width:'inherit'}}>
                        <label htmlFor='testBarcode' className="form-label" style={{minWidth:'25%'}}>Test Barcode</label>
                        <div className="col" >
                            <input type='text' className="form-control" id='testBarcode' style={{width:'100%'}} placeholder='000' onChange={this.inputHandler}/>
                        </div>
                        <button type='button' onClick={this.addTestBarcode} className='btn btn-success'>Add</button>
                    </div>
                    <table className='table-two-col' style={{margin:'auto', width:'inherit'}}>
                        {/* <thead>
                            <tr>
                                <th colspan='3' style={{textAlign:'center'}}> Barcodes </th>
                            </tr>
                        </thead> */}
                        <tbody style={{textAlign:'left'}}>
                            {this.state.testBarcodes.map(res => {
                                ctr += 1;
                                return (
                                    <tr key={` ${res} ${ctr-1}`}>
                                        <td style={{width:'100px'}}>{ctr-1}</td>
                                        <td style={{width:'250px'}}>{res}</td>
                                        <td style={{width:'50px'}}><button type='button' className='btn btn-danger' 
                                            onClick={this.deleteHandler.bind(this)}>{Constants.TRASH_ICON}</button></td> 
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </form>
                <input type="submit" form='poolAdditionForm' className="btn btn-outline-dark" style={{margin:'15px 5px 5px'}} 
                    onClick={this.addTest} value="Submit Pool"></input>
            </div>
        )
    }
}

export default PoolConstructor