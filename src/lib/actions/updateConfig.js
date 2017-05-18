import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import { loadFile } from './loadConfig';
import { updateBox } from '../actions';

const yamlOptions = {
	indent: 4,
	noRefs: true,
};

export function saveConfig( path, data ) {
	const serialized = yaml.safeDump( data, yamlOptions );

	return new Promise( resolve => {
		fs.writeFile( path, serialized, err => {
			console.log( err );
			resolve();
		});
	});
}

export default function updateConfig( path, machinePath, changes ) {
	return (dispatch, getStore) => {
		loadFile( path ).then( existing => {
			const nextConfig = { ...existing, ...changes };
			saveConfig( path, nextConfig ).then( () => dispatch( updateBox( machinePath, { config: nextConfig } ) ) );
		});
	};
}

export function updateMachineConfig( machinePath, changes ) {
	return updateConfig( path.join( machinePath, 'config.local.yaml' ), machinePath, changes );
}
