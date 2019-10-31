import React, { Component } from 'react';

//sets up a context and returns an object with Provider and Consumer properties that are also objects.
const Context = React.createContext();

//A higher-order component (HOC) that shares functionality across the components of the app. Returns a Provider component which provides the application state and any actions or event handlers that need to be shared between components, via a required value prop.
export class Provider extends Component {
    state = { 
        authenticatedUser: null
    }
    
    //callApi method used to make requests to the REST API
    callApi = (path, method = 'GET', body = null, requiresAuthentication = false, credentials = null) => {
        
        const url = 'http://localhost:5000/api' + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuthentication) { 
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    //getUser method
    getUser = async (emailAddress, password) => {
        const response = await this.callApi(`/users`, 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json()
                .then(responseData => responseData);
        } else if (response.status === 401) {            
            return null;
        } else {
            throw new Error();
        }
    }

    //signIn method
    signIn = async (emailAddress, password) => {
        const user = await this.getUser(emailAddress, password);
        if (user !== null) {
            this.setState({ 
                authenticatedUser: user 
            })
        }
        return user;
    }

    //signOut method
    signOut = () => {
        this.setState({
            authenticatedUser: null
        })
    }

    //signUp method
    signUp = async (userData) => {
        const response = await this.callApi('/users', 'POST', userData);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json()
                    .then(responseData => {
                        return responseData.errors;
                    })
        } else if (response.status === 200) {
            return ['Account already exists with that email address'];
        } else {
            throw new Error();
        }
    }
    
    render() {
        const value = {
            authenticatedUser: this.state.authenticatedUser,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
                signUp: this.signUp
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

/**
 * A higher-order function that wraps the provided component in a Context.Consumer component. withContext automatically subscribes (or connects) the component passed to it to all actions and context changes. to render anything inside the Consumer, use a Render Prop: a technique for sharing code between React components using a prop whose value is a function. (Borrowed from the React Authentication course on Team Treehouse)
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }