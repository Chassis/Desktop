import * as actions from '../actions';

export default function preferences(state = {}, action) {
	switch ( action.type ) {
		case actions.SET_PREFERENCE:
			return { ...state, [ action.key ]: action.value };

		default:
			return state;
	}
}
