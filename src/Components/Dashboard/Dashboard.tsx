import React, { Component } from 'react'
import { HashRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'

// All the components
import Overview from './Overview/Overview'
import Sales from './Sales/Sales'
import Stock from './Stock/Stock'
import Exchange from './Exchange/Exchange'
import About from './About/About'

export class Dashboard extends Component {

    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <Link to="/dashboard">Overview</Link>
                        <Link to="/dashboard/sales">Sales</Link>
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
