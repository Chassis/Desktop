import * as actions from './actions';

const toCode = text => {
	const keys = text.split('+').map(key => key.trim());
	const code = {
		key: null,
		ctrlKey: false,
		metaKey: false,
		shiftKey: false,
	};
	for ( let index = 0; index < keys.length; index++ ) {
		let key = keys[index];
		switch (key.toLowerCase()) {
			case 'cmd':
				code.metaKey = true;
				break;

			case 'ctrl':
				code.ctrlKey = true;
				break;

			case 'shift':
				code.shiftKey = true;
				break;

			case 'escape':
			case 'esc':
				code.key = 'Escape';
				break;

			case 'up':
			case 'down':
			case 'left':
			case 'right':
				code.key = 'Arrow' + key[0].toUpperCase() + key.slice(1).toLowerCase();
				break;

			default:
				if (code.key) {
					throw new Error('Only a single key is supported');
				}
				if (key.length !== 1) {
					throw new Error('Only single characters are supported');
				}
				code.key = key.toLowerCase();
				break;
		}
	}

	if (!code.key) {
		throw new Error('keyCode is required');
	}

	return code;
};

const COMPARE_PROPS = [ 'key', 'metaKey', 'ctrlKey', 'shiftKey' ];
const compare = (left, right) => {
	for ( let index = 0; index < COMPARE_PROPS.length; index++ ) {
		let prop = COMPARE_PROPS[ index ];
		if (left[prop] !== right[prop]) {
			return false;
		}
	}

	return true;
};

export default class Keys {
	constructor() {
		this.handlers = {};
		this.nextIndex = 0;
	}

	register( key, callback ) {
		const code = { ...toCode( key ), callback, id: this.nextIndex++ };
		this.handlers[ code.key ] = this.handlers[ code.key ] || [];
		this.handlers[ code.key ].push( code );
		return code.id;
	}

	unregister( key, id ) {
		const code = toCode( key );
		if ( ! ( code.key in this.handlers ) ) {
			return false;
		}
		let current = this.handlers[ code.key ];
		let next = current.filter(item => {
			return !compare(item, code) && item.id === id
		});
		this.handlers[code.key] = next;
		return current !== next;
	}

	trigger( e ) {
		if ( ! e.key || ! ( e.key in this.handlers ) ) {
			return;
		}

		let handlers = this.handlers[ e.key ];
		for ( let index = 0; index < handlers.length; index++ ) {
			let handler = handlers[ index ];
			if ( compare( e, handler ) ) {
				handler.callback( e );
			}
		}
	}

	listen( store ) {
		window.addEventListener( 'keydown', e => {
			if (e.key === "Meta" &&  e.metaKey) {
				store.dispatch({ type: actions.META_KEY_DOWN });
			}
			this.trigger( e );
		});
		window.addEventListener( 'keyup', e => {
			if (e.key === "Meta" && !e.metaKey) {
				store.dispatch({ type: actions.META_KEY_UP });
			}
		});
	}
}
