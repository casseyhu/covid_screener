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
            // Passes the data back to parent (pool_mapping page) and then forces
            // reload of the pool map table component? 
            this.props.newPoolSubmission(response.data)
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

    deleteHandler(index) {
        // preventDefault();    
        // Delete the specific item from the state of testBarcodes
        console.log(index)
        let newBarcodeSet = [...this.state.barcodeSet];
        newBarcodeSet.splice(index, 1);
        this.setState({barcodeSet: newBarcodeSet});
    }

    addTestBarcode = (event) => {
        event.preventDefault();
        console.log("Adding new test Barcode")
        let newTestBarcodes = [...this.state.barcodeSet];
        newTestBarcodes.push(this.state.testBarcode)
        this.setState({barcodeSet: newTestBarcodes})
    }

    render() {
        return(
            <div className='poolConstructor'>
                <div className='divTitle'>
                    <h3> New Pool </h3>
                </div>
                <form className='poolAdditionForm verticalFlex' id='poolAdditionForm'>
                    <div className='form-group row' style={{width:'inherit'}}>
                        <label htmlFor='poolBarcode' className="form-label" style={{minWidth:'20%', paddingTop:'5px'}}>Pool Barcode</label>
                        <div className="col" style={{paddingRight:'0'}}>
                            <input type='text' className="form-control" id='poolBarcode' placeholder='Ex. POOL01' onChange={this.inputHandler}/>
                        </div>
                    </div>
                    <h4>Test Barcodes</h4>

                    <table className='form-group row' id='newPoolTable' style={{margin:'auto', marginBottom:'20px', width:'inherit', 
                        borderTop: '2px solid #6bc2c5', borderBottom: '2px solid #6bc2c5', overflow:'scroll', maxHeight:'300px' }}>
                        <tbody style={{textAlign:'left'}}>
                            {this.state.barcodeSet.map((res, index) => {
                                return (
                                    <tr key={`${res} ${index}`}>
                                        <td style={{width:'100px'}}>{index+1}</td>
                                        <td style={{width:'250px'}}>{res}</td>
                                        <td style={{width:'50px'}}><button type='button' className='btn btn-danger' style={{backgroundColor:'transparent', border:'none'}}
                                            onClick={() => {this.deleteHandler(this.state.barcodeSet.indexOf(res))}}>{Constants.TRASH_ICON}</button></td> 
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div className='form-group row' style={{width:'100%', display:'flex', alignContent:'center', alignItems:'center'}}>
                    <label htmlFor='testBarcode' className="form-label" style={{minWidth:'20%', paddingTop:'5px'}}>Test Barcode</label>
                        <div className="col" >
                            <input type='text' className="form-control" id='testBarcode'  placeholder='Ex. 100' onChange={this.inputHandler}/>
                        </div>
                        <button type='button' onClick={this.addTestBarcode} className='btn btn-success' >Add</button>
                    </div>
                </form>
                <input type="submit" form='poolAdditionForm' className="btn btn-outline-dark" style={{margin:'0 15px 15px 15px'}} 
                    onClick={this.submitHandler} value="Submit Pool"></input>
            </div>
        )
    }
}

export default PoolConstructor