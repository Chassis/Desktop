export default function terminal(state = {}, action) {
	let next = (key, modifier) => {
		return { ...state, [key]: modifier( state[ key ] ) };
	};

	switch (action.type) {
		case 'COMMAND_START':
			return next( action.machine, value => {
				let nextValue = value ? { ...value } : { output: "" };
				nextValue.command = action.command;
				nextValue.args = action.args;
				nextValue.output += `$ ${action.command} ${action.args.join(' ')}\n`;
				nextValue.running = true;
				return nextValue;
			});

		case 'COMMAND_OUTPUT':
			return next( action.machine, value => ({ ...value, output: value.output + action.data }) );

		case 'COMMAND_END':
			const code = action.code;
			const message = code === 0 ? `(Exited with success code ${code})\n` : `(Exited with error code ${code})\n\n`;
			return next( action.machine, value => ({ ...value, output: value.output + message, running: false }) );

		default:
			return state;
	}
}
