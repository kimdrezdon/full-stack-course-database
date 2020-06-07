import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const UserSignIn = ({ location, history }) => {
	const authContext = useContext(AuthContext);
	const { signIn, isAuthenticated, error } = authContext;

	useEffect(() => {
		// If signIn successful, redirect to to either the protected route the user just navigated from or to the course list
		if (isAuthenticated) {
			const { from } = location.state || {
				from: { pathname: '/courses' }
			};
			history.push(from);
		}

		if (error) {
			console.log(error);
			history.push('/error');
		}
		//eslint-disable-next-line
	}, [error, isAuthenticated, history]);

	// Component level state for form fields
	const [user, setUser] = useState({
		emailAddress: '',
		password: ''
	});

	const { emailAddress, password } = user;

	// Redirects to the course list when cancel button is clicked
	const handleCancel = e => {
		e.preventDefault();
		history.push('/courses');
	};

	// Updates component level state with the value of each input element
	const handleChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (emailAddress === '' || password === '') {
			console.log('Please enter all fields');
		} else {
			signIn(user);
		}
	};

	return (
		<div className='bounds'>
			<div className='grid-33 centered signin'>
				<h1>Sign In</h1>
				<div>
					<form onSubmit={handleSubmit}>
						<div>
							<input
								id='emailAddress'
								name='emailAddress'
								type='text'
								className=''
								placeholder='Email Address'
								value={emailAddress}
								onChange={handleChange}
							/>
						</div>
						<div>
							<input
								id='password'
								name='password'
								type='password'
								className=''
								placeholder='Password'
								value={password}
								onChange={handleChange}
							/>
						</div>
						<div className='grid-100 pad-bottom'>
							<button className='button' type='submit'>
								Sign In
							</button>
							<button
								className='button button-secondary'
								onClick={handleCancel}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
				<p>&nbsp;</p>
				<p>
					Don't have a user account?{' '}
					<Link to='/signup'>Click here</Link> to sign up!
				</p>
			</div>
		</div>
	);
};

export default UserSignIn;
