import React, { Component } from 'react'

import './stock.css'
export class Stock extends Component {
    render() {
        return (
            <div>
                <h1 className='header'>Notebook Stock Details</h1>
                <h3 className='lot-details'>Lot Number : </h3>
                <h3 className='lot-details'>Lot Description : </h3>
                <h3 className='lot-details'>Copies Sold : </h3>
                <br></br>

                <div className="cardsContainer">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-box-open" style={{marginRight: '0.3rem'}}></i> COPIES TAKEN
                            </h5>
                            <h6 className="card-subtitle mb-3 text-muted">Copies Received <br></br> in Hand on Lot Arrival</h6>
                            <p className="card-text">19</p>
                            <a href="https://www.google.com" className="card-link btn btn-outline-primary" style={{float: 'right'}}>Edit</a>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-times-circle" style={{marginRight: '0.3rem'}}></i> DEFECTIVE
                            </h5>
                            <h6 className="card-subtitle mb-3 text-muted">Total Copies that <br></br> are Torn or Damaged</h6>
                            <p className="card-text">19</p>
                            <a href="https://www.google.com" className="card-link btn btn-outline-danger" style={{float: 'right'}}>Edit</a>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-exchange-alt" style={{marginRight: '0.3rem'}}></i> EXCHANGES
                            </h5>
                            <h6 className="card-subtitle mb-3 text-muted">Copies Received by exchanging<br></br>copies with other members</h6>
                            <p className="card-text">19</p>
                        </div>
                    </div>


                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-plus" style={{marginRight: '0.3rem'}}></i> COPIES LEFT
                            </h5>
                            <h6 className="card-subtitle mb-3 text-muted">
                                Total Copies Left in Hand<br></br>
                                (taken + exchange - defective - sold)
                            </h6>
                            <p className="card-text">19</p>
                        </div>
                        <h6 className="card-subtitle mb-3 text-muted">
                            Cannot be negative. Please recheck your calculations if negative.
                        </h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default Stock
