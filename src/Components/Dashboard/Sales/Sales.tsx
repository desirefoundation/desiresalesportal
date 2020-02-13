import React, { Component } from 'react'

import MyCustomers from './MyCustomers'

import './sales.css'

export class Sales extends Component {
    render() {
        return (
            <div>
                <h1 className="header">Sales Details</h1>
                <h3 className="lot-details">Lot Number: </h3>
                <h3 className="lot-details">Lot Description: </h3>
                
                <br></br>
                
                <div className="sales-cards-container">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="sales-card-text">Total Copies Sold: </h5>
                            <br></br>
                            <h5 className="sales-card-text">Total Sales Amount: </h5>
                            <br></br>
                            <h5 className="sales-card-text">Amount Paid to Coordinator</h5>
                            <form style={{marginTop: '1rem'}}>
                                <input id="amountPaidToCoordinatorInput" required type="number" className='input' min='0' placeholder="Reset to this amount" style={{width:'60%', marginRight:'1rem'}}></input>
                                <input type="submit" value="Update" className="button"/>
                            </form>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-money-bill-alt" style={{marginRight: '0.3rem'}}></i> CASH
                            </h5>
                            <h6 className="card-subtitle mb-3 text-muted">No. of copies sold in Cash</h6>
                            <p className="card-text">19</p>
                            <a href="https://www.google.com" className="card-link btn btn-outline-primary" style={{float: 'right'}}>
                                Add / Edit
                            </a>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fas fa-credit-card" style={{marginRight: '0.3rem'}}></i> PAYTM
                            </h5>
                            <h6 className="card-subtitle mb-3 text-muted">No. of copies sold in Paytm</h6>
                            <p className="card-text">19</p>
                            <a href="https://www.google.com" className="card-link btn btn-outline-primary" style={{float: 'right'}}>
                                Add / Edit
                            </a>
                        </div>
                    </div>
                    

                </div>

                <br></br><br></br>

                <MyCustomers></MyCustomers>

            </div>
        )
    }
}

export default Sales
