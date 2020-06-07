import React, { useContext } from 'react';
import ErrorContext from '../../context/error/errorContext';

//exports a function that renders any validation errors sent from the API
const ErrorsDisplay = () => {
	const errorContext = useContext(ErrorContext);
	const { errors } = errorContext;

	return (
		errors.length > 0 &&
		errors.map(error => (
			<div>
				<div key={error.id} className='validation-errors'>
					<i className='fas fa-info-circle' />
					{error.msg}
				</div>
			</div>
		))
	);
};

export default ErrorsDisplay;
