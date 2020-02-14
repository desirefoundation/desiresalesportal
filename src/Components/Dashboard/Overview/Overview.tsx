import React, { Component } from 'react'

import './overview.css'

export class Overview extends Component {
    
    render() {
        return (
            <div>
                <h2 className="overview-header">Hi <span>Junaid</span></h2>

                <div className="profile-details-container">
                    <h5>
                        <i className="fas fa-envelope-open-text" style={{color: '#0d47a1', marginRight: '0.7rem'}}></i>
                        Email : <span>junaidrahim5a@gmail.com</span>
                    </h5>
                    
                    <h5>
                        <i className="fas fa-users" style={{color: '#0d47a1', marginRight: '0.4rem'}}></i>
                        Buddy Group : <span>4</span>
                    </h5>
                    
                    <h5>
                        <i className="fas fa-truck-loading" style={{color: '#0d47a1', marginRight: '0.4rem'}}></i>
                        Current Lot : <span>3</span>
                    </h5>
                </div>

                <div className="overview-container">
                    <div>
                        <h2 style={{textAlign: 'center'}}>Sales</h2>
                        <br></br>
                        <h5>Total Sold : </h5>
                        <h5>Total Sale Revenue : </h5>
                    </div>
                    
                    <div>
                        <h2 style={{textAlign: 'center'}}>Stock</h2>
                        <br></br>
                        <h5>Copies Left in Hand : </h5>
                        <br></br>
                        <h5>Defective : </h5>
                        <h5>Copies Taken : </h5>
                    </div>

                    <div>
                        <h2 style={{textAlign: 'center'}}>Exchanges</h2>
                        <br></br>
                        <h5>Total Exchanged: </h5>
                    </div>
                </div>
                
                <canvas id="pieChart" width="400" height="400"></canvas>

                <div className="last-updated-container">
                    <p>Last Updated on : { new Date().toString() }</p>
                </div>
            </div>
        )
    }
}

export default Overview
