// Entry point into the application which renders the main App component

import React from 'react';
import ReactDOM from 'react-dom';

// CSS files
import './styles/global.css';
import './styles/index.css';

//Provider component
import { Provider } from './Context';

// App component
import App from './App';

ReactDOM.render(
	<Provider>
		<App />
	</Provider>,
	document.getElementById('root')
);
