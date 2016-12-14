import { sep as separator } from 'path';
import tildify from 'tildify';

export default function formatPath(path) {
	const tilded = tildify(path);

	// Only shorten if longer than we want.
	if ( tilded.length < 40 ) {
		return tilded;
	}

	// Split into segments, and keep first and last two.
	// https://blog.codinghorror.com/shortening-long-file-paths/
	const segments = tilded.split( separator );
	if ( segments.length < 5 ) {
		return tilded;
	}

	return [
		...segments.slice( 0, 2 ),
		"\u2026", // Horizontal ellipsis
		...segments.slice( -2 )
	].join( separator );
}
