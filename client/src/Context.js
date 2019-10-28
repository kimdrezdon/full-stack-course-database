import React, { Component } from 'react';

//sets up a context and returns an object with Provider and Consumer properties that are also objects.
const Context = React.createContext();

//A higher-order component (HOC) that shares functionality across the components of the app. Returns a Provider component which provides the application state and any actions or event handlers that need to be shared between components, via a required value prop.
export class Provider extends Component {
    state = { 
        authenticatedUser: null
    }
    
    callApi = (path, request = 'GET', body = null, requiresAuthentication = false, credentials = null) => {
        
        const url = 'http://localhost:5000/api' + path;

        const options = {
            request,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuthentication) { 
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options)
            .then(response => response.json())
            // .then(responseData => {
            //     this.setState({ courses: responseData });
            // })
            .catch(error => {
                console.log('Error fetching data', error);
            });
    }

    //signIn method
    signIn = async (username, password) => {
        const user = await this.callApi(`/users`, 'GET', null, true, {username, password});
        console.log(user.status);
    }

    //signOut method
    
    render() {

        const value = {
            authenticatedUser: this.state.authenticatedUser,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        }

        return ( 
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;