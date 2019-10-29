import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignUp extends Component {
    state = { 
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: ''
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
            const url = 'http://localhost:5000/api/users';
            const data = { 
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                password: this.state.password
            }
            console.log(data);
            const options = { 
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            }
            fetch(url, options);
            this.props.history.push(`/courses`);
        } else {
            console.log('passwords do not match')
        }
    }

    render() { 
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;

        return ( 
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
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
 
export default UserSignUp;