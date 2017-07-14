import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { addDecorator, configure } from '@storybook/react';

// Load CSS
import 'font-awesome/css/font-awesome.css';
import '../../public/loader.css';

const require_story = require.context( '../../stories', true, /\.js$/ )

function loadStories() {
	require_story.keys().forEach( filename => require_story( filename ) );
}

// Add dummy store for KeyHandler
const INITIAL_STATE = {
	preferences: {},
};
addDecorator( story => (
	<Provider store={ createStore( state => state, INITIAL_STATE ) }>
		{ story() }
	</Provider>
));

// Add dummy handler.
window.keyHandler = {
	register: () => {},
	unregister: () => {},
};

configure( loadStories, module );
