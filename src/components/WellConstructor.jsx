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
            selected: 'In Progress',
            editing: 0
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.wellToEdit !== prevProps.wellToEdit) {
            let select = 'In Progress';
            switch(this.props.wellToEdit['result']) {
                case('negative'):
                    select = 'Negative'
                    break;
                case('positive'):
                    select = 'Positive'
                    break;
            }
            this.setState({
                wellBarcode: this.props.wellToEdit['wellBarcode'],
                poolBarcode: this.props.wellToEdit['poolBarcode'],
                result: this.props.wellToEdit['result'],
                selected: select,
                editing: 1
            }, () => {
                // Set the innerhtml of the textboxes, the dropbar. 
            })
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

    cancelEdit = (e) => {
        this.setState({
            wellBarcode: '', 
            poolBarcode: '', 
            result: 'in progress',
            selected:'In Progress',
            editing: 0
        })
    }

    saveEdit = (e) => {
        axios.put('/wells/update', {
            result: this.state.result,
            wellBarcode: this.state.wellBarcode,
            poolBarcode: this.state.poolBarcode
        }).then(() => {
            this.setState({
                wellBarcode: '', 
                poolBarcode: '', 
                result: 'in progress',
                selected:'In Progress',
                editing: 0
            })
            this.props.refresh();
        })
    }

    editingRender = () => {
        if(this.state.editing) {
            return (
                <div stlye={{width:'inherit', display:'flex', flexDirection:'space-evenly', margin:'0px'}}>
                    <button className='btn btn-info' type='button' style={{width:'100px', margin:'0px 5px 1rem'}}
                        onClick={this.cancelEdit} value='add'>Cancel</button> 
                    <button className='btn btn-info' type='button' style={{width:'100px', margin:'0px 5px 1rem'}}
                        onClick={this.saveEdit} value='add'>Save</button> 
                </div>
            )
        }
        else {
            return (
                <button className='btn btn-dark' type='button' style={{marginBottom:'1rem', width:'20%'}}
                    onClick={this.submitHandler} value='add'>Add</button> 
            )
        }
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
                            <input type='text' value={this.state.wellBarcode} className="form-control" id='wellBarcode' placeholder='Ex. WELL01' onChange={this.inputHandler}></input>
                        </div>
                    </div>
                    <div className='form-group row' style={{width:'inherit'}}>
                        <label htmlFor='poolBarcode' className="form-label" style={{minWidth:'20%', paddingTop:'5px'}}>Pool Barcode</label>
                        <div className="col" style={{paddingRight:'0'}}>
                            <input type='text' value={this.state.poolBarcode} className="form-control" id='poolBarcode' placeholder='Ex. POOL01' onChange={this.inputHandler}/>
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
                    {this.editingRender()}
                    {/* <button className='btn btn-info' type='button' style={{marginBottom:'1rem', width:'20%'}}
                    onClick={this.submitHandler} value='add'>{this.isEditing}</button> */}
                </form>
            </div>
        )
    }
}

export default WellConstructor;