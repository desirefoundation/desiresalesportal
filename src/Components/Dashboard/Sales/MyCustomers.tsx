import React, { Component, CSSProperties } from 'react'

export class MyCustomers extends Component {
    render(){
        return(
            <div>
                <h3 style={headerStyle}>My Customers</h3>
                <br></br>
                <div style={{marginLeft: '2rem'}}>
                    <table className="table is-bordered column is-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>...</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                        <tr>
                            <td>Apple</td>
                            <td>apple.com</td>
                            <td><i className="fas fa-trash-alt"></i></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const headerStyle: CSSProperties = {
    fontFamily: 'Rubik, sans-serif',
    fontSize: '3rem',
    fontWeight: 400,
    marginLeft: '2rem'
}


export default MyCustomers;