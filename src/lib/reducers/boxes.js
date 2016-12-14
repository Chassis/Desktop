import * as actions from '../actions';

export default function boxes(state = [], action) {
	switch ( action.type ) {
		case actions.ADD_BOX:
			return [ ...state, action.machine ];

		case actions.UPDATE_BOX:
			return state.map(box => {
				if (box.path !== action.path) {
					return box;
				}

				return { ...box, ...action.data };
			});

		case actions.REMOVE_BOX:
			return state.filter( box => box.path !== action.machine.path );

		default:
			return state;
	}
};