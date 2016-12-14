import { combineReducers } from 'redux';
import * as actions from './actions';
import terminal from './reducers/terminal';

const boxes = (state = [], action) => {
	switch ( action.type ) {
		case actions.ADD_BOX: {
			let newBox = {
				path: action.path,
				name: action.name,
				domain: "",
				status: ""
			};
			let nextState = state.slice();
			nextState.push( newBox );
			return nextState;
		}

		case actions.UPDATE_BOX_STATUS:
			return state.map(box => {
				if (box.path !== action.path) {
					return box;
				}

				return { ...box, status: action.state };
			});

		case actions.UPDATE_BOX:
			return state.map(box => {
				if (box.path !== action.path) {
					return box;
				}

				return { ...box, ...action.data };
			});

		default:
			return state;
	}
};

const installer = (state = {}, action) => {
	switch ( action.type ) {
		case actions.install.SET_STATUS:
			return { ...state, installed: { ...state.installed, [ action.app ]: action.status } };

		case actions.install.SET_DOWNLOAD_PROGRESS:
			let downloadProgress = state.downloadProgress || {};
			downloadProgress[ action.app ] = action.progress;
			console.log( downloadProgress );
			return { ...state, downloadProgress };

		case actions.install.SET_DOWNLOAD_TOTAL:
			let downloadTotal = state.downloadTotal || {};
			downloadTotal[ action.app ] = action.total;
			return { ...state, downloadTotal };

		default:
			return state;
	}
};

const ui = (state = {}, action) => {
	switch ( action.type ) {
		case actions.META_KEY_DOWN:
			return { ...state, showKeys: true };

		case actions.WINDOW_BLUR:
		case actions.META_KEY_UP:
			return { ...state, showKeys: false };

		case actions.SELECT_BOX:
			return { ...state, selectedBox: action.path, editing: false };

		case actions.SHOW_MODAL:
			return { ...state, modal: action.id };

		case actions.SET_EDITING:
			return { ...state, editing: action.editing };

		default:
			return state;
	}
};

const vagrant = (state = {}, action) => {
	switch ( action.type ) {
		case actions.INIT_VAGRANT:
			return { ...state, machines: action.machines };

		default:
			return state;
	}
};

export default combineReducers({ boxes, installer, terminal, ui, vagrant });
