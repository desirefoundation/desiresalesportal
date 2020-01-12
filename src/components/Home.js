import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

import MyCustomers from './MyCustomers'

import firebaseapp from '../firebase'

export class Home extends Component {
    auth = firebaseapp.auth();
    database = firebaseapp.database();
    
    // Current Lot
    currentLot = 6; // use this in place of textx "Lot x", Netflix Copies
    price = 40;

    state = {
        "loggedIn": false,
        "password": "",
        "buddygroup": "",
        "copiesTaken": {
            "lot3": 0,
            "lot4": 0,
            "lot5": 0,
            "lot6": 0,
            "lot7": 0,
            "lot8": 0,
            "lot9": 0,
            "lot10": 0,
            "lot11": 0,
            "lot12": 0,
            "lot13": 0,
            "lot14": 0,
            "lot15": 0,
            "lot16": 0,
            "lot17": 0,
            "lot18": 0,
            "lot19": 0,
            "lot20": 0,
            "lot21": 0,
            "lot22": 0,
            "lot23": 0,
            "lot24": 0,
            "lot25": 0,
            "lot26": 0,
            "lot27": 0,
            "lot28": 0,
            "lot29": 0,
            "lot30": 0
        },
        "copyTransactions": [],
        "defective": {
            "lot3": 0,
            "lot4": 0,
            "lot5": 0,
            "lot6": 0,
            "lot7": 0,
            "lot8": 0,
            "lot9": 0,
            "lot10": 0,
            "lot11": 0,
            "lot12": 0,
            "lot13": 0,
            "lot14": 0,
            "lot15": 0,
            "lot16": 0,
            "lot17": 0,
            "lot18": 0,
            "lot19": 0,
            "lot20": 0,
            "lot21": 0,
            "lot22": 0,
            "lot23": 0,
            "lot24": 0,
            "lot25": 0,
            "lot26": 0,
            "lot27": 0,
            "lot28": 0,
            "lot29": 0,
            "lot30": 0
        },
        "email": "",
        "name": "",
        "rollno": 0,
        "soldTillDateCash": {
            "lot3": 0,
            "lot4": 0,
            "lot5": 0,
            "lot6": 0,
            "lot7": 0,
            "lot8": 0,
            "lot9": 0,
            "lot10": 0,
            "lot11": 0,
            "lot12": 0,
            "lot13": 0,
            "lot14": 0,
            "lot15": 0,
            "lot16": 0,
            "lot17": 0,
            "lot18": 0,
            "lot19": 0,
            "lot20": 0,
            "lot21": 0,
            "lot22": 0,
            "lot23": 0,
            "lot24": 0,
            "lot25": 0,
            "lot26": 0,
            "lot27": 0,
            "lot28": 0,
            "lot29": 0,
            "lot30": 0
        },
        "soldTillDatePaytm": {
            "lot3": 0,
            "lot4": 0,
            "lot5": 0,
            "lot6": 0,
            "lot7": 0,
            "lot8": 0,
            "lot9": 0,
            "lot10": 0,
            "lot11": 0,
            "lot12": 0,
            "lot13": 0,
            "lot14": 0,
            "lot15": 0,
            "lot16": 0,
            "lot17": 0,
            "lot18": 0,
            "lot19": 0,
            "lot20": 0,
            "lot21": 0,
            "lot22": 0,
            "lot23": 0,
            "lot24": 0,
            "lot25": 0,
            "lot26": 0,
            "lot27": 0,
            "lot28": 0,
            "lot29": 0,
            "lot30": 0
        },
        "amountPaidToCoordinator": {
            "lot3": 0,
            "lot4": 0,
            "lot5": 0,
            "lot6": 0,
            "lot7": 0,
            "lot8": 0,
            "lot9": 0,
            "lot10": 0,
            "lot11": 0,
            "lot12": 0,
            "lot13": 0,
            "lot14": 0,
            "lot15": 0,
            "lot16": 0,
            "lot17": 0,
            "lot18": 0,
            "lot19": 0,
            "lot20": 0,
            "lot21": 0,
            "lot22": 0,
            "lot23": 0,
            "lot24": 0,
            "lot25": 0,
            "lot26": 0,
            "lot27": 0,
            "lot28": 0,
            "lot29": 0,
            "lot30": 0
        },
        "lastUpdated": "",
        "users": {},
        "spinnerLoading": true,
        "modalSpinnerLoading": false,
        "customerdata": []
    }

