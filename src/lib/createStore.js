import deepmerge from 'deepmerge';
import { applyMiddleware, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

export const DEFAULT_STATE = {
	boxes: [],
	installer: {
		installed: {
			chassis: false,
			vagrant: false,
			virtualbox: false,
		},
		downloadProgress: {},
		downloadTotal: {},
	},
	terminal: {},
	vagrant: {
		machines: [],
	},
	ui: {
		editing: false,
		modal: 'install',
		undo: null,
	},
};

export default function createStore() {
	let initialState = { ...DEFAULT_STATE };
	let storedState = localStorage.getItem( 'store' );
	if ( storedState ) {
		try {
			initialState = deepmerge( initialState, JSON.parse( storedState ) );
		} catch (e) {
			// No-op
		}
	}

	const middleware = [ thunk ];

	// Debugging utilities.
	if (process.env.NODE_ENV === 'development') {
		const createLogger = require( 'redux-logger' );
		const logger = createLogger();
		middleware.push( logger );
	}

	let store = createReduxStore( reducers, initialState, applyMiddleware( ...middleware ) );
	store.subscribe(() => {
		let mapper = store => ({ boxes: store.boxes, installer: { installed: store.installer.installed } });
		localStorage.setItem( 'store', JSON.stringify( mapper( store.getState() ) ) );
	});

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextReducers = require('./reducers').default;
			store.replaceReducer(nextReducers);
		});
	}

	return store;
}
