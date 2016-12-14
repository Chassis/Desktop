const COMMA = /%!\(VAGRANT_COMMA\)/g;
const NEWLINE = /\\n/g;
const RETURN = /\\r/g;

export default function parser(text) {
	const lines = text.trim('\n').split('\n');
	const items = lines.map(line => line.split(',')).map(pieces => {
		if (pieces.length < 3) {
			throw new Error('Invalid machine-readable, minimum number of pieces is 3');
		}

		const [timestamp, target, type, ...data] = pieces;

		return {
			timestamp,
			target,
			type,
			data: data.map(item => item.replace(COMMA, ',').replace(NEWLINE, '\n').replace(RETURN, '\r'))
		};
	});
	return items;
}

export function parseGlobalStatus(text) {
	const parsed = parser(text);
	const parts = parsed.map(item => item.data[1]);

	// Custom parse.
	let header = true;
	let columns = [];
	let rows = [];
	let currentRow = {};
	let currentColumn = 0;
	for (var i = 0; i < parts.length; i++) {
		let part = parts[i].trim();
		if ( header ) {
			if ( part.match( /^-+$/ ) ) {
				header = false;
				continue;
			}

			if ( part !== "" ) {
				columns.push( part );
			}
			continue;
		}

		// End of a row?
		if ( part === "" ) {
			rows.push( currentRow );
			currentRow = {};
			currentColumn = 0;
			continue;
		}

		let column = columns[ currentColumn ];
		currentRow[ column ] = part;
		currentColumn++;
	}

	// Note: intentionally ignores the last "row", as it's useless end-user
	// information.

	return rows;
}
