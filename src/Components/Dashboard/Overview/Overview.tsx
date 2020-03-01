import React, { Component } from 'react'

import './overview.css'


type overviewdata = {
    amountPaidToCorrdinator?: any
    buddygroup?: number
    copiesTaken?: any
    copyTransactions?: any
    defective?: any
    email?: string
    lastUpdated?: string
    name?: string
    soldTillDateCash?: any
    soldTillDatePaytm?: any
}


type props = {
    data: overviewdata
    lotNumber: number
    lotDescription: string
    price: number
}
export class Overview extends Component<props> {
    
    getLotNumberString = () : string => "lot" + this.props.lotNumber.toString()
    
    calculateCopiesLeft = () : number => {
        const lotNumber : string = this.getLotNumberString()
        const copiesLeft: number = this.props.data.copiesTaken[lotNumber] - this.props.data.defective[lotNumber]

        return copiesLeft;
    }

    calculateTotalSold = () : number => {
        const lotNumber : string = this.getLotNumberString()
        const cash: number = parseInt(this.props.data.soldTillDateCash[lotNumber])
        const paytm: number = parseInt(this.props.data.soldTillDatePaytm[lotNumber])
        
        return cash+paytm
    }

    calculateTotalExchanged = () : number => {
        let totalExchanged: number = 0
        const length : number = this.props.data.copyTransactions.length

        for(let i: number = 1; i<length; i++) {
            if(parseInt(this.props.data.copyTransactions[i].lot) === this.props.lotNumber)
                totalExchanged += parseInt(this.props.data.copyTransactions[i].amount);
        }

        return totalExchanged
    }

    calculateCopiesLeftInHand = () : number => {
        const lotNumber : string = this.getLotNumberString()
        const left = this.props.data.copiesTaken[lotNumber] - this.props.data.defective[lotNumber] 
                    - this.calculateTotalSold() + this.calculateTotalExchanged()
        
        return left
    }
    
    render() {
        return (
            <div>
                <h2 className="overview-header">Hi <span>{this.props.data.name}</span></h2>

                <div className="profile-details-container">
                    <h5>
                        Email : <span>{this.props.data.email}</span>
                    </h5>
                    
                    <h5>
                        Buddy Group : <span>{this.props.data.buddygroup}</span>
                    </h5>
                    
                    <h5>
                        Current Lot : <span>{this.props.lotNumber}</span>
                    </h5>

                    <h5>
                        Lot Description : <span>{this.props.lotDescription}</span>
                    </h5>
                </div>

                <div className="overview-container">
                    <div>
                        <h2 style={{textAlign: 'center'}}>Sales</h2>
                        <br></br>
                        <h5>Total Sold : {this.calculateTotalSold()}</h5>
                        <h5>Total Sale Revenue : {this.calculateTotalSold() * this.props.price}</h5>
                    </div>
                    
                    <div>
                        <h2 style={{textAlign: 'center'}}>Stock</h2>
                        <br></br>
                        <h5>Copies Left in Hand : {this.calculateCopiesLeftInHand()}</h5>
                        <br></br>
                        <h5>Copies Taken : {this.props.data.copiesTaken[this.getLotNumberString()]}</h5>
                        <h5>Defective : {this.props.data.defective[this.getLotNumberString()]}</h5>
                    </div>

                    <div>
                        <h2 style={{textAlign: 'center'}}>Exchanges</h2>
                        <br></br>
                        <h5>Total Exchanged: {this.calculateTotalExchanged()}</h5>
                    </div>
                </div>
                
                <br></br>
                
                <div className="last-updated-container">
                    <p>Last Updated on : { new Date().toString() }</p>
                </div>
            </div>
        )
    }
}

export default Overview
