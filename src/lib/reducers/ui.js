import * as actions from '../actions';

export default function ui(state = {}, action) {
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
}
