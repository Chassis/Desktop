import * as actions from '../actions';

export default function vagrant(state = {}, action) {
	switch ( action.type ) {
		case actions.INIT_VAGRANT:
			return { ...state, machines: action.machines };

		default:
			return state;
	}
}
