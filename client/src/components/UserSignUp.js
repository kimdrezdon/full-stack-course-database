import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';

export default class UserSignUp extends Component {
    state = { 
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
    }

    handleCancel = e => {
        e.preventDefault();
        this.props.history.push('/courses');
    }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name] : value
        })
    }

    handleSubmit = e => {
        e.preventDefault(); 
        if (this.state.password === this.state.confirmPassword) {
            const userData = { 
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                password: this.state.password
            }
            this.props.context.actions.signUp(userData)
                .then( errors => {
                    if (errors.length) {
                        this.setState({ errors });
                    } else {
                        console.log('Sign up successful!')
                    }
                })
                .catch( err => {
                    console.log(err);
                    this.props.history.push('/error');
                })
        } else {
            this.setState({
                errors: ['Passwords do not match']
            })
        }
    }



    render() { 
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors
        } = this.state;

        return ( 
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <ErrorsDisplay errors={errors} />
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input 
                                    id="firstName" 
                                    name="firstName" 
                                    type="text" 
                                    className="" 
                                    placeholder="First Name" 
                                    value={firstName}
                                    onChange={this.handleChange} />
                            </div>
                            <div>
                                <input 
                                    id="lastName" 
                                    name="lastName" 
                                    type="text" 
                                    className="" 
                                    placeholder="Last Name" 
                                    value={lastName}
                                    onChange={this.handleChange} />
                            </div>
                            <div>
                                <input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="text" 
                                    className="" 
                                    placeholder="Email Address" 
                                    value={emailAddress}
                                    onChange={this.handleChange} />
                            </div>
                            <div>
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    className="" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={this.handleChange} />
                            </div>
                            <div>
                                <input 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    type="password" 
                                    className="" 
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
         );
    }
}