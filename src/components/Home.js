import React, { Component } from 'react'

import firebaseapp from '../firebase'

export class Home extends Component {
    auth = firebaseapp.auth();
    database = firebaseapp.database();

    state = {
        "loggedIn": false,
        "password": "",
        "buddygroup": "",
        "copiesTakenLot3": 0,
        "copyTransactions": [],
        "defective": 0,
        "email": "",
        "name": "",
        "rollno": 0,
        "soldTillDateCash": 0,
        "soldTillDatePaytm": 0
    }

    constructor(){
        super()
        let loginStatus = localStorage.getItem("loginStatus");
        
        if(loginStatus){
            // Logs in again and gets all the data of that user
            let email_id = localStorage.getItem("email_id");
            let pw = localStorage.getItem("password");

            this.auth.signInWithEmailAndPassword(email_id, pw)
                .then(() => {
                    let uid = this.auth.currentUser.uid;
                    
                    // get the data and set the html
                    this.database.ref(`/salesdata/${uid}`).on('value', (snapshot) => {
                        let sales_data = snapshot.val();
                        this.setState(sales_data);

                        let stockExchangedCopiesSpan = document.getElementById("stockExchangedCopies");
                        let total = this.getTotalExchanged()
                        stockExchangedCopiesSpan.innerHTML = `<b>${total.toString()}</b>`
                        
                        let grossTotalspan = document.getElementById("stockGrossTotal")
                        grossTotalspan.innerHTML = `<b>${this.getGrossTotal().toString()}</b>`
                        
                        let exchangeExchangedCopiesSpan = document.getElementById("exchangeExchangedCopies")
                        exchangeExchangedCopiesSpan.innerHTML = `<b>${total.toString()}</b>`

                        let stockTotalCopiesInHandSpan = document.getElementById("stockTotalCopiesInHand");
                        stockTotalCopiesInHandSpan.innerHTML = (this.getGrossTotal() - this.state.soldTillDatePaytm - this.state.soldTillDateCash).toString();

                    });
                })
                .catch((error) => {
                    alert(error.message);
                });

            this.setState({
                loggedIn: true,
                emailid : email_id,
                password: pw
            });
            
        }
        else {
            this.setState({
                loggedIn: false
            })
        }

    }

    // Functions to Cancel Modals
    cancelSalesModal = () => {
        let m = document.getElementById("salesDataModal");
        m.setAttribute("class","modal")
    }
    
    cancelStockModal = () => {
        let m = document.getElementById("stockDataModal");
        m.setAttribute("class", "modal");
    }
    
    cancelExchangeModal = () => {
        let m = document.getElementById("exchangeDataModal");
        m.setAttribute("class", "modal")
    }
    
    // Functions to Activate Modals
    activateSalesModal = () => {
        let m = document.getElementById("salesDataModal");
        m.setAttribute("class","modal is-active");
    }

    activateStockModal = () => {
        let m = document.getElementById("stockDataModal");
        m.setAttribute("class", "modal is-active");
    }


    activateExchangeModal = () => {
        let m = document.getElementById("exchangeDataModal");
        m.setAttribute("class", "modal is-active");
    }


    // Data Aggregator Functions
    getTotalExchanged = () => {
        let total = 0;
        let transactions_arr = this.state.copyTransactions;

        for(let i=0; i<transactions_arr.length; i++){
            total += transactions_arr[i].amount;
        }

        return total;
    }

    getGrossTotal = () => {
        let total = this.state.copiesTakenLot3 - this.state.defective + this.getTotalExchanged()
        return total;
    }


    // Modal Submission Functions
    submitSalesModalForm = (e) => {
        e.preventDefault();

        let total = parseInt(document.getElementById('modalSoldInput').value);
        let cash = parseInt(document.getElementById('modalCashInput').value);
        let paytm = parseInt(document.getElementById('modalPaytmInput').value);

        if(total === cash + paytm){
            let uid = this.auth.currentUser.uid;

            this.database.ref(`/salesdata/${uid}/`).update({
                "soldTillDateCash": this.state.soldTillDateCash + cash,
                "soldTillDatePaytm": this.state.soldTillDatePaytm + paytm
            }).then(() => {
                alert("Update Successful");
                this.cancelSalesModal();
                document.location.reload()
            })
        }
        else {
            alert("Cash + PayTm is not equal to the Total");
        }
    }
    
    submitStockModalForm = (e) => {
        e.preventDefault();

        let copiesLot3 = parseInt(document.getElementById("modalCopiesLot3Input").value);
        let defective = parseInt(document.getElementById("modalDefectiveInput").value);
        
        let uid = this.auth.currentUser.uid;
        
        this.database.ref(`/salesdata/${uid}`).update({
            "copiesTakenLot3": this.state.copiesTakenLot3 + copiesLot3,
            "defective": this.state.defective + defective
        }).then(() => {
            alert("Update Successful");
            this.cancelStockModal();
            document.location.reload()
        });
    }

