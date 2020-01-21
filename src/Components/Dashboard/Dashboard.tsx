import React, { Component } from 'react'
import { HashRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css'

// All the components
import Overview from './Overview/Overview'
import Sales from './Sales/Sales'
import Stock from './Stock/Stock'
import Exchange from './Exchange/Exchange'
import About from './About/About'

import firebaseapp from '../../firebase'

export class Dashboard extends Component {

    auth = firebaseapp.auth()
    database = firebaseapp.database()

    logout = (e: React.SyntheticEvent) : void => {
        e.preventDefault()

        localStorage.removeItem("loginStatus")
        localStorage.removeItem("email_id");
        localStorage.removeItem("password");

        document.location.href = "https://desiresalesportal.team"
    }
    
    render() {
        const loginStatus: string | null = localStorage.getItem("loginStatus");
        
        if ((loginStatus === null) || (loginStatus === "false")){
            return <Redirect to="/login"></Redirect>
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
                        <Route exact={true} path="/dashboard" component={() => <Overview></Overview>}></Route>
                        <Route exact={true} path="/dashboard/sales" component={() => <Sales data="Junaid"></Sales>}></Route>
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
