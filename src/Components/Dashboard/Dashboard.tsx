import React, { Component } from 'react'
import { HashRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css'

// All the components
import Overview from './Overview/Overview'
import Sales from './Sales/Sales'
import Stock from './Stock/Stock'
import Exchange from './Exchange/Exchange'
import About from './About/About'

import firebaseapp from '../../firebase'

// Constants
const currentLotNumber: number = 4;
const currentLotDescription: string = "Netflix Copies";
const price : number = 40;

export class Dashboard extends Component {

    auth = firebaseapp.auth()
    database = firebaseapp.database()

    state = {
        salesDataFetched: false,
        customerDataFetched: false,
        usersListFetched: false,
        salesData: {},
        customerData: {},
        usersList: {}
    }

    logout = (e: React.SyntheticEvent) : void => {
        e.preventDefault()

        localStorage.removeItem("loginStatus")
        localStorage.removeItem("email_id");
        localStorage.removeItem("password");

        document.location.href = "https://desiresalesportal.team"
    }

    componentDidMount = () : void => {
        const email_id : any = localStorage.getItem("email_id");
        const password : any = localStorage.getItem("password");
        
        this.auth.signInWithEmailAndPassword(email_id, password)
            .then(() => {
                const uid : string | undefined = this.auth.currentUser?.uid;
                
                // Get Sales Data
                this.database.ref(`/salesdata/${uid}`).on('value', (snapshot) => {
                    this.setState({
                        salesDataFetched: true,
                        salesData: snapshot.val()
                    })
                });

                // Get Customer Data
                this.database.ref(`/customerdata/${uid}`).on('value', (snapshot) => {
                    this.setState({
                        customerDataFetched: true,
                        customerData: snapshot.val()
                    })
                });

                // Get List of all users
                this.database.ref(`/users/`).on('value', (snapshot) => {
                    this.setState({
                        usersListFetched: true,
                        usersList: snapshot.val()
                    })
                })

            });
    }
    
    render() {
        const loginStatus: string | null = localStorage.getItem("loginStatus");
        
        if ((loginStatus === null) || (loginStatus === "false")){
            return <Redirect to="/login"></Redirect>
        }
        
        if (!(this.state.salesDataFetched && this.state.customerDataFetched && this.state.usersListFetched)) {
            return (
                <div style={{textAlign: 'center'}}>
                    <br></br>
                    <br></br>

                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={50}
                        width={50}
                        visible={true}
                    />
                    <br></br>
                    <h3 className="loading-text">Loading your Sales Dashboard</h3>
                </div>
            )
        }

        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="https://desiresalesportal.team" style={{fontFamily: 'Rubik, sans-serif', fontSize: '1.6rem'}}>Sales Portal</a>
                        
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    
                        <div className="collapse navbar-collapse" id="navbarNav" style={{fontFamily: 'Rubik, sans-serif'}}>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link id="overview-nav" className="nav-link" to="/dashboard">Overview</Link>
                                </li>
                                <li className="nav-item">
                                    <Link id="sales-nav" className="nav-link" to="/dashboard/sales">Sales</Link>
                                </li>
                                <li className="nav-item">
                                    <Link id="stock-nav" className="nav-link" to="/dashboard/stock">Stock</Link>
                                </li>
                                <li className="nav-item">
                                    <Link id="exchange-nav" className="nav-link" to="/dashboard/exchange">Exchange</Link>
                                </li>
                                <li className="nav-item">
                                    <Link id="about-nav" className="nav-link" to="/dashboard/about">About</Link>
                                </li>
                            </ul>
                        </div>

                        <br></br>
                        
                        <button onClick={this.logout} className="btn btn-outline-light" style={{marginTop: '1rem', marginBottom: '1rem'}}>Logout</button>
                    </nav>

                    <Switch>
                        <Route 
                            exact={true} 
                            path="/dashboard" 
                            component={
                                () => {
                                    return <Overview 
                                                lotNumber={currentLotNumber} 
                                                lotDescription={currentLotDescription} 
                                                price={price}
                                                data={this.state.salesData}
                                            ></Overview>
                                }
                            }
                        >

                        </Route>
                        
                        <Route exact={true} path="/dashboard/sales" component={() => <Sales></Sales>}></Route>
                        
                        <Route exact={true} path="/dashboard/stock" component={() => <Stock></Stock>}></Route>
                        
                        <Route exact={true} path="/dashboard/exchange" component={() => <Exchange></Exchange>}></Route>
                        
                        <Route exact={true} path="/dashboard/about" component={() => <About></About>}></Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Dashboard
