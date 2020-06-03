import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorsDisplay from '../layout/ErrorsDisplay';
import AuthContext from '../../context/auth/authContext';

const UserSignUp = props => {
	const authContext = useContext(AuthContext);
	const { signUp, isAuthenticated, error } = authContext;

	useEffect(() => {
		// If signUp successful, redirect to to either the protected route the user just navigated from or to the course list
		if (isAuthenticated) {
			const { from } = props.location.state || {
				from: { pathname: '/courses' }
			};
			props.history.push(from);
		}
		if (error) {
			console.log(error);
			props.history.push('/error');
		}
		//eslint-disable-next-line
	}, [isAuthenticated, error, props.history]);

	// Component level state for form fields
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		emailAddress: '',
		password: '',
		confirmPassword: ''
	});

	const {
		firstName,
		lastName,
		emailAddress,
		password,
		confirmPassword
	} = user;

	//redirects to the course list when cancel button is clicked
	const handleCancel = e => {
		e.preventDefault();
		props.history.push('/courses');
	};

	//updates state with the value of each input element
	const handleChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (
			firstName === '' ||
			lastName === '' ||
			emailAddress === '' ||
			password === ''
		) {
			console.log('Please enter all fields');
		} else {
			if (password !== confirmPassword) {
				console.log(`Passwords must match`);
			} else {
				//if the two passwords entered by the user match, set the user data to the user's input
				signUp({
					firstName,
					lastName,
					emailAddress,
					password
				});
			}
		}
	};

	return (
		<div className='bounds'>
			<div className='grid-33 centered signin'>
				<h1>Sign Up</h1>
				<div>
					{/* <ErrorsDisplay errors={errors} /> */}
					<form onSubmit={handleSubmit}>
						<div>
							<input
								id='firstName'
								name='firstName'
								type='text'
								placeholder='First Name'
								value={firstName}
								onChange={handleChange}
							/>
						</div>
						<div>
							<input
								id='lastName'
								name='lastName'
								type='text'
								placeholder='Last Name'
								value={lastName}
								onChange={handleChange}
							/>
						</div>
						<div>
							<input
								id='emailAddress'
								name='emailAddress'
								type='text'
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
								placeholder='Password'
								value={password}
								onChange={handleChange}
							/>
						</div>
						<div>
							<input
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={handleChange}
							/>
						</div>
						<div className='grid-100 pad-bottom'>
							<button className='button' type='submit'>
								Sign Up
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
					Already have a user account?{' '}
					<Link to='/signin'>Click here</Link> to sign in!
				</p>
			</div>
		</div>
	);
};

export default UserSignUp;
