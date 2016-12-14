import * as actions from '../actions';

export default function boxes(state = [], action) {
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