import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

//exports a function that renders any validation errors sent from the API
const Alerts = () => {
	const alertContext = useContext(AlertContext);
	const { alerts } = alertContext;

	return (
		alerts.length > 0 && (
			<div className='bounds'>
				<h2 className='validation--errors--label'>Validation errors</h2>
				<div className='validation-errors'>
					<ul>
						{alerts.map(alert => (
							<li key={alert.id}>
								<i className='fas fa-info-circle' />
								{alert.msg}
							</li>
						))}
					</ul>
				</div>
			</div>
		)
	);
};

export default Alerts;
