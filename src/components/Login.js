/*
This is the Login Component. The whole login page that opens up
Just a simple form that sends a request to firebase.
*/

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import firebaseapp from '../firebase'
import logo from '../logo.png'

export class Login extends Component {

    state = {
        loggedIn: false,
        spinnerLoading: false
    }

    // Submit the form
    submitForm = (e) => {
        e.preventDefault();
        this.setState({spinnerLoading: true}); // start the loader

        // get email and password
        let email = document.getElementById('emailInput').value.toString();
        let password = document.getElementById('passwordInput').value.toString();

        if (email === '' || password === ''){
            alert('Please enter email and password');
        }
        else {
            // Start the auth process
            let auth = firebaseapp.auth()

            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    // Login Successful
                    // change login status = true
                    // set the credentials in the local storage
                    localStorage.setItem("loginStatus", true)
                    localStorage.setItem("email_id", email);
                    localStorage.setItem("password", password);
                    
                    this.setState({spinnerLoading: false}); // stop the spinner

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
        // if the user already logged in the move straight to the home
        if(localStorage.getItem("loginStatus")){
            return <Redirect to="/home" />
        }

        return (
            <div style={{padding: '1rem'}}>
                <img alt="logo" src={ logo } style={ logoStyle }></img>
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

// CSS styles

const titleStyle = {
    textAlign: 'center',
    fontFamily: 'Rubik, sans-serif'
}

const subtitleStyle = {
    textAlign: 'center',
    fontFamily: 'Rubik, sans-serif'
}

const logoStyle = {
    width: '5rem'
}

export default Login
