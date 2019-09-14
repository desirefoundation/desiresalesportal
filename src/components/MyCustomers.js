import React, { Component } from 'react'

export class MyCustomers extends Component {

    fillTable = () => {
        if(this.props.customerdata[0] !== undefined){
            let t = document.getElementById("tableBody");
            
            let length = this.props.customerdata.length;

            for(let i=0; i<length; i++){
                let tableContent = `
                <tr>
                    <td>${i+1}</td>
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
                <h3 style={subtitleStyle}>My Customers</h3>
                <br></br>
                <div>
                    <table className="table is-bordered" style={{marginLeft: '2rem'}}>
                        <thead>
                            <tr>
                                <th>Index</th>
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

const subtitleStyle = {
    fontSize: '2.5rem',
    fontFamily: 'Heebo, sans-serif',
    marginLeft: '2rem',
    fontWeight: '300'
}


export default MyCustomers
