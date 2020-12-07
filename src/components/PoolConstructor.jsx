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


    submitHandler = () => {
        const { poolBarcode, barcodeSet } = this.state;
        if (poolBarcode === '' || barcodeSet === []) return
        axios.post('/pools/add', {
            poolBarcode: poolBarcode,
            barcodeSet: barcodeSet
        }).then(() => {
            this.setState({
                poolBarcode: '',
                testBarcode: '',
                barcodeSet: [],
            }, () => {
                this.props.refresh()
            });
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
        let newBarcodeSet = [...this.state.barcodeSet];
        newBarcodeSet.splice(index, 1);
        this.setState({barcodeSet: newBarcodeSet});
    }

    addTestBarcode = (event) => {
        event.preventDefault();
        axios.get(`/ping/${this.state.testBarcode}`).then((response) => {
            if (response.data.length > 0) {
                let newTestBarcodes = [...this.state.barcodeSet, this.state.testBarcode];
                this.setState({
                    testBarcode: '',
                    barcodeSet: newTestBarcodes
                });
            }
        })
    }

    render() {
        const { poolBarcode, testBarcode } = this.state;
        return(
            <div className='poolConstructor'>
                <div className='divTitle'>
                    <h4><strong> New Pool </strong></h4>
                </div>
                <form className='poolAdditionForm verticalFlex' >
                    <div className='form-group row' style={{width:'inherit'}}>
                        <label htmlFor='poolBarcode' className="form-label" style={{minWidth:'20%', paddingTop:'5px'}}>Pool Barcode</label>
                        <div className="col" style={{paddingRight:'0'}}>
                            <input type='text' className="form-control" id='poolBarcode' value={poolBarcode}
                                placeholder='Ex. POOL01' onChange={this.inputHandler}/>
                        </div>
                    </div>
                    <div className='form-group row' style={{width:'inherit'}}>
                    <label htmlFor='testBarcode' className="form-label" style={{minWidth:'20%', paddingTop:'5px'}}>Test Barcode</label>
                        <div className="col" >  
                            <input type='text' className="form-control" id='testBarcode' value={testBarcode} 
                                placeholder='Ex. 100' onChange={this.inputHandler}/>
                        </div>
                        <button type='button' onClick={this.addTestBarcode} className='addBarcodeBtn'>{Constants.ADD_ICON}</button>
                    </div>

                    <table className='form-group row' id='newPoolTable' style={{margin:'auto', marginBottom:'20px', width:'inherit', 
                        borderTop: '2px solid white', borderBottom: '2px solid white', overflow:'scroll', maxHeight:'300px' }}>
                        <tbody style={{textAlign:'left'}}>
                            {this.state.barcodeSet.map((res, index) => {
                                return (
                                    <tr key={`${res} ${index}`}>
                                        <td style={{width:'100px', padding:'2px'}}>{index+1}</td>
                                        <td style={{width:'250px', padding:'2px'}}>{res}</td>
                                        <td style={{width:'50px', padding:'2px'}}><button type='button' className='btn btn-danger' style={{backgroundColor:'transparent', border:'none', color:'red'}}
                                            onClick={() => {this.deleteHandler(index)}}>{Constants.DELETE_ICON}</button></td> 
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </form>
                <input type="submit" form='poolAdditionForm' className="btn btn-dark" style={{margin:'0 15px 15px 15px'}} 
                    onClick={this.submitHandler} value="Submit Pool"></input>
            </div>
        )
    }
}

export default PoolConstructor