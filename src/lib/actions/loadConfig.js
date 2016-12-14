import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import { updateBox } from '../actions';

function deepMap(data, callback) {
	if (Array.isArray(data)) {
		return data.map(item => deepMap(item, callback));
	} else if (typeof data === "object") {
		let nextData = {...data};
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				nextData[key] = deepMap(data[key], callback);
			}
		}
		return nextData;
	}

	return callback(data);
}

function parseYaml( data ) {
	let parsed = yaml.safeLoad( data );

	// Correctly parse "Yes"/"No" for YAML 1.1 compatibility.
	let corrected = deepMap( parsed, item => {
		if ( ! ( typeof item === "string" ) ) {
			return item;
		}
		if ( item.search( /^(y|n|yes|no)$/i ) === 0 ) {
			return item[0].toLowerCase() === 'y';
		}
		return item;
	});

	return corrected;
}

export function loadFile( path ) {
	return new Promise( resolve => {
		fs.readFile( path, (err, data) => {
			if ( err ) {
				return resolve( {} );
			}

			let fileConfig = parseYaml( data );
			return resolve( fileConfig );
		})
	});
}

export default function loadConfig(machinePath) {
	return dispatch => {
		// Use promises to ensure config order is correct.
		let promises = [
			'config.yaml',
			'config.local.yaml',
			'content/config.yaml',
			'content/config.local.yaml',
		].map( configFile => loadFile( path.join( machinePath, configFile ) ) );

		Promise.all( promises ).then( parts => {
			let config = parts.reduce( ( carry, value ) => ({ ...carry, ...value }), {} );
			dispatch( updateBox( machinePath, { config } ) );
		});
	};
}

export function loadAllConfig() {
	console.log( 'loading all' );
	return (dispatch, getStore) => {
		const store = getStore();
		store.boxes.forEach(box => {
			console.log( 'loading for ', box.path );
			dispatch(loadConfig(box.path));
		});
	}
}
