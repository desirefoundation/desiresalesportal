import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import firebaseapp from '../firebase'

export class Login extends Component {

    state = {
        loggedIn: false
    }

    submitForm = (e) => {
        e.preventDefault();

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
                    // store login status and redirect to home
                    this.setState({
                        loggedIn: true
                    })
                    console.log("Login state changed to true")

                    localStorage.setItem("loginStatus", true)
                    localStorage.setItem("email_id", email);
                    localStorage.setItem("password", password);
                })
                .catch((error) => {
                    // tell the user about the error
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
                <br></br>
                <br></br>
                <div style={{textAlign: 'center'}}>
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
