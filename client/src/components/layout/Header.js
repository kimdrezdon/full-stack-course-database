// Renders the Header component with a welcome message and sign out link if the user is logged in, or a sign up and sign in link if the user is not logged in

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Header = props => {
	const authContext = useContext(AuthContext);
	const { user } = authContext;

	return (
		<div className='header'>
			<div className='bounds'>
				<h1 className='header--logo'>Courses</h1>
				<nav>
					{user ? (
						<React.Fragment>
							<span>
								Welcome, {user.firstName} {user.lastName}!
							</span>
							<Link to='/signout' className='signout'>
								Sign Out
							</Link>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Link
								to={location => ({
									pathname: '/signup',
									state: { from: location.pathname }
								})}
								className='signup'
							>
								Sign Up
							</Link>
							<Link
								to={location => ({
									pathname: '/signin',
									state: { from: location.pathname }
								})}
								className='signin'
							>
								Sign In
							</Link>
						</React.Fragment>
					)}
				</nav>
			</div>
		</div>
	);
};

export default Header;
