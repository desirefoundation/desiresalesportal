import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import firebaseapp from '../firebase'

export class Login extends Component {

    state = {
        loggedIn: false,
        spinnerLoading: false
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({spinnerLoading: true});

        let email = document.getElementById('emailInput').value.toString();
        let password = document.getElementById('passwordInput').value.toString();

        if (email === '' || password === ''){
            alert('Please enter email and password');
        }
        else {
            let auth = firebaseapp.auth()
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    // Login Successful
                    // change login status = true
                    localStorage.setItem("loginStatus", true)
                    localStorage.setItem("email_id", email);
                    localStorage.setItem("password", password);
                    
                    this.setState({spinnerLoading: false});

                    this.setState({
                        loggedIn: true
                    })
                    
                    
                })
                .catch((error) => {
                    // tell the user about the error
                    this.setState({spinnerLoading: false});
                    alert(error.message)
                });
        }
    }

    render() {
        if(this.state.loggedIn){
            return <Redirect to="/home" />
        }

        return (
            <div style={{padding: '1rem'}}>
                <br></br>
                <br></br>
                <h1 className='title is-1' style={titleStyle}>SALES PORTAL</h1>
                <h3 className='subtitle is-4' style={subtitleStyle}>Desire Foundation</h3>
                
                <br></br>
                
                <form className='column is-half is-offset-one-quarter' onSubmit={ this.submitForm }>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className='control'>
                            <input id='emailInput' placeholder='john@example.com' className='input' type='email' required />
                        </div>
                    </div>

                    <div className='field'>
                        <label className='label'>Password</label>
                        <div className='control'>
                            <input id='passwordInput' className='input' type='password' required/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input type='submit' value='Login' className='button is-link' />
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                </form>
                <div style={{textAlign: 'center'}}>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={50}
                        width={50}
                        visible={this.state.spinnerLoading}
                    />
                    <br></br>
                    <p className="tag is-warning is-medium">A project by Junaid H Rahim</p>
                </div>
            </div>
        )
    }
}

const titleStyle = {
    textAlign: 'center',
    fontFamily: 'Rubik, sans-serif'
}

const subtitleStyle = {
    textAlign: 'center',
    fontFamily: 'Rubik, sans-serif'
}

export default Login
