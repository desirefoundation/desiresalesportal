/*
MyCustomers.js

The bottom most compoment on the home page. 
Just displays a table of the customers the user has sold to
*/

import React, { Component } from 'react'

import './customers.css'
export class MyCustomers extends Component {

    render() {
        if(this.props.customerdata[0] !== undefined){
            return (
                <div>
                    <h3 className="customerHeader">All Customers</h3>
                    <br></br>
                    <div className="tableContainer">
                        <table className="table is-bordered column is-full">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>...</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">
                                {this.props.customerdata.map((customer, index) => {
                                    if(index === 0)
                                        return (<tr key={index}></tr>)
                                    
                                    return (
                                        <tr key={index}>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td onClick={() => {this.props.deleteCustomer(index)}}><i className="fas fa-trash-alt"></i></td>
                                        </tr> )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3 className="customerHeader">My Customers</h3>
                    <br></br>
                </div>
            )
        }
    }
}

export default MyCustomers