    submitExchangeModal = (e) => {
        e.preventDefault();

        let name = document.getElementById("modalExchangeNameInput").value.toString();
        let number = parseInt(document.getElementById("modalExhangeNumberInput").value);

        let payload = {
            "givenTo": name,
            "amount": number
        }

        let copyTransactions = this.state.copyTransactions
        copyTransactions.push(payload)
        
        console.log(copyTransactions);

        let uid = this.auth.currentUser.uid;
        
        this.database.ref(`/salesdata/${uid}`).update({
            "copyTransactions": copyTransactions
        }).then(() => {
            alert("Update Successful");
            this.cancelExchangeModal();
            document.location.reload()
        })
    
    }

    render() {
        return (
            <div>
                {/*------- HEADER -----------*/}
                <h1 style={titleStyle}>Sales Portal</h1>
                <h3 style={subtitleStyle}>Desire Foundation</h3>
                <br></br>

                {/* ----------- TOP CARDS => (Name Email) & (Total Sold) ------------*/}
                <div className='columns'  style={{ paddingLeft: '1rem', paddingRight: '1rem', margin: '0rem', marginBottom: '2rem'}}>
                    {/* Name and Email*/}
                    <div className='column is-narrow'>
                        <div className='box' style={boxStyle}>
                            <p style= {{fontSize: '1.75rem', fontWeight: '300'}}>Hii, <b>{this.state.name}</b></p>
                            <p style= {{fontSize: '1.2rem', fontWeight: '300', marginTop: '0.5rem'}}>
                                <i className="fas fa-envelope-open-text" style={{color: '#0d47a1', marginRight: '0.2rem'}}></i> {this.state.email}
                            </p>
                            <p style= {{fontSize: '1.2rem', fontWeight: '300'}}>
                                <i className="fas fa-users" style={{color: '#0d47a1', marginRight: '0.2rem'}}></i> Buddy Group : {this.state.buddygroup}
                            </p>
                        </div>
                    </div>

                    {/* Total Sold*/}
                    <div className='column is-narrow'>
                        <div className='box' style={boxStyle}>
                            <h1 className='title' style={{color: '#d50000'}}>
                                <i className="fas fa-money-check-alt"></i> Total Sold
                            </h1>

                            <h1 className='title' style={{fontWeight: '300'}}>
                                ₹ {((this.state.soldTillDateCash + this.state.soldTillDatePaytm) * 35).toString()} /-
                            </h1>
                            
                        </div>
                    </div>
                </div>

                {/*  SALES DATA        STOCK          EXCHANGED  */}
                <div className='columns' style={{ paddingLeft: '1rem', paddingRight: '1rem', margin: '0rem' }}>
                    {/* SALES DATA*/}
                    <div className='column'>
                        <div className='box'>
                            <h1 style={cardHeaderStyle}>
                                <i className="fas fa-chart-area" style={{ marginRight: '1rem' }}></i> Sales Data 
                            </h1>

                            <br></br>

                            <p style={salesDataStyle}>Total Sales Amount : ₹ {(this.state.soldTillDateCash + this.state.soldTillDatePaytm) * 35}</p>

                            <br></br>
                            
                            <p style={salesDataStyle}>
                                <i className="fas fa-money-bill-alt" style={{ marginRight: '0.3rem' }}></i> Cash : ₹ {this.state.soldTillDateCash * 35} ({this.state.soldTillDateCash})
                            </p>
                            <p style={salesDataStyle}>
                                <i className="fas fa-credit-card" style={{ marginRight: '0.35rem' }}></i> Paytm : ₹ {this.state.soldTillDatePaytm * 35} ({this.state.soldTillDatePaytm})
                            </p>
                            
                            <br></br>
                        </div>
                    </div>

                    {/*   STOCK   */}
                    <div className='column'>
                        <div className='box'>
                            <h1 style={cardHeaderStyle}>
                                <i className="fas fa-box" style={{marginRight: '1rem'}}></i> Stock
                            </h1>

                            <br></br>

                            <p style={notebookStatusStyle}>Copies taken in Lot 3 : <b>{this.state.copiesTakenLot3}</b>  </p>
                            <br></br>
                            <p style={notebookStatusStyle}>Exchanged : <span id="stockExchangedCopies"></span></p>
                            <p style={notebookStatusStyle}>Defective : <b>{this.state.defective}</b>  </p>
                            <br></br>
                            <p style={notebookStatusStyle}>Gross Total : <b><span id="stockGrossTotal"></span></b></p>
                            <p style={notebookStatusStyle}>Total Copies Sold :  <b>{(this.state.soldTillDatePaytm + this.state.soldTillDateCash).toString()}</b>  </p>
                            <p style={notebookStatusStyle}>Total Copies in Hand : <b><span id="stockTotalCopiesInHand"></span></b>  </p>
                        </div>
                    </div>

                    {/*  EXCHANGES  */}
                    <div className='column'>
                        <div className='box'>
                            <h1 style={cardHeaderStyle}>
                                <i className="fas fa-book-open" style={{ marginRight: '1rem'}}></i> Exchanged
                            </h1>
                            <p style={{fontFamily: "'Heebo', sans-seirf", fontWeight: '300'}}>+ve if received, -ve if given away</p>
                            <br></br>
                            <p style={notebookExchangedStyle}>Total Exchanged : <span id="exchangeExchangedCopies"></span></p>
                        </div>
                    </div>
                </div>
                <br></br>

                {/* BUTTONS FOR MODALS */}
                <div style={{ paddingLeft: '2rem', paddingRight: '2rem', margin: '0rem' }} className="columns">
                    <button className="button is-large is-danger" onClick={ this.activateSalesModal } style={{marginRight:'1rem', marginBottom: '1rem'}}>
                        Add Sales Data
                    </button>
                    
                    <button className="button is-large is-info" onClick={ this.activateStockModal } style={{marginRight:'1rem', marginBottom: '1rem'}}>
                        Edit Stock Data
                    </button>
                    
                    <button className="button is-large is-warning" onClick={ this.activateExchangeModal } style={{marginRight:'1rem', marginBottom: '1rem'}}>
                        Add Exchange
                    </button>
                </div>

                <br></br>
                
                {/* Sales Data Modal */}
                <div id="salesDataModal" className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Add Sales Data</p>
                            <button className="delete" onClick={this.cancelSalesModal} aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <form onSubmit={this.submitSalesModalForm}>
                                <div className='field'>
                                    <label className='label'>Add Copies Sold</label>
                                    <input className='input' id='modalSoldInput' type='number' required placeholder='This will be added to the Total'></input>
                                    
                                    <label className='label' style={{marginTop: '1rem'}}>
                                        <i className="fas fa-money-bill-alt" style={{ marginRight: '0.3rem' }}></i> In Cash
                                    </label>
                                    <input className='input' id='modalCashInput' type='number' required placeholder='This will be added to the Total'></input>
                                    
                                    <label className='label' style={{marginTop: '1rem'}}>
                                        <i className="fas fa-credit-card" style={{ marginRight: '0.3rem' }}></i> In Paytm
                                    </label>
                                    <input className='input' id='modalPaytmInput' type='number' required placeholder='This will be added to the Total'></input>

                                </div>
                                <br></br>
                                <input type='submit' className="button is-info" value="Update"></input>
                            </form>
                        </section>
                        <footer className="modal-card-foot"></footer>
                    </div>
                </div>


                {/* STOCK DATA MODAL */}
                <div id="stockDataModal" className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Edit Stock Data</p>
                            <button className="delete" onClick={this.cancelStockModal} aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <form onSubmit={this.submitStockModalForm}>
                                <div className='field'>
                                    <label className='label'>Copies Taken in Lot 3</label>
                                    <input id="modalCopiesLot3Input" className='input' type='number' required placeholder='This will be added to the Total'></input>
                                    
                                    <label className='label' style={{marginTop: '1rem'}}>
                                        <i className="fas fa-window-close" style={{ marginRight: '0.3rem' }}></i> Defective
                                    </label>
                                    <input id="modalDefectiveInput" className='input' type='number' required placeholder='This will be added to the Total'></input>

                                </div>
                                <br></br>
                                <input type='submit' className="button is-info" value="Update"></input>
                            </form>
                        </section>
                        <footer className="modal-card-foot"></footer>
                    </div>
                </div>



                {/* Exchange Data Modal */}
                <div id="exchangeDataModal" className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Add Exchange Data</p>
                            <button className="delete" onClick={this.cancelExchangeModal} aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <form onSubmit={this.submitExchangeModal}>
                                <div className='field'>
                                    <label className='label'>Exchanged With</label>
                                    <input id="modalExchangeNameInput" className='input' type='text' required placeholder='Name of the person'></input>
                                    
                                    <label className='label' style={{marginTop: '1rem'}}>Number of Copies, + if taken, -ve if given</label>
                                    <input id="modalExhangeNumberInput" className='input' type='number' required placeholder='This will be added to the Total'></input>

                                </div>
                                <br></br>
                                <input type='submit' className="button is-info" value="Update"></input>
                            </form>
                        </section>
                        <footer className="modal-card-foot"></footer>
                    </div>
                </div>

            </div>
        )
    }
}

// Styles

const titleStyle = {
    fontSize: '3.5rem',
    fontFamily: 'Rubik, sans-serif',
    marginLeft: '2rem',
    paddingTop: '2rem',
    fontWeight: '500'
}

const subtitleStyle = {
    fontSize: '1.5rem',
    fontFamily: 'Heebo, sans-serif',
    marginLeft: '2rem',
    fontWeight: '300'
}

const boxStyle = {
    fontFamily: 'Heebo, sans-serif',
    backgroundColour: '#e0f2f1'
}

const cardHeaderStyle = {
    fontFamily: 'Rubik, sans-serif',
    fontSize: '2rem',
    fontWeight: '400'
}

const salesDataStyle = {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '1.5rem',
    fontWeight: '300'
}

const notebookStatusStyle = {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '1.3rem',
    fontWeight: '300'
}

const notebookExchangedStyle = {
    fontFamily: 'Heebo, sans-serif',
    fontSize: '1.6rem',
    fontWeight: '300'
}

export default Home
