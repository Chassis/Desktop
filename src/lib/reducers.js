import { combineReducers } from 'redux';

import { RESET } from './actions';
import { DEFAULT_STATE } from './createStore';
import boxes from './reducers/boxes';
import installer from './reducers/installer';
import preferences from './reducers/preferences';
import terminal from './reducers/terminal';
import ui from './reducers/ui';
import vagrant from './reducers/vagrant';

const combined = combineReducers({ boxes, installer, preferences, terminal, ui, vagrant });

export default (state, action) => {
	if ( action.type === RESET ) {
		return { ...DEFAULT_STATE };
	}

	return combined( state, action );
};
