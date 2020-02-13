import React, { Component, CSSProperties } from 'react'

export class Exchange extends Component {
    render() {
        return (
            <div>
                <h1 className="header">Notebook Exchange Details</h1>
                <h3 className="lot-details">Lot Number: </h3>
                <h3 className="lot-details">Lot Description: </h3>

                <button className="btn btn-primary" style={{margin: '2rem'}}>Add Exchange</button>
                <h1 style={headerStyle}>My Exchanges</h1>
                
                <br></br>
                
                <h3 className="lot-details">Total Exchanged: </h3>
                <br></br>
                
                <div>
                    <table className="table is-bordered column is-full" style={{ marginLeft: '2rem', padding: '0rem' }}>
                        <thead>
                            <tr>
                                <th>No. </th>
                                <th>Name</th>
                                <th>Given / Taken</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Apple</td>
                                <td>Given</td>
                                <td>10</td>
                                <td>10th Jan 2020</td>
                                <td style={{ textAlign: 'center' }}><i className="fas fa-trash-alt"></i></td>
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
    fontWeight: 500,
    marginLeft: '2rem'
}

export default Exchange