    constructor(){
        super()
        let loginStatus = localStorage.getItem("loginStatus");
        
        if(loginStatus == null){ // if not logged in then redirect to login
            //console.log("login status null")
            document.location.href = "https://desiresalesportal.team"
        }

        if(loginStatus){
            // Logs in again and gets all the data of that user
            let email_id = localStorage.getItem("email_id");
            let pw = localStorage.getItem("password");

            this.auth.signInWithEmailAndPassword(email_id, pw)
                .then(() => {
                    let uid = this.auth.currentUser.uid;
                    
                    // get the data and set the state and then eventually set HTML of (Stock and Exchanged)
                    this.database.ref(`/salesdata/${uid}`).on('value', (snapshot) => {
                        let sales_data = snapshot.val();
                        this.setState(sales_data);
                        this.setState({spinnerLoading: false})
                        
                        // set HTML of Stock
                        let stockExchangedCopiesSpan = document.getElementById("stockExchangedCopies");
                        let total = this.getTotalExchanged()
                        stockExchangedCopiesSpan.innerHTML = `<b>${total.toString()}</b>`
                        
                        let grossTotalspan = document.getElementById("stockGrossTotal")
                        grossTotalspan.innerHTML = `<b>${this.getGrossTotal().toString()}</b>`
                        
                        let stockTotalCopiesInHandSpan = document.getElementById("stockTotalCopiesInHand");
                        stockTotalCopiesInHandSpan.innerHTML = (this.getGrossTotal() - this.state.soldTillDatePaytm.lot6 - this.state.soldTillDateCash.lot6).toString();


                        // Set HTML of Exchanged
                        let exchangeExchangedCopiesSpan = document.getElementById("exchangeExchangedCopies")
                        exchangeExchangedCopiesSpan.innerHTML = `<b>${total.toString()}</b>`

                    });
                    
                    // Get the customer data 
                    this.database.ref(`/customerdata/${uid}`).on('value', (snapshot) => {
                        let customerdata = snapshot.val()
                        this.setState({
                            "customerdata": customerdata
                        })
                    });

                    // get a list of all the users for Exchange search
                    this.database.ref(`/users/`).on('value', (snapshot) => {
                        let users = snapshot.val()
                        this.setState({
                            "users": users
                        })
                    });
                })
                .catch((error) => {
                    this.setState({spinnerLoading: false});
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
    cancelIndividualSaleModal = () => {
        let m = document.getElementById("individualSaleModal")
        m.setAttribute("class", "modal")
        document.location.reload()
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
    activateIndividualSaleModal = () => {
        let m = document.getElementById("individualSaleModal");
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

        for(let i=1; i<transactions_arr.length; i++){
            if(transactions_arr[i].lot !== this.currentLot)
                continue;
            
            total += transactions_arr[i].amount;
        }

        return total;
    }

    getGrossTotal = () => {
        let total = parseInt(this.state.copiesTaken.lot6) - parseInt(this.state.defective.lot6) + this.getTotalExchanged()
        return total;
    }

    // To update the last updated property
    updateLastUpdated = () => {
        let uid = this.auth.currentUser.uid;

        this.database.ref(`/salesdata/${uid}`).update({
            "lastUpdated": new Date().toString()
        }).catch(err => alert(err));
    }


    // Modal Submission Functions

    // Code to update the amount paid to the coordiantor
    updateAmountPaidToCoordinator = (e) => {
        e.preventDefault();
        let amount = parseInt(document.getElementById("amountPaidToCoordinatorInput").value);
        
        let uid = this.auth.currentUser.uid;

        this.database.ref(`/salesdata/${uid}/amountPaidToCoordinator`).update({
            "lot6": amount.toString()
        }).then(() => {
            alert("Updated");
        }).catch(err => alert(err));

        this.updateLastUpdated()
    }

    // Code to submit the Individual sale modal
    submitIndividualSaleModal = (e) => {
        e.preventDefault();
        this.setState({modalSpinnerLoading: true});

        this.updateLastUpdated()
        
        // Get all the data
        let copiesSold = parseInt(document.getElementById("individualSaleSoldInput").value);
        let paytmRadioButton = document.getElementById("paytmRadioButton");

        let customer_name = document.getElementById("individualSaleNameInput").value;
        let customer_email = document.getElementById("individualSaleEmailInput").value;

        // Set the mode of payment
        let mode = "cash"
        if(paytmRadioButton.checked)
            mode = "paytm"

        let uid = this.auth.currentUser.uid; // get uid

        if(mode === "cash"){
            // update the database
            this.database.ref(`/salesdata/${uid}/soldTillDateCash`).update({
                "lot6": this.state.soldTillDateCash.lot6 + copiesSold
            })
            .then(() => {
                // update the customer database
                let payload = {
                    "name": customer_name,
                    "email": customer_email,
                    "copies_sold": copiesSold
                }
                
                let final = this.state.customerdata
                final.push(payload)
                
                this.database.ref(`/customerdata/${uid}`).set(final)
                    .then(() => {
                        this.setState({modalSpinnerLoading: false});
                        alert("Update Successful");
                    });
            })
            .catch(err => alert(err));
        }
        else {
            this.database.ref(`/salesdata/${uid}/soldTillDatePaytm`).update({
                "lot6": this.state.soldTillDatePaytm.lot6 + copiesSold
            })
            .then(() => {
                let payload = {
                    "name": customer_name,
                    "email": customer_email,
                    "copies_sold": copiesSold
                }
                
                let final = this.state.customerdata
                final.push(payload)

                this.database.ref(`/customerdata/${uid}`).set(final)
                    .then(() => {
                        this.setState({modalSpinnerLoading: false});
                        alert("Update Successful");
                    });
            })
            .catch(err => alert(err));
        }
    }

    
    // Submit the modal to update the stock info
    submitStockModalForm = (e) => {
        e.preventDefault();
        this.setState({modalSpinnerLoading : true});

        // get the data
        let copiesLot3 = parseInt(document.getElementById("modalCopiesLot3Input").value);
        let defective = parseInt(document.getElementById("modalDefectiveInput").value);
        
        let uid = this.auth.currentUser.uid;
        
        this.updateLastUpdated()
        
        // update the database
        this.database.ref(`/salesdata/${uid}/copiesTaken`).update({
            "lot6": this.state.copiesTaken.lot6 + copiesLot3
        }).then(() => {
            this.database.ref(`/salesdata/${uid}/defective`).update({
                "lot6": this.state.defective.lot6 + defective
            }).then(() => {
                this.setState({modalSpinnerLoading : false});
                alert("Update Successful");
                this.cancelStockModal();
                document.location.reload()
            })
        }).catch(err => alert(err));

    }

    // Filter names for search in Exchange Modal
    filterNames = (e) => {
        e.preventDefault();

        // the input
        let nameInput = document.getElementById("exchangeModalNameInput").value.toString();
        
        // the div where the filtered names get added
        let dropdown = document.getElementById("exchangeModalNameDropdown");

        let uid_list = Object.keys(this.state.users);

        dropdown.innerHTML = "" // reset to blank

        uid_list.forEach(i => {
            if(this.state.users[i].name.toUpperCase().search(nameInput.toUpperCase()) !== -1){
                if(this.state.users[i].name === this.state.name)
                    return;

                let dropdown_html = `<button onclick="document.getElementById('exchangeModalNameInput').value ='${this.state.users[i].name.toString()}'; return false;" class='button' style='margin: 0.2rem'>
                    ${this.state.users[i].name}
                </button>`
                
                dropdown.innerHTML += dropdown_html;
            }
        })
    }

    // Submit the modal to log the exchange data
    submitExchangeModal = (e) => {
        e.preventDefault();
        this.setState({modalSpinnerLoading : true});

        // get the data
        let name = document.getElementById("exchangeModalNameInput").value.toString();
        let number = parseInt(document.getElementById("modalExhangeNumberInput").value);

        let givenRadioButton = document.getElementById("givenRadioButton")

        if(givenRadioButton.checked){
            number = -number
        }
          
        // payload of self
        let payload = {
            "givenTo": name,
            "amount": number,
            "lot": this.currentLot
        }
        
        // payload of the other person copies were exchanged with
        let payload_other = {
            "givenTo": this.state.users[this.auth.currentUser.uid].name,
            "amount": -number,
            "lot": this.currentLot
        }

    
        // obtain other person's uid using name
        let other_uid = "";
        let keys = Object.keys(this.state.users);

        keys.forEach(k => {
            if(this.state.users[k].name === name){
                other_uid = k;
            }
        })  
    
        // Own copy transactions then other copy transactions
        let copyTransactions = this.state.copyTransactions
        copyTransactions.push(payload)
        
        let uid = this.auth.currentUser.uid;
        
        this.database.ref(`/salesdata/${uid}`).update({
            "copyTransactions": copyTransactions
        }).then(() => {
            this.database.ref(`/salesdata/${other_uid}/copyTransactions`).once('value')
                .then((snapshot) => {
                    // Fetch other person's transactions, edit them and push them 

                    let other_copyTransactions = snapshot.val()
                    other_copyTransactions.push(payload_other);
                    
                    this.database.ref(`/salesdata/${other_uid}`).update({
                        "copyTransactions": other_copyTransactions
                    }).then(() => {
                        this.setState({modalSpinnerLoading : false});
                        alert("Update Successful");
                        this.cancelExchangeModal();
                        this.updateLastUpdated()
                        document.location.reload()
                    })
    
                });
        });
    }

    // Delete a particular customer
    deleteCustomer = (i) => {
        const removeItem = (arr, i) => arr.slice(0, i).concat(arr.slice(i+1, arr.length))

        if(window.confirm(`Are you sure you want to delete ${this.state.customerdata[i].name} from your customers ?`)) {
            let uid = this.auth.currentUser.uid;
            this.database.ref(`/customerdata/${uid}`).set(removeItem(this.state.customerdata, i));
        }
    }

    // Logout function
    logout = (e) => {
        // Code to log the user out
        e.preventDefault()

        localStorage.removeItem("loginStatus");
        localStorage.removeItem("email_id");
        localStorage.removeItem("password");

        document.location.href = "https://desiresalesportal.team"
    }
        

    render() {
        return (
            <div>
                {/*------- HEADER -----------*/}
                <div style={{backgroundColor: '#263238', color: '#ffffff'}}>
                    <h1 style={titleStyle}>Sales Portal</h1>
                    <h3 style={subtitleStyle}>Desire Foundation</h3>                
                    <hr style={{color: 'black'}}></hr>
                </div>

                {/* ----------- TOP CARDS => (Name Email) & (Total Sold) ------------*/}
                <div className='columns'  style={{ paddingLeft: '1rem', paddingRight: '1rem', margin: '0rem', marginBottom: '2rem'}}>
                    
                    {/* Loader */}
                    <div style={{paddingTop: '1rem'}}>
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={50}
                            width={50}
                            visible={this.state.spinnerLoading}
                        />
                    </div>


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
                            <p style= {{fontSize: '1.2rem', fontWeight: '300'}}>
                                <i className="fas fa-truck-loading" style={{color: '#0d47a1', marginRight: '0.2rem'}}></i> Current Lot : Netflix Copies
                            </p>
                            <br></br>
                            <button className="button is-link" onClick={ this.logout }>Log Out</button>
                        </div>
                    </div>

                    {/* Total Sold*/}
                    <div className='column is-narrow'>
                        <div className='box' style={boxStyle}>
                            <h1 className='title' style={{color: '#d50000'}}>
                                <i className="fas fa-money-check-alt"></i> Total Sold
                            </h1>

                            <h1 className='title' style={{fontWeight: '300'}}>
                                ₹ {((this.state.soldTillDateCash.lot6 + this.state.soldTillDatePaytm.lot6) * this.price).toString()} /-
                            </h1>
                            
                        </div>
                    </div>

                    {/* Amount Paid to Coordinator*/}
                    <div className='column is-narrow'>
                        <div className='box' style={boxStyle}>
                            <h1 className='title' style={{fontWeight: '300'}}>
                                <i className="fas fa-funnel-dollar"></i> Amount Paid to Coordinator
                            </h1>

                            <h1 className='title' style={{fontWeight: '300'}}>
                                ₹ {this.state.amountPaidToCoordinator.lot6.toString()} /-
                            </h1>

                            <form onSubmit={this.updateAmountPaidToCoordinator}>
                                <input id="amountPaidToCoordinatorInput" required type="number" className='input' min='0' placeholder="Reset to this amount" style={{width:'60%', marginRight:'1rem'}}></input>
                                <input type="submit" value="Update" className="button"/>
                            </form>
                            
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

                            <p style={salesDataStyle}>Total Sales Amount : ₹ {(this.state.soldTillDateCash.lot6 + this.state.soldTillDatePaytm.lot6) * this.price}</p>

                            <br></br>
                            
                            <p style={salesDataStyle}>
                                <i className="fas fa-money-bill-alt" style={{ marginRight: '0.3rem' }}></i> Cash : ₹ {this.state.soldTillDateCash.lot6 * this.price} ({this.state.soldTillDateCash.lot6})
                            </p>
                            <p style={salesDataStyle}>
                                <i className="fas fa-credit-card" style={{ marginRight: '0.this.pricerem' }}></i> Paytm : ₹ {this.state.soldTillDatePaytm.lot6 * this.price} ({this.state.soldTillDatePaytm.lot6})
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

                            <p style={notebookStatusStyle}>Copies Taken : <b>{this.state.copiesTaken.lot6}</b>  </p>
                            <br></br>
                            <p style={notebookStatusStyle}>Exchanged : <span id="stockExchangedCopies"></span></p>
                            <p style={notebookStatusStyle}>Defective : <b>{this.state.defective.lot6}</b>  </p>
                            <br></br>
                            <p style={notebookStatusStyle}>Gross Total : <b><span id="stockGrossTotal"></span></b></p>
                            <p style={notebookStatusStyle}>Total Copies Sold :  <b>{(this.state.soldTillDatePaytm.lot6 + this.state.soldTillDateCash.lot6).toString()}</b>  </p>
                            <p style={notebookStatusStyle}>Total Copies in Hand : <b><span id="stockTotalCopiesInHand"></span></b>  </p>
                        </div>
                    </div>

                    {/*  EXCHANGES  */}
                    <div className='column'>
                        <div className='box'>
                            <h1 style={cardHeaderStyle}>
                                <i className="fas fa-book-open" style={{ marginRight: '1rem'}}></i> Exchanged
                            </h1>
                            <br></br>
                            <p style={notebookExchangedStyle}>Total Exchanged : <span id="exchangeExchangedCopies"></span></p>

                            <br></br>
                            <div>
                                <table className="table is-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>No.</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody id="exchangeTable">
                                        {this.state.copyTransactions.map((exchange, index) => {
                                            if(exchange.lot !== this.currentLot){
                                                return (<tr key={index}></tr>)
                                            }
                
                                            let exchangeStatus = "given"
                
                                            if(exchange.amount > 0) {
                                                exchangeStatus = "taken"
                                            }
                
                                            return (
                                                <tr key={index}>
                                                    <td>{exchange.givenTo}</td>
                                                    <td>{Math.abs(exchange.amount)}</td>
                                                    <td>{exchangeStatus}</td>
                                                </tr> 
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>

                {/* BUTTONS FOR MODALS */}
                <div style={{ paddingLeft: '2rem', paddingRight: '2rem', margin: '0rem' }} className="columns">
                    <button className="button is-medium is-link" onClick={ this.activateIndividualSaleModal } style={{marginRight:'1rem', marginBottom: '1rem'}}>
                        Add Individual Sale
                    </button>
                    
                    <button className="button is-medium is-info" onClick={ this.activateStockModal } style={{marginRight:'1rem', marginBottom: '1rem'}}>
                        Edit Stock Data
                    </button>
                    
                    <button className="button is-medium is-warning" onClick={ this.activateExchangeModal } style={{marginRight:'1rem', marginBottom: '1rem'}}>
                        Add Exchange
                    </button>
                </div>

                <br></br>

                <MyCustomers customerdata={this.state.customerdata} deleteCustomer={this.deleteCustomer}></MyCustomers>

                <br></br>
                
                {/* Individual Sale Modal */}
                <div id="individualSaleModal" className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Add Individual Sale</p>
                            <button className="delete" onClick={this.cancelIndividualSaleModal} aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <form onSubmit={this.submitIndividualSaleModal}>
                                <div className='field'>
                                    <label className='label'>Copies Sold *</label>
                                    <input className='input' id='individualSaleSoldInput' type='number' min='0' required placeholder='This will be added to the total'></input>
                                    
                                    <div style={this.radioButtonStyle}>
                                        <br></br>
                                        <label className='label'>Mode of Payment *</label>
                                        <input type="radio" name="cashPaytm" id="cashRadioButton" defaultChecked/> Cash <br></br>
                                        <input type="radio" name="cashPaytm" id="paytmRadioButton"/> Paytm
                                    </div>
                                    
                                    <br></br>

                                    <label style={{marginTop: '1rem'}}>If you just want to add a customer and their email, put no. of copies sold = 0</label>

                                    <label className='label' style={{marginTop: '1rem'}}>Customer's Name *</label>
                                    <input className='input' id='individualSaleNameInput' type='text' required placeholder='Enter Name'></input>

                                    <label className='label' style={{marginTop: '1rem'}}>Customer's Email (KIIT email preferred) *</label>
                                    <input className='input' id='individualSaleEmailInput' type='email' required placeholder='Enter Email'></input>
                                    
                                </div>
                                <div style={{paddingTop: '1rem'}}>
                                    <Loader
                                        type="Puff"
                                        color="#00BFFF"
                                        height={50}
                                        width={50}
                                        visible={this.state.modalSpinnerLoading}
                                    />
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
                                    <label className='label'>Copies Taken in Lot 2 (Netflix Copies)</label>
                                    <input id="modalCopiesLot3Input" className='input' type='number' required placeholder='This will be added to the Total'></input>
                                    
                                    <label className='label' style={{marginTop: '1rem'}}>
                                        <i className="fas fa-window-close" style={{ marginRight: '0.3rem' }}></i> Defective
                                    </label>
                                    <input id="modalDefectiveInput" className='input' type='number' required placeholder='This will be added to the Total'></input>

                                </div>
                                
                                <div style={{paddingTop: '1rem'}}>
                                    <Loader
                                        type="Puff"
                                        color="#00BFFF"
                                        height={50}
                                        width={50}
                                        visible={this.state.modalSpinnerLoading}
                                    />
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
                                    <label className='label'>Copies Exchanged With</label>
                                    <input type="text" className="input" id="exchangeModalNameInput" onKeyUp={this.filterNames}></input>
                                    
                                    <div id="exchangeModalNameDropdown" style={{padding: '0.5rem'}}>
                                        
                                    </div>
                                    
                                    <br></br>

                                    <div style={this.radioButtonStyle}>
                                        <br></br>
                                        <label className='label'>Type of Exchange</label>
                                        <input type="radio" name="givenTaken" id="givenRadioButton"/> Given <br></br>
                                        <input type="radio" name="givenTaken" id="takenRadioButton"/> Taken
                                    </div>
                                    
                                    <label className='label' style={{marginTop: '1rem'}}>Number of Copies</label>
                                    <input id="modalExhangeNumberInput" className='input' type='number' min='0' required placeholder='Enter a Positive Number'></input>

                                </div>

                                <div style={{paddingTop: '1rem'}}>
                                    <Loader
                                        type="Puff"
                                        color="#00BFFF"
                                        height={50}
                                        width={50}
                                        visible={this.state.modalSpinnerLoading}
                                    />
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
    marginRight: '0.5rem',
    paddingTop: '2rem',
    fontWeight: '500'
}

const subtitleStyle = {
    fontSize: '2rem',
    fontFamily: 'Rubik, sans-serif',
    marginLeft: '2rem',
    marginRight: '0.5rem',
    fontWeight: '300'
}

const boxStyle = {
    fontFamily: 'Heebo, sans-serif',
    backgroundColour: '#e0f2f1'
}

const cardHeaderStyle = {
    fontFamily: 'Rubik, sans-serif',
    fontSize: '2rem',
    fontWeight: 'this.price0'
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
