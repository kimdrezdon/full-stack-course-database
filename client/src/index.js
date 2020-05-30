// Entry point into the application which renders the main App component

// Import React
import React from 'react';
import ReactDOM from 'react-dom';

// App component
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
