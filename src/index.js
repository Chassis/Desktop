import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import Root from './Root';

// Note: Main CSS is defined in public/loader.css to load with the splash screen.

import 'font-awesome/css/font-awesome.css';

// Some modules rely on global state, which needs to be configured.
import configure from './configure';
import createStore from './lib/createStore';

const store = createStore();

// Configure window-level handlers.
configure( store );

const rootEl = document.getElementById('root');

const render = Main => {
	ReactDOM.render(
		<Provider store={store}>
			<Root>
				<Main />
			</Root>
		</Provider>,
		rootEl
	);
};

render( App );

if (module.hot) {
	module.hot.accept('./App', () => {
		const NextApp = require('./App').default
		render(NextApp);
	});
}
