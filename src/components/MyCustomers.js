import React, { Component } from 'react'

import './customers.css'

export class MyCustomers extends Component {

    // Fills up the table displaying the customers
    fillTable = () => {
        if(this.props.customerdata[0] !== undefined){
            let t = document.getElementById("tableBody");
            
            let length = this.props.customerdata.length;
            
            t.innerHTML = "" // Reset to avoid repetition

            for(let i=0; i<length; i++){
                if(i === 0) // skip the dummy data
                    continue

                let tableContent = `
                <tr>
                    <td>${this.props.customerdata[i].name}</td>
                    <td>${this.props.customerdata[i].email}</td>
                    <td>${this.props.customerdata[i].copies_sold}</td>
                </tr>
                `
                t.innerHTML += tableContent
            }

        }
    }

    render() {
        return (
            <div onLoad={this.fillTable()}>
                <h3 className="customerHeader">My Customers</h3>
                <br></br>
                <div className="tableContainer">
                    <table className="table is-bordered column is-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Copies Sold</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default MyCustomers
