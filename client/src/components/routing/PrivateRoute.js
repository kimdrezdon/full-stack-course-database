//HOC that configures protected routes

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, loading } = authContext;

	return (
		<Route
			{...rest}
			render={props =>
				!loading && !isAuthenticated ? (
					<Redirect
						to={{
							pathname: '/signin',
							state: { from: props.location }
						}}
					/>
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRoute;
