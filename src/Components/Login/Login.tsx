import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import firebaseapp from '../../firebase'
import logo from '../../assets/logo.png'
import './bulma.min.css'
import './login.css'


export class Login extends Component {

    state = {
        loggedIn: false,
        spinnerLoading: false,
        email: "",
        password: ""
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        this.setState({
            password: e.target.value
        })
    }


    submitLoginForm = (e: React.SyntheticEvent) : void => {
        e.preventDefault()
        const auth = firebaseapp.auth()

        this.setState({spinnerLoading: true})

        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { // Login Successful
                // change login status and set the credentials in the local storage
                localStorage.setItem("loginStatus", "true")
                localStorage.setItem("email_id", this.state.email);
                localStorage.setItem("password", this.state.password);
                
                this.setState({
                    spinnerLoading: false,
                    loggedIn: true
                });
            })
            .catch((error) => {
                this.setState({spinnerLoading: false});
                alert(error.message)
            });
    }

    render() {
        if(localStorage.getItem("loginStatus") === "true"){
            return <Redirect to="/dashboard" />
        }

        return (
            <div style={{padding: '1rem'}}>
                <img alt="logo" src={ logo } style={{ width: '5rem' }}></img>
                <br></br>
                <br></br>
                <h1 className='title is-1'>SALES PORTAL</h1>
                <h3 className='subtitle is-4'>Desire Foundation</h3>
                
                <br></br>
                
                <form className='column is-half is-offset-one-quarter' onSubmit={ this.submitLoginForm }>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className='control'>
                            <input onChange={this.handleEmailChange} placeholder='john@example.com' className='input' type='email' required />
                        </div>
                    </div>

                    <div className='field'>
                        <label className='label'>Password</label>
                        <div className='control'>
                            <input onChange={this.handlePasswordChange} className='input' type='password' required/>
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


export default Login