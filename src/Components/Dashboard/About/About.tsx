import React, { Component } from 'react'

import './about.css'
export class About extends Component {
    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <h1 className="about-header">About</h1>
                
                <div className="about-details">
                    <p>
                        <i className="fas fa-briefcase"></i>
                        <b> Version</b> : 2.0
                    </p>
                    <p>
                        <i className="fab fa-github"></i>
                        <b> GitHub</b> : <a href="https://github.com/desirefoundation/desiresalesportal" rel="noopener noreferrer" target="_blank">desiresalesportal</a>
                    </p>
                    <p className="text-muted">Open Sourced under the MIT License</p>
                    <br></br>
                    <p>
                        <i className="fas fa-question-circle"></i>
                        <b> Queries</b> : junaidrahim8d@gmail.com
                    </p>
                    <br></br>
                    <p className="text-muted">Made with &hearts; at Desire Foundation</p>
                </div>

                <br></br>

            </div>
        )
    }
}

export default About
