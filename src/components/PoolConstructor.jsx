import React, { Component } from 'react'; 
import axios from 'axios';
import * as Constants from '../constants'

class PoolConstructor extends Component {
    constructor(props){
        super(props)
        this.state={
            poolBarcode: '',
            testBarcode: '',
            barcodeSet: [],
        }
    }

    componentDidMount(){
        // console.log("Pool Constructor mounted:")
        // this.setState({poolBarcode: 400, barcodeSet: [100,200,300, 4, 5, 6, 7, 8, 9]}, () => {
        //     console.log("States of pool constructor: ", this.state, "|", this.state.poolBarcode, "|", this.state.testBarcodes)
        // })
    }

    // Can do some error check where each test barcode must be a number. 
    // For now, ignoring. 
    submitHandler = (event) => {
        event.preventDefault();
        console.log("Submitting new pool");

        // TODO: Submitting passes in the (1) pool barcode and (2) LIST of test barcodes.
        //       To be handled in backend when submitting (must INSERT each (PoolBarcode, TestBarcode) pair. )
        axios.post('/pools/add', {
            poolBarcode: this.state.poolBarcode,
            barcodeSet: this.state.barcodeSet
        }).then(response => {
            this.setState({
                poolBarcode: '',
                testBarcode: '',
                barcodeSet: [],
            });
            // Passes the 
            this.props.callbackFromParent(response.data)
        })
    }

    inputHandler = (event) => {
        switch (event.target.id) {
            case ('poolBarcode'):
                this.setState({poolBarcode: event.target.value});
                break
            case ('testBarcode'):
                this.setState({testBarcode: event.target.value});
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

    addTestBarcode = (event) => {
        event.preventDefault();
        console.log("Adding new test Barcode")
        let newTestBarcodes = [...this.state.barcodeSet];
        newTestBarcodes.push(this.state.testBarcode)
        this.setState({barcodeSet: newTestBarcodes}, () => {
            console.log(this.state.barcodeSet)
        })
    }

    render() {
        let ctr = 0;
        return(
            <div className='poolConstructor'>
                <div className='divTitle'>
                        <h3> New Pool </h3>
                </div>
                <form className='poolAdditionForm' id='poolAdditionForm'>
                    <div className='form-group row' style={{width:'inherit'}}>
                        <label htmlFor='poolBarcode' className="form-label" style={{minWidth:'20%', paddingTop:'5px'}}>Pool Barcode</label>
                        <div className="col" >
                            <input type='text' className="form-control" id='poolBarcode' placeholder='000' onChange={this.inputHandler}/>
                        </div>
                    </div>
                    <div className='form-group row' style={{width:'inherit'}}>
                        <label htmlFor='testBarcode' className="form-label" style={{minWidth:'20%', paddingTop:'5px'}}>Test Barcode</label>
                        <div className="col">
                            <input type='text' className="form-control" id='testBarcode' style={{width:'100%'}} placeholder='000' onChange={this.inputHandler}/>
                        </div>
                        <button type='button' onClick={this.addTestBarcode} className='btn btn-success'>Add</button>
                    </div>
                    <table className='table-two-col' id='newPoolTable' style={{margin:'auto', width:'inherit', borderTopLeftRadius: '0px', 
                        borderTopRightRadius: '0px', borderTop: '2px solid #6bc2c5' }}>
                        {/* <thead>
                            <tr>
                                <th colspan='3' style={{textAlign:'center'}}> Barcodes </th>
                            </tr>
                        </thead> */}
                        <tbody style={{textAlign:'left'}}>
                            {this.state.barcodeSet.map(res => {
                                ctr += 1;
                                return (
                                    <tr key={` ${res} ${ctr-1}`}>
                                        <td style={{width:'100px'}}>{ctr}</td>
                                        <td style={{width:'250px'}}>{res}</td>
                                        <td style={{width:'50px'}}><button type='button' className='btn btn-danger' 
                                            onClick={this.deleteHandler}>{Constants.TRASH_ICON}</button></td> 
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </form>
                <input type="submit" form='poolAdditionForm' className="btn btn-outline-dark" style={{margin:'15px 5px 15px 5px'}} 
                    onClick={this.submitHandler} value="Submit Pool"></input>
            </div>
        )
    }
}

export default PoolConstructor