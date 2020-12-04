import React, { Component } from 'react'; 
import axios from 'axios';
import * as Constants from '../constants'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


class WellConstructor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wellBarcode: '',
            poolBarcode: '', 
            result: 'in progress',
            selected: 'In Progress'
        }
    }
    

    // Adds the new well to the db
    submitHandler = (event) => {
        axios.post('/wells/add', {
            wellBarcode: this.state.wellBarcode,
            poolBarcode: this.state.poolBarcode,
            result: this.state.result
        }).then(() => {
            this.setState({
                wellBarcode: '', 
                poolBarcode: '', 
                result: 'in progress',
                selected:'In Progress'
            })
            this.props.refresh();
        })
    }

    inputHandler = (event) => {
        switch (event.target.id) {
            case ('wellBarcode'):
                this.setState({wellBarcode: event.target.value});
                break
            case ('poolBarcode'):
                this.setState({poolBarcode: event.target.value});
                break
            default:
                break
        }
    }

    setResult = (e) => {
        e.preventDefault();
        this.setState({
            result: e.target.id,
            selected: e.target.innerHTML
        })
    }

    render() {
        return (
            <div className='wellConstructor'>
                <div className='divTitle'>
                    <h4>New Well</h4>
                </div>
                <form className='wellAdditionForm verticalFlex'>
                    <div className='form-group row' style={{width:'inherit'}}>
                        <label htmlFor='wellBarcode' className="form-label" style={{minWidth:'20%', paddingTop:'5px'}}>Well Barcode</label>
                        <div className="col" style={{paddingRight:'0'}}>
                            <input type='text' className="form-control" id='wellBarcode' placeholder='Ex. WELL01' onChange={this.inputHandler}/>
                        </div>
                    </div>
                    <div className='form-group row' style={{width:'inherit'}}>
                        <label htmlFor='poolBarcode' className="form-label" style={{minWidth:'20%', paddingTop:'5px'}}>Pool Barcode</label>
                        <div className="col" style={{paddingRight:'0'}}>
                            <input type='text' className="form-control" id='poolBarcode' placeholder='Ex. POOL01' onChange={this.inputHandler}/>
                        </div>
                    </div>
                    <div className='form-group row' style={{width:'inherit'}}>
                        <label htmlFor='dropdown' className="form-label" style={{minWidth:'20%', paddingTop:'5px'}}>Select Status</label>
                        <div className="col" style={{paddingRight:'0'}}>
                            <DropdownButton
                                // variant='info'
                                menuAlign="right"
                                title={this.state.selected}
                                id="dropdown"
                            >
                            <Dropdown.Item href="#/action-1" id='in progress' onClick={this.setResult}>In Progress</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" id='positive' onClick={this.setResult}>Positive</Dropdown.Item>
                            <Dropdown.Item href="#/action-3" id='negative' onClick={this.setResult}>Negative</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                    <button className='btn btn-info' type='button' style={{marginBottom:'1rem', width:'20%'}}
                    onClick={this.submitHandler} value='add'>Add</button>
                </form>
            </div>
        )
    }
}

export default WellConstructor;