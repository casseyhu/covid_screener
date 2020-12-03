import React, { Component } from 'react'; 
import axios from 'axios';
import * as Constants from '../constants'

class WellConstructor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wellBarcode: '',
            poolBarcode: '', 
            result: ''
        }
    }

    // Adds the new well to the db
    submitHandler = (event) => {
        event.preventDefault();
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

    newWellHandler = (event) => {
        event.preventDefault();
        console.log("Adding new well");
        axios.post('/wells/add', {
            wellBarcode: this.state.wellBarcode,
            poolBarcode: this.state.poolBarcode,
            result: this.state.result
        }).then(() => {
            //   Unsure if this works entirely. 
            this.props.parentCallback([this.state])
            this.setState({
                wellBarcode: '', 
                poolBarcode: '', 
                result: ''
            })
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

                    <div id='wellConstructor-btns'>

                        {/* TODO: Plug in functionality for dropbar */}
                        <div class="dropdown">
                            <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Status
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button class="dropdown-item" type="button">In Progress</button>
                                <button class="dropdown-item" type="button">Positive</button>
                                <button class="dropdown-item" type="button">Negative</button>
                            </div>
                        </div>
                        
                        <button className='btn btn-info' type='button' onClick={this.newWellHandler} value='add'>Add</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default WellConstructor;