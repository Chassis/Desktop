import React from 'react';
import ReactDOM from 'react-dom';

import About from './About';

// Note: Main CSS is defined in public/loader.css to load with the splash screen.

import 'font-awesome/css/font-awesome.css';

const rootEl = document.getElementById('root');

const render = Main => {
	ReactDOM.render(
		<Main />,
		rootEl
	);
};

render( About );

if (module.hot) {
	module.hot.accept('./About', () => {
		const NextAbout = require('./About').default
		render(NextAbout);
	});
}
